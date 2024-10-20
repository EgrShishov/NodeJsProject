const express = require('express');
const router = express.Router();
const specializationsController = require('../controllers/specialization');
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.get('/all', specializationController.getAllSpecializations);
router.get('/:id', specializationController.getSpecializationById);
router.post('/', specializationController.createSpecialization);
router.put('/:id', specializationController.editSpecialization);
router.delete('/:id', specializationController.deleteSpecialization);

module.exports = router;