const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payments');

// Create a new payment
router.post('/payments', paymentController.createPayment);

// Get all payments
router.get('/payments', paymentController.getAllPayments);

// Get a payment by paymentId
router.get('/payments/:paymentId', paymentController.getPaymentById);

// Update a payment by paymentId
router.put('/payments/:paymentId', paymentController.updatePayment);

// Delete a payment by paymentId
router.delete('/payments/:paymentId', paymentController.deletePayment);

module.exports = router;
