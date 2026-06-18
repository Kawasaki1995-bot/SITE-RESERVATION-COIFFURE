const jwt = require('jsonwebtoken');
const pool = require('../config/db');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token manquant'
    });
  }

  const token = authHeader.split(' ')[1];

  let decodedUser;

  try {
    decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }

  try {
    const [users] = await pool.execute(
      'SELECT id, nom, email, adresse, role, statut FROM users WHERE id = ?',
      [decodedUser.id]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Compte introuvable'
      });
    }

    if (users[0].statut === 'restreint') {
      return res.status(403).json({
        success: false,
        message: 'Compte restreint'
      });
    }

    req.user = users[0];
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authMiddleware;
