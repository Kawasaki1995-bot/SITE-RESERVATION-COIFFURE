const pool = require('../config/db');

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    !Number.isNaN(date.getTime())
    && date.getFullYear() === year
    && date.getMonth() === month - 1
    && date.getDate() === day
  );
}

function isValidHalfHour(value) {
  return /^([01]\d|2[0-3]):(00|30)(:00)?$/.test(value);
}

function formatDateForSql(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatTimeForSql(minutes) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mins = String(minutes % 60).padStart(2, '0');

  return `${hours}:${mins}:00`;
}

function timeToMinutes(value) {
  const [hours, minutes] = String(value).split(':').map(Number);

  return hours * 60 + minutes;
}

async function ensureUpcomingCreneaux(salonId) {
  const [salons] = await pool.execute(
    `SELECT id
     FROM salons
     WHERE id = ?
     LIMIT 1`,
    [salonId]
  );

  if (salons.length === 0) {
    return;
  }

  const [horaires] = await pool.execute(
    `SELECT jour_semaine, heure_ouverture, heure_fermeture
     FROM horaires_ouverture
     WHERE salon_id = ? AND ferme = FALSE
     ORDER BY jour_semaine ASC`,
    [salonId]
  );

  if (horaires.length === 0) {
    return;
  }

  const horairesByDay = new Map(horaires.map((horaire) => [Number(horaire.jour_semaine), horaire]));
  const values = [];
  const today = new Date();

  for (let offset = 1; offset <= 14; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);

    const jourSemaine = date.getDay() === 0 ? 7 : date.getDay();
    const horaire = horairesByDay.get(jourSemaine);

    if (!horaire) {
      continue;
    }

    const opening = timeToMinutes(horaire.heure_ouverture);
    const closing = timeToMinutes(horaire.heure_fermeture);

    for (let minutes = opening; minutes < closing; minutes += 30) {
      values.push([salonId, formatDateForSql(date), formatTimeForSql(minutes), true]);
    }
  }

  if (values.length === 0) {
    return;
  }

  await pool.query(
    `INSERT IGNORE INTO creneaux (salon_id, date_creneau, heure_debut, disponible)
     VALUES ?`,
    [values]
  );
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
    await ensureUpcomingCreneaux(req.params.id);

    const params = [req.params.id];
    let sql = `
      SELECT id, DATE_FORMAT(date_creneau, '%Y-%m-%d') AS date_creneau, heure_debut, disponible
      FROM creneaux
      WHERE salon_id = ? AND disponible = TRUE AND date_creneau >= CURDATE()
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

async function listMine(req, res, next) {
  try {
    const salonId = await getSalonIdForUser(req.user.id);

    if (!salonId) {
      return res.status(404).json({
        success: false,
        message: 'Salon introuvable pour ce compte'
      });
    }

    const params = [salonId];
    let sql = `
      SELECT id, DATE_FORMAT(date_creneau, '%Y-%m-%d') AS date_creneau, heure_debut, disponible
      FROM creneaux
      WHERE salon_id = ?
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
  listMine,
  createCreneau,
  updateCreneau
};
