const express = require('express');
const prestationsController = require('../controllers/prestations.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

const router = express.Router();

router.get('/me', authMiddleware, roleMiddleware('salon'), prestationsController.listMine);
router.post('/', authMiddleware, roleMiddleware('salon'), prestationsController.createPrestation);
router.put('/:id', authMiddleware, roleMiddleware('salon'), prestationsController.updatePrestation);
router.delete('/:id', authMiddleware, roleMiddleware('salon'), prestationsController.deletePrestation);

module.exports = router;
