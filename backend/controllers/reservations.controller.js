const pool = require('../config/db');

async function getSalonIdForUser(userId) {
  const [salons] = await pool.execute(
    'SELECT id FROM salons WHERE user_id = ?',
    [userId]
  );

  return salons.length > 0 ? salons[0].id : null;
}

async function createReservation(req, res, next) {
  const { salon_id, prestation_id, creneau_id } = req.body;

  if (!salon_id || !prestation_id || !creneau_id) {
    return res.status(400).json({
      success: false,
      message: 'Salon, prestation et creneau obligatoires'
    });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [creneaux] = await connection.execute(
      `SELECT id, salon_id, disponible
       FROM creneaux
       WHERE id = ? AND salon_id = ?
       FOR UPDATE`,
      [creneau_id, salon_id]
    );

    if (creneaux.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Creneau introuvable'
      });
    }

    if (!creneaux[0].disponible) {
      await connection.rollback();
      return res.status(409).json({
        success: false,
        message: 'Ce creneau est deja pris'
      });
    }

    const [prestations] = await connection.execute(
      `SELECT id
       FROM prestations
       WHERE id = ? AND salon_id = ? AND active = TRUE`,
      [prestation_id, salon_id]
    );

    if (prestations.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Prestation introuvable'
      });
    }

    await connection.execute(
      `INSERT INTO reservations (client_id, salon_id, prestation_id, creneau_id)
       VALUES (?, ?, ?, ?)`,
      [req.user.id, salon_id, prestation_id, creneau_id]
    );

    await connection.execute(
      'UPDATE creneaux SET disponible = FALSE WHERE id = ?',
      [creneau_id]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Reservation confirmee'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
}

async function listMyReservations(req, res, next) {
  try {
    const [reservations] = await pool.execute(
      `SELECT
        r.id,
        s.nom AS salon,
        p.nom AS prestation,
        p.prix,
        c.date_creneau,
        c.heure_debut,
        r.statut
       FROM reservations r
       INNER JOIN salons s ON s.id = r.salon_id
       INNER JOIN prestations p ON p.id = r.prestation_id
       INNER JOIN creneaux c ON c.id = r.creneau_id
       WHERE r.client_id = ?
       ORDER BY c.date_creneau DESC, c.heure_debut DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      data: reservations
    });
  } catch (error) {
    next(error);
  }
}

async function cancelReservation(req, res, next) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [reservations] = await connection.execute(
      `SELECT
        r.id,
        r.creneau_id,
        r.statut,
        TIMESTAMP(c.date_creneau, c.heure_debut) AS starts_at
       FROM reservations r
       INNER JOIN creneaux c ON c.id = r.creneau_id
       WHERE r.id = ? AND r.client_id = ?
       FOR UPDATE`,
      [req.params.id, req.user.id]
    );

    if (reservations.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Reservation introuvable'
      });
    }

    const reservation = reservations[0];

    if (reservation.statut === 'annulee') {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: 'Reservation deja annulee'
      });
    }

    const startsAt = new Date(reservation.starts_at);
    const limit = new Date(Date.now() + 24 * 60 * 60 * 1000);

    if (startsAt <= limit) {
      await connection.rollback();
      return res.status(403).json({
        success: false,
        message: 'Annulation impossible moins de 24 heures avant le rendez-vous'
      });
    }

    await connection.execute(
      `UPDATE reservations
       SET statut = 'annulee', cancelled_at = NOW()
       WHERE id = ?`,
      [reservation.id]
    );

    await connection.execute(
      'UPDATE creneaux SET disponible = TRUE WHERE id = ?',
      [reservation.creneau_id]
    );

    await connection.commit();

    res.json({
      success: true,
      message: 'Reservation annulee'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
}

async function listSalonReservations(req, res, next) {
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
      SELECT
        r.id,
        u.nom AS client,
        p.nom AS prestation,
        p.prix,
        c.date_creneau,
        c.heure_debut,
        r.statut
      FROM reservations r
      INNER JOIN users u ON u.id = r.client_id
      INNER JOIN prestations p ON p.id = r.prestation_id
      INNER JOIN creneaux c ON c.id = r.creneau_id
      WHERE r.salon_id = ?
    `;

    if (req.query.date) {
      sql += ' AND c.date_creneau = ?';
      params.push(req.query.date);
    }

    sql += ' ORDER BY c.date_creneau ASC, c.heure_debut ASC';

    const [reservations] = await pool.execute(sql, params);

    res.json({
      success: true,
      data: reservations
    });
  } catch (error) {
    next(error);
  }
}

async function getSalonStats(req, res, next) {
  try {
    const salonId = await getSalonIdForUser(req.user.id);

    if (!salonId) {
      return res.status(404).json({
        success: false,
        message: 'Salon introuvable pour ce compte'
      });
    }

    const [stats] = await pool.execute(
      `SELECT
        COALESCE(SUM(CASE WHEN c.date_creneau = CURDATE() THEN p.prix ELSE 0 END), 0) AS jour,
        COALESCE(SUM(CASE WHEN YEARWEEK(c.date_creneau, 1) = YEARWEEK(CURDATE(), 1) THEN p.prix ELSE 0 END), 0) AS semaine,
        COALESCE(SUM(CASE WHEN YEAR(c.date_creneau) = YEAR(CURDATE()) AND MONTH(c.date_creneau) = MONTH(CURDATE()) THEN p.prix ELSE 0 END), 0) AS mois
       FROM reservations r
       INNER JOIN prestations p ON p.id = r.prestation_id
       INNER JOIN creneaux c ON c.id = r.creneau_id
       WHERE r.salon_id = ? AND r.statut = 'confirmee'`,
      [salonId]
    );

    res.json({
      success: true,
      data: stats[0]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createReservation,
  listMyReservations,
  cancelReservation,
  listSalonReservations,
  getSalonStats
};
