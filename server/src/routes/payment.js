const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const {ensureReceptionist, ensureRole} = require("../middleware/auth");

router.get('/all', ensureReceptionist, paymentController.getAllPayments);
router.get('/:id', ensureReceptionist, paymentController.getPaymentById);
router.get('/:patientId', ensureRole('patient', 'receptionist'), paymentController.getPatientPayments);
router.get('/history/:patientId', ensureRole('patient', 'receptionist'), paymentController.getPaymentHistory);
router.post('/', ensureReceptionist, paymentController.createPayment);

module.exports = router;