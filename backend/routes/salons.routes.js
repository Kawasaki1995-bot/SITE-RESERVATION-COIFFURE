const express = require('express');
const salonsController = require('../controllers/salons.controller');
const prestationsController = require('../controllers/prestations.controller');
const horairesController = require('../controllers/horaires.controller');
const creneauxController = require('../controllers/creneaux.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

router.get('/', salonsController.listSalons);
router.get('/:id', salonsController.getSalonById);
router.get('/:id/prestations', prestationsController.listBySalon);
router.get('/:id/horaires', horairesController.listBySalon);
router.get('/:id/creneaux', creneauxController.listBySalon);
router.put('/me', authMiddleware, roleMiddleware('salon'), salonsController.updateMySalon);

module.exports = router;
