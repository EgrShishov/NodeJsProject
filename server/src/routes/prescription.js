const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription');
const {ensureRole, ensureDoctor} = require("../middleware/auth");

router.get('/all', ensureRole('doctor', 'receptionist'), prescriptionController.getAllPrescriptions);
router.get('/:id', ensureRole('doctor', 'receptionist'), prescriptionController.getPrescriptionById);
router.get('/:patientId', ensureRole('patient', 'doctor', 'receptionist'), prescriptionController.getPatientPrescriptions);
router.post('/', ensureDoctor, prescriptionController.createPrescription);
router.put('/:id', ensureDoctor, prescriptionController.editPrescription);
router.delete('/:id', ensureDoctor, prescriptionController.deletePrescription);

module.exports = router;