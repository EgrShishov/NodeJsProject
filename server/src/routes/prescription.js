const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription');

router.get('/all', prescriptionController.getAllPrescriptions);
router.get('/:id', prescriptionController.getPrescriptionById);
router.post('/', prescriptionController.createPrescription);
router.put('/:id', prescriptionController.editPrescription);
router.delete('/:id', prescriptionController.deletePrescription);

module.exports = router;