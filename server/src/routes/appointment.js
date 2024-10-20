const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment');
const { ensureAuthenticated, ensureGuest, ensurePatinet, ensureReceptionist, ensureRole } = require('../middleware/auth');

router.get('/all', appointmentController.getAllAppointments);
router.get('/schedule/:doctorId', appointmentController.getAppointmentsSchedule);
router.get('/schedule/:patientId', ensurePatinet, appointmentController.getPatientAppointment);
router.post('/', ensureRole('patient', 'receptionist'), appointmentController.createAppointment);
router.post('/approve/:id', ensurePatinet, appointmentController.approveAppointment);
router.post('/cancel/:id', ensurePatinet, appointmentController.cancelAppointment);

module.exports = router;