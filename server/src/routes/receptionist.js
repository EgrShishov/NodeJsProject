const express = require('express');
const router = express.Router();
const receptionistController = require('../controllers/receptionist');
const {ensureReceptionist, auth} = require('../middleware/auth');

router.get('/all', auth, ensureReceptionist, receptionistController.getAllReceptionists);
router.get('/:id', auth, ensureReceptionist, receptionistController.getReceptionistById);
router.post('/', auth, ensureReceptionist, receptionistController.createReceptionist);
router.put('/:id', auth, ensureReceptionist, receptionistController.editReceptionist);
router.delete('/:id', auth, ensureReceptionist, receptionistController.deleteReceptionist);

module.exports = router;