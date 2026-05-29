const express = require('express');
const horairesController = require('../controllers/horaires.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

router.put('/me', authMiddleware, roleMiddleware('salon'), horairesController.updateMyHoraires);

module.exports = router;
