const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor');
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.get('/all', doctorController.getAllDoctors);
router.post('/', doctorController.createDoctor);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', doctorController.editDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;