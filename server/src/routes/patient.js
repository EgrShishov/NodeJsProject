const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const patientController = require('../controllers/patient');
const { ensureRole, ensureReceptionist} = require('../middleware/auth');

router.get('/all', passport.authenticate('jwt', { session: false }), ensureRole('doctor', 'receptionist'), patientController.getAllPatients);
router.get('/:id', passport.authenticate('jwt', { session: false }), ensureRole('doctor', 'receptionist'), patientController.getPatientById);
router.post('/', passport.authenticate('jwt', { session: false }), ensureReceptionist, patientController.createPatient);
router.put('/:id', passport.authenticate('jwt', { session: false }), ensureReceptionist, patientController.editPatient);
router.delete('/:id', passport.authenticate('jwt', { session: false }), ensureReceptionist, patientController.deletePatient);

module.exports = router;