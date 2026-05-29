const pool = require('../config/db');

function isValidDay(value) {
  return Number.isInteger(value) && value >= 1 && value <= 7;
}

function isValidTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(value);
}

function toSeconds(value) {
  const [hours, minutes, seconds = '0'] = value.split(':');
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
}

async function getSalonIdForUser(userId) {
  const [salons] = await pool.execute(
    'SELECT id FROM salons WHERE user_id = ?',
    [userId]
  );

  return salons.length > 0 ? salons[0].id : null;
}

async function listBySalon(req, res, next) {
  try {
    const [horaires] = await pool.execute(
      `SELECT id, jour_semaine, heure_ouverture, heure_fermeture, ferme
       FROM horaires_ouverture
       WHERE salon_id = ?
       ORDER BY jour_semaine ASC`,
      [req.params.id]
    );

    res.json({
      success: true,
      data: horaires
    });
  } catch (error) {
    next(error);
  }
}

async function updateMyHoraires(req, res, next) {
  try {
    const { horaires } = req.body;
    const salonId = await getSalonIdForUser(req.user.id);

    if (!salonId) {
      return res.status(404).json({
        success: false,
        message: 'Salon introuvable pour ce compte'
      });
    }

    if (!Array.isArray(horaires)) {
      return res.status(400).json({
        success: false,
        message: 'La liste des horaires est obligatoire'
      });
    }

    const jours = new Set();

    for (const horaire of horaires) {
      const jourSemaine = Number(horaire.jour_semaine);
      const ferme = horaire.ferme === true;
      const { heure_ouverture, heure_fermeture } = horaire;

      if (!isValidDay(jourSemaine)) {
        return res.status(400).json({
          success: false,
          message: 'Jour de semaine invalide'
        });
      }

      if (jours.has(jourSemaine)) {
        return res.status(400).json({
          success: false,
          message: 'Jour de semaine en double'
        });
      }

      jours.add(jourSemaine);

      if (ferme) {
        continue;
      }

      if (!heure_ouverture || !heure_fermeture || !isValidTime(heure_ouverture) || !isValidTime(heure_fermeture)) {
        return res.status(400).json({
          success: false,
          message: 'Heures invalides pour un jour ouvert'
        });
      }

      if (toSeconds(heure_ouverture) >= toSeconds(heure_fermeture)) {
        return res.status(400).json({
          success: false,
          message: 'Heure de fermeture invalide'
        });
      }
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      for (const horaire of horaires) {
        const ferme = horaire.ferme === true;

        await connection.execute(
          `INSERT INTO horaires_ouverture
            (salon_id, jour_semaine, heure_ouverture, heure_fermeture, ferme)
           VALUES (?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
            heure_ouverture = VALUES(heure_ouverture),
            heure_fermeture = VALUES(heure_fermeture),
            ferme = VALUES(ferme)`,
          [
            salonId,
            Number(horaire.jour_semaine),
            ferme ? null : horaire.heure_ouverture,
            ferme ? null : horaire.heure_fermeture,
            ferme
          ]
        );
      }

      await connection.commit();
      connection.release();
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }

    res.json({
      success: true,
      message: 'Horaires mis a jour'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listBySalon,
  updateMyHoraires
};
