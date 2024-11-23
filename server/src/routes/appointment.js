const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment');
const { auth, ensurePatinet, ensureRole } = require('../middleware/auth');
const passport = require("../config/passport");

router.get('/all', auth, ensureRole('receptionist', 'doctor', 'patient'), appointmentController.getAllAppointments);
router.get('/schedule/:doctorId',  appointmentController.getAppointmentsSchedule);
router.get('/patients/:patientId', auth, ensurePatinet, appointmentController.getPatientAppointment);
router.post('/', auth, ensureRole('patient', 'receptionist'), appointmentController.createAppointment);
router.post('/approve/:id', auth, ensureRole('patient', 'doctor'), appointmentController.approveAppointment);
router.post('/cancel/:id', auth, ensureRole('patient', 'doctor'), appointmentController.cancelAppointment);

module.exports = router;