const pool = require('../config/db');

const ALLOWED_ROLES = ['client', 'salon', 'admin'];
const ALLOWED_STATUSES = ['actif', 'restreint'];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function listUsers(req, res, next) {
  try {
    const [users] = await pool.execute(
      `SELECT
        u.id,
        u.nom,
        u.email,
        u.adresse,
        u.role,
        u.statut,
        u.created_at,
        s.id AS salon_id,
        s.nom AS salon_nom,
        COUNT(DISTINCT r_client.id) + COUNT(DISTINCT r_salon.id) AS reservations_count
       FROM users u
       LEFT JOIN salons s ON s.user_id = u.id
       LEFT JOIN reservations r_client ON r_client.client_id = u.id
       LEFT JOIN reservations r_salon ON r_salon.salon_id = s.id
       GROUP BY u.id, u.nom, u.email, u.adresse, u.role, u.statut, u.created_at, s.id, s.nom
       ORDER BY u.created_at DESC, u.id DESC`
    );

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = Number(req.params.id);
    const { nom, email, adresse, role, statut } = req.body;

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Utilisateur invalide'
      });
    }

    if (!nom || !email || !role || !statut) {
      return res.status(400).json({
        success: false,
        message: 'Nom, email, role et statut sont obligatoires'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email invalide'
      });
    }

    if (!ALLOWED_ROLES.includes(role) || !ALLOWED_STATUSES.includes(statut)) {
      return res.status(400).json({
        success: false,
        message: 'Role ou statut invalide'
      });
    }

    if (userId === req.user.id && (role !== 'admin' || statut !== 'actif')) {
      return res.status(400).json({
        success: false,
        message: 'Vous ne pouvez pas retirer vos propres droits admin'
      });
    }

    const [existingEmail] = await pool.execute(
      'SELECT id FROM users WHERE email = ? AND id <> ?',
      [email, userId]
    );

    if (existingEmail.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email deja utilise'
      });
    }

    const [result] = await pool.execute(
      `UPDATE users
       SET nom = ?, email = ?, adresse = ?, role = ?, statut = ?
       WHERE id = ?`,
      [nom, email, adresse || null, role, statut, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur introuvable'
      });
    }

    res.json({
      success: true,
      message: 'Utilisateur mis a jour'
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const userId = Number(req.params.id);

  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Utilisateur invalide'
    });
  }

  if (userId === req.user.id) {
    return res.status(400).json({
      success: false,
      message: 'Vous ne pouvez pas supprimer votre propre compte admin'
    });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [users] = await connection.execute(
      'SELECT id, role FROM users WHERE id = ? FOR UPDATE',
      [userId]
    );

    if (users.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Utilisateur introuvable'
      });
    }

    const [salons] = await connection.execute(
      'SELECT id FROM salons WHERE user_id = ?',
      [userId]
    );
    const salonIds = salons.map((salon) => salon.id);

    await connection.execute(
      'DELETE FROM reservations WHERE client_id = ?',
      [userId]
    );

    for (const salonId of salonIds) {
      await connection.execute(
        'DELETE FROM reservations WHERE salon_id = ?',
        [salonId]
      );
    }

    await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
    await connection.commit();

    res.json({
      success: true,
      message: 'Utilisateur supprime'
    });
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
}

module.exports = {
  listUsers,
  updateUser,
  deleteUser
};
