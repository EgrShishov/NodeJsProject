const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient');
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.get('/all', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.post('/', patientController.createPatient);
router.put('/:id', patientController.editPatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;