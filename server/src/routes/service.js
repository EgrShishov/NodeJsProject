const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service');
const { ensureAuthenticated, ensureGuest, ensureReceptionist, auth} = require('../middleware/auth');

router.get('/all', serviceController.getAllServices);
router.post('/', auth, ensureReceptionist, serviceController.createService);
router.post('/make-active/:id', auth, ensureReceptionist, serviceController.makeActive);
router.post('/make-inactive/:id', auth, ensureReceptionist, serviceController.makeInActive);
router.delete('/:id', auth, ensureReceptionist, serviceController.deleteService);

module.exports = router;