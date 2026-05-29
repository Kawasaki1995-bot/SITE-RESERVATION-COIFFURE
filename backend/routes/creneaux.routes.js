const express = require('express');
const creneauxController = require('../controllers/creneaux.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('salon'), creneauxController.createCreneau);
router.put('/:id', authMiddleware, roleMiddleware('salon'), creneauxController.updateCreneau);

module.exports = router;
