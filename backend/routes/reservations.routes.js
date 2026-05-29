const express = require('express');
const reservationsController = require('../controllers/reservations.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('client'), reservationsController.createReservation);
router.get('/me', authMiddleware, roleMiddleware('client'), reservationsController.listMyReservations);
router.get('/salon', authMiddleware, roleMiddleware('salon'), reservationsController.listSalonReservations);
router.get('/salon/stats', authMiddleware, roleMiddleware('salon'), reservationsController.getSalonStats);
router.patch('/:id/cancel', authMiddleware, roleMiddleware('client'), reservationsController.cancelReservation);

module.exports = router;
