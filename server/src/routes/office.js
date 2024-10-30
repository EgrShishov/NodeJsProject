const express = require('express');
const router = express.Router();
const officeController = require('../controllers/office');
const { ensureAuthenticated, ensureGuest, ensureReceptionist} = require('../middleware/auth');

router.get('/all', officeController.getAllOffices);
router.get('/:id', officeController.getOfficeById);
router.post('/', ensureReceptionist, officeController.createOffice);
router.put('/:id', ensureReceptionist, officeController.editOffice);
router.delete('/:id', ensureReceptionist, officeController.deleteOffice);

module.exports = router;