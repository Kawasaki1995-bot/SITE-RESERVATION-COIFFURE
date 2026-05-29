const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      nom: user.nom,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

async function register(req, res, next) {
  try {
    const { nom, email, password, role } = req.body;

    if (!nom || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs sont obligatoires'
      });
    }

    if (!['client', 'salon'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role invalide'
      });
    }

    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email deja utilise'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO users (nom, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [nom, email, passwordHash, role]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        nom,
        email,
        role
      }
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email et mot de passe obligatoires'
      });
    }

    const [users] = await pool.execute(
      'SELECT id, nom, email, password_hash, role FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Identifiants incorrects'
      });
    }

    const publicUser = {
      id: user.id,
      nom: user.nom,
      email: user.email,
      role: user.role
    };

    res.json({
      success: true,
      data: {
        token: createToken(publicUser),
        user: publicUser
      }
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res) {
  res.json({
    success: true,
    data: req.user
  });
}

module.exports = {
  register,
  login,
  me
};
