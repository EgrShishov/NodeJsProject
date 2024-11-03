const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription');
const {ensureRole, ensureDoctor, auth} = require("../middleware/auth");

router.get('/all', auth, ensureRole('doctor', 'receptionist'), prescriptionController.getAllPrescriptions);
router.get('/:id', auth, ensureRole('doctor', 'receptionist'), prescriptionController.getPrescriptionById);
router.get('/:patientId', auth, ensureRole('patient', 'doctor', 'receptionist'), prescriptionController.getPatientPrescriptions);
router.post('/', auth,  ensureDoctor, prescriptionController.createPrescription);
router.put('/:id', auth, ensureDoctor, prescriptionController.editPrescription);
router.delete('/:id', auth, ensureDoctor, prescriptionController.deletePrescription);

module.exports = router;