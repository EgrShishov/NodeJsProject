const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const patientController = require('../controllers/patient');
const { auth, ensureRole, ensureReceptionist, ensureDoctor} = require('../middleware/auth');
const upload = require("../middleware/fileUploads");

router.get('/all', auth, ensureRole('doctor', 'receptionist'), patientController.getAllPatients);
router.get('/by-doctor/:doctorId', auth, ensureDoctor, patientController.getDoctorsPatients);
router.get('/:id', auth, ensureRole('doctor', 'receptionist', 'patient'), patientController.getPatientById);
router.post('/', upload.single('file'), auth, ensureReceptionist, patientController.createPatient);
router.put('/:id', auth, ensureReceptionist, patientController.editPatient);
router.delete('/:id', auth, ensureReceptionist, patientController.deletePatient);

module.exports = router;