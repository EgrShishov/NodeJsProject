const express = require('express');
const router = express.Router();
const officeController = require('../controllers/office');
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.get('/', officeController.getAllOffices);
router.get('/:id', officeController.getOfficeById);
router.post('/', officeController.createOffice);
router.put('/:id', officeController.editOffice);
router.delete('/:id', officeController.deleteOffice);

module.exports = router;