const pool = require('../config/db');

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

    for (const horaire of horaires) {
      const { jour_semaine, heure_ouverture, heure_fermeture, ferme } = horaire;

      if (!jour_semaine || jour_semaine < 1 || jour_semaine > 7) {
        return res.status(400).json({
          success: false,
          message: 'Jour de semaine invalide'
        });
      }

      if (!ferme && (!heure_ouverture || !heure_fermeture)) {
        return res.status(400).json({
          success: false,
          message: 'Heures obligatoires pour un jour ouvert'
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
            horaire.jour_semaine,
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
