const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment');
const { auth, ensurePatinet, ensureRole } = require('../middleware/auth');
const passport = require("../config/passport");

router.get('/all', auth, ensureRole('receptionist', 'doctor', 'patient'), appointmentController.getAllAppointments);
router.get('/schedule/:doctorId',  appointmentController.getAppointmentsSchedule);
router.get('/patients/:patientId', auth, ensurePatinet, appointmentController.getPatientAppointment);
router.post('/', auth, ensureRole('patient', 'receptionist'), appointmentController.createAppointment);
router.post('/approve/:id', auth, ensurePatinet, appointmentController.approveAppointment);
router.post('/cancel/:id', auth, ensurePatinet, appointmentController.cancelAppointment);

module.exports = router;