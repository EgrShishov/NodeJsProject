const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const {ensureReceptionist, ensureRole, auth} = require("../middleware/auth");
const passport = require('../config/passport');

router.get('/all', auth, ensureReceptionist, paymentController.getAllPayments);
router.get('/:id', auth, ensureReceptionist, paymentController.getPaymentById);
router.get('/:patientId', auth, ensureRole('patient', 'receptionist'), paymentController.getPatientPayments);
router.get('/history/:patientId', auth, ensureRole('patient', 'receptionist'), paymentController.getPaymentHistory);
router.post('/', auth, ensureReceptionist, paymentController.createPayment);

module.exports = router;