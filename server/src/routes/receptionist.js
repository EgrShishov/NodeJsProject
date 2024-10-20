const express = require('express');
const router = express.Router();
const receptionistController = require('../controllers/receptionist');
const { ensureAuthenticated, ensureGuest, ensureReceptionist} = require('../middleware/auth');

router.get('/all', ensureReceptionist, receptionistController.getAllReceptionists);
router.get('/:id', ensureReceptionist, receptionistController.getReceptionistById);
router.post('/', ensureReceptionist, receptionistController.createReceptionist);
router.put('/:id', ensureReceptionist, receptionistController.editReceptionist);
router.delete('/:id', ensureReceptionist, receptionistController.deleteReceptionist);

module.exports = router;