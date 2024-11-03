const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor');
const { ensureReceptionist, auth} = require('../middleware/auth');

router.get('/all', doctorController.getAllDoctors);
router.post('/', auth, ensureReceptionist, doctorController.createDoctor);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', auth, ensureReceptionist, doctorController.editDoctor);
router.delete('/:id', auth, ensureReceptionist, doctorController.deleteDoctor);

module.exports = router;