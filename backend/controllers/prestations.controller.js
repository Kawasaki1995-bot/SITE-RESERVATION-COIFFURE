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
    const [prestations] = await pool.execute(
      `SELECT id, nom, prix
       FROM prestations
       WHERE salon_id = ? AND active = TRUE
       ORDER BY prix ASC, nom ASC`,
      [req.params.id]
    );

    res.json({
      success: true,
      data: prestations
    });
  } catch (error) {
    next(error);
  }
}

async function createPrestation(req, res, next) {
  try {
    const { nom, prix } = req.body;
    const parsedPrix = Number(prix);
    const salonId = await getSalonIdForUser(req.user.id);

    if (!salonId) {
      return res.status(404).json({
        success: false,
        message: 'Salon introuvable pour ce compte'
      });
    }

    if (!nom || prix === undefined || !Number.isFinite(parsedPrix) || parsedPrix < 0) {
      return res.status(400).json({
        success: false,
        message: 'Nom et prix valide obligatoires'
      });
    }

    await pool.execute(
      'INSERT INTO prestations (salon_id, nom, prix) VALUES (?, ?, ?)',
      [salonId, nom, parsedPrix]
    );

    res.status(201).json({
      success: true,
      message: 'Prestation creee'
    });
  } catch (error) {
    next(error);
  }
}

async function updatePrestation(req, res, next) {
  try {
    const { nom, prix, active } = req.body;
    const parsedPrix = Number(prix);
    const salonId = await getSalonIdForUser(req.user.id);

    if (!salonId) {
      return res.status(404).json({
        success: false,
        message: 'Salon introuvable pour ce compte'
      });
    }

    if (!nom || prix === undefined || !Number.isFinite(parsedPrix) || parsedPrix < 0) {
      return res.status(400).json({
        success: false,
        message: 'Nom et prix valide obligatoires'
      });
    }

    const [result] = await pool.execute(
      `UPDATE prestations
       SET nom = ?, prix = ?, active = ?
       WHERE id = ? AND salon_id = ?`,
      [nom, parsedPrix, active === false ? false : true, req.params.id, salonId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Prestation introuvable'
      });
    }

    res.json({
      success: true,
      message: 'Prestation mise a jour'
    });
  } catch (error) {
    next(error);
  }
}

async function deletePrestation(req, res, next) {
  try {
    const salonId = await getSalonIdForUser(req.user.id);

    if (!salonId) {
      return res.status(404).json({
        success: false,
        message: 'Salon introuvable pour ce compte'
      });
    }

    const [result] = await pool.execute(
      `UPDATE prestations
       SET active = FALSE
       WHERE id = ? AND salon_id = ?`,
      [req.params.id, salonId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Prestation introuvable'
      });
    }

    res.json({
      success: true,
      message: 'Prestation desactivee'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listBySalon,
  createPrestation,
  updatePrestation,
  deletePrestation
};
