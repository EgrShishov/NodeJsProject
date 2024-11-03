const express = require('express');
const router = express.Router();
const specializationController = require('../controllers/specialization');
const { ensureAuthenticated, ensureGuest, ensureReceptionist, auth} = require('../middleware/auth');

router.get('/all', specializationController.getAllSpecializations);
router.get('/:id', specializationController.getSpecializationById);
router.post('/', auth, ensureReceptionist, specializationController.createSpecialization);
router.put('/:id', auth, ensureReceptionist, specializationController.editSpecialization);
router.delete('/:id', auth, ensureReceptionist, specializationController.deleteSpecialization);

module.exports = router;