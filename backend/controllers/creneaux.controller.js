const pool = require('../config/db');

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);

  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isValidHalfHour(value) {
  return /^([01]\d|2[0-3]):(00|30)(:00)?$/.test(value);
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
    const params = [req.params.id];
    let sql = `
      SELECT id, date_creneau, heure_debut, disponible
      FROM creneaux
      WHERE salon_id = ? AND disponible = TRUE
    `;

    if (req.query.date) {
      if (!isValidDate(req.query.date)) {
        return res.status(400).json({
          success: false,
          message: 'Date invalide'
        });
      }

      sql += ' AND date_creneau = ?';
      params.push(req.query.date);
    }

    sql += ' ORDER BY date_creneau ASC, heure_debut ASC';

    const [creneaux] = await pool.execute(sql, params);

    res.json({
      success: true,
      data: creneaux
    });
  } catch (error) {
    next(error);
  }
}

async function createCreneau(req, res, next) {
  try {
    const { date_creneau, heure_debut, disponible } = req.body;
    const salonId = await getSalonIdForUser(req.user.id);

    if (!salonId) {
      return res.status(404).json({
        success: false,
        message: 'Salon introuvable pour ce compte'
      });
    }

    if (!date_creneau || !heure_debut) {
      return res.status(400).json({
        success: false,
        message: 'Date et heure obligatoires'
      });
    }

    if (!isValidDate(date_creneau) || !isValidHalfHour(heure_debut)) {
      return res.status(400).json({
        success: false,
        message: 'Date ou heure invalide'
      });
    }

    if (new Date(`${date_creneau}T${heure_debut}`) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Le creneau doit etre dans le futur'
      });
    }

    await pool.execute(
      `INSERT INTO creneaux (salon_id, date_creneau, heure_debut, disponible)
       VALUES (?, ?, ?, ?)`,
      [salonId, date_creneau, heure_debut, disponible === false ? false : true]
    );

    res.status(201).json({
      success: true,
      message: 'Creneau cree'
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Ce creneau existe deja'
      });
    }

    next(error);
  }
}

async function updateCreneau(req, res, next) {
  try {
    const salonId = await getSalonIdForUser(req.user.id);

    if (typeof req.body.disponible !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Disponibilite obligatoire'
      });
    }

    if (!salonId) {
      return res.status(404).json({
        success: false,
        message: 'Salon introuvable pour ce compte'
      });
    }

    const [result] = await pool.execute(
      `UPDATE creneaux
       SET disponible = ?
       WHERE id = ? AND salon_id = ?`,
      [req.body.disponible, req.params.id, salonId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Creneau introuvable'
      });
    }

    res.json({
      success: true,
      message: 'Creneau mis a jour'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listBySalon,
  createCreneau,
  updateCreneau
};
