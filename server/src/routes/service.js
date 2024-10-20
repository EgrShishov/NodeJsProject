const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service');
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.get('/all', serviceController.getAllServices);
router.post('/', serviceController.createService);
router.post('/make-active/:id', serviceController.makeActive);
router.post('/make-inactive/:id', serviceController.makeInActive);
router.delete('/:id', serviceController.deleteService);

module.exports = router;