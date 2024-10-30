const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor');
const { ensureAuthenticated, ensureGuest, ensureReceptionist, ensureRole} = require('../middleware/auth');

router.get('/all', doctorController.getAllDoctors);
router.post('/', ensureReceptionist, doctorController.createDoctor);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', ensureReceptionist, doctorController.editDoctor);
router.delete('/:id', ensureReceptionist, doctorController.deleteDoctor);

module.exports = router;