const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const patientController = require('../controllers/patient');
const { auth, ensureRole, ensureReceptionist} = require('../middleware/auth');

router.get('/all', auth, ensureRole('doctor', 'receptionist'), patientController.getAllPatients);
router.get('/:id', auth, ensureRole('doctor', 'receptionist', 'patient'), patientController.getPatientById);
router.post('/', auth, ensureReceptionist, patientController.createPatient);
router.put('/:id', auth, ensureReceptionist, patientController.editPatient);
router.delete('/:id', auth, ensureReceptionist, patientController.deletePatient);

module.exports = router;