const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service');
const { ensureAuthenticated, ensureGuest, ensureReceptionist} = require('../middleware/auth');

router.get('/all', serviceController.getAllServices);
router.post('/', ensureReceptionist, serviceController.createService);
router.post('/make-active/:id', ensureReceptionist, serviceController.makeActive);
router.post('/make-inactive/:id', ensureReceptionist, serviceController.makeInActive);
router.delete('/:id', ensureReceptionist, serviceController.deleteService);

module.exports = router;