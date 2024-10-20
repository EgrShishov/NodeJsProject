const express = require('express');
const router = express.Router();
const receptionistController = require('../controllers/receptionist');
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.get('/all', receptionistController.getAllReceptionists);
router.get('/:id', receptionistController.getReceptionistById);
router.post('/', receptionistController.createReceptionist);
router.put('/:id', receptionistController.editReceptionist);
router.delete('/:id', receptionistController.deleteReceptionist);

module.exports = router;