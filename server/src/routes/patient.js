const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient');
const { ensureAuthenticated, ensureGuest, ensureRole, ensureReceptionist} = require('../middleware/auth');

router.get('/all', ensureRole('doctor', 'receptionist'), patientController.getAllPatients);
router.get('/:id', ensureRole('doctor', 'receptionist'), patientController.getPatientById);
router.post('/', ensureReceptionist, patientController.createPatient);
router.put('/:id', ensureReceptionist, patientController.editPatient);
router.delete('/:id', ensureReceptionist, patientController.deletePatient);

module.exports = router;