const pool = require('../config/db');

async function listSalons(req, res, next) {
  try {
    const { ville, noteMin, prixMax, prestation } = req.query;
    const parsedNoteMin = noteMin === undefined ? null : Number(noteMin);
    const parsedPrixMax = prixMax === undefined ? null : Number(prixMax);

    if (
      (noteMin !== undefined && (!Number.isFinite(parsedNoteMin) || parsedNoteMin < 0 || parsedNoteMin > 5))
      || (prixMax !== undefined && (!Number.isFinite(parsedPrixMax) || parsedPrixMax < 0))
    ) {
      return res.status(400).json({
        success: false,
        message: 'Filtres invalides'
      });
    }

    const params = [];
    let sql = `
      SELECT
        s.id,
        s.nom,
        s.ville,
        s.adresse,
        s.note,
        MIN(p.prix) AS prix_min
      FROM salons s
      LEFT JOIN prestations p ON p.salon_id = s.id AND p.active = TRUE
      WHERE 1 = 1
    `;

    if (ville) {
      sql += ' AND s.ville LIKE ?';
      params.push(`%${ville}%`);
    }

    if (noteMin) {
      sql += ' AND s.note >= ?';
      params.push(parsedNoteMin);
    }

    if (prestation) {
      sql += ' AND EXISTS (SELECT 1 FROM prestations p2 WHERE p2.salon_id = s.id AND p2.active = TRUE AND p2.nom LIKE ?)';
      params.push(`%${prestation}%`);
    }

    sql += ' GROUP BY s.id, s.nom, s.ville, s.adresse, s.note';

    if (prixMax) {
      sql += ' HAVING prix_min <= ?';
      params.push(parsedPrixMax);
    }

    sql += ' ORDER BY s.note DESC, s.nom ASC';

    const [salons] = await pool.execute(sql, params);

    res.json({
      success: true,
      data: salons
    });
  } catch (error) {
    next(error);
  }
}

async function getSalonById(req, res, next) {
  try {
    const [salons] = await pool.execute(
      `SELECT id, nom, ville, adresse, description, telephone, image_url, note
       FROM salons
       WHERE id = ?`,
      [req.params.id]
    );

    if (salons.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Salon introuvable'
      });
    }

    res.json({
      success: true,
      data: salons[0]
    });
  } catch (error) {
    next(error);
  }
}

async function updateMySalon(req, res, next) {
  try {
    const { nom, ville, adresse, description, telephone, image_url } = req.body;

    if (!nom || !ville || !adresse) {
      return res.status(400).json({
        success: false,
        message: 'Nom, ville et adresse sont obligatoires'
      });
    }

    const [result] = await pool.execute(
      `UPDATE salons
       SET nom = ?, ville = ?, adresse = ?, description = ?, telephone = ?, image_url = ?
       WHERE user_id = ?`,
      [nom, ville, adresse, description || null, telephone || null, image_url || null, req.user.id]
    );

    if (result.affectedRows === 0) {
      await pool.execute(
        `INSERT INTO salons (user_id, nom, ville, adresse, description, telephone, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [req.user.id, nom, ville, adresse, description || null, telephone || null, image_url || null]
      );
    }

    res.json({
      success: true,
      message: 'Salon mis a jour'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listSalons,
  getSalonById,
  updateMySalon
};
