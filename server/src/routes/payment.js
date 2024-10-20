const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.get('/all', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.post('/', paymentController.createPayment);

module.exports = router;