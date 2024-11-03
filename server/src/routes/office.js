const express = require('express');
const router = express.Router();
const officeController = require('../controllers/office');
const { ensureReceptionist, auth} = require('../middleware/auth');

router.get('/all', officeController.getAllOffices);
router.get('/:id', officeController.getOfficeById);
router.post('/', auth, ensureReceptionist, officeController.createOffice);
router.put('/:id', auth, ensureReceptionist, officeController.editOffice);
router.delete('/:id', auth, ensureReceptionist, officeController.deleteOffice);

module.exports = router;