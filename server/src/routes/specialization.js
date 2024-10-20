const express = require('express');
const router = express.Router();
const specializationController = require('../controllers/specialization');
const { ensureAuthenticated, ensureGuest, ensureReceptionist} = require('../middleware/auth');

router.get('/all', specializationController.getAllSpecializations);
router.get('/:id', specializationController.getSpecializationById);
router.post('/', ensureReceptionist, specializationController.createSpecialization);
router.put('/:id', ensureReceptionist, specializationController.editSpecialization);
router.delete('/:id', ensureReceptionist, specializationController.deleteSpecialization);

module.exports = router;