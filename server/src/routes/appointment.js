const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment');
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.get('/all', appointmentController.getAllAppointments);
router.post('/', appointmentController.createAppointment);
router.post('/approve/:id', appointmentController.approveAppointment);
router.post('/cancel/:id', appointmentController.cancelAppointment);

module.exports = router;