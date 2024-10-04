const Payment = require('../models/payments');

// Create a new payment
exports.createPayment = async (req, res) => {
  const { paymentId, cardNumber, paymentMethod, u_id, expiryDate } = req.body;

  const newPayment = new Payment({
    paymentId:paymentId,
    cardNumber:cardNumber,
    paymentMethod:paymentMethod,
    u_id:u_id,
    expiryDate:expiryDate,
  });

  try {
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Check if payment went through
exports.checkPaymentStatus = async (req, res) => {
    const { paymentId } = req.params;
    try {
      // Simulate checking the payment status (for example, from a database or payment gateway)
      const payment = await Payment.findOne({ paymentId });
  
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
  
      // Simulating a payment status (randomly setting success/failure)
      const isSuccessful = Math.random() >= 0.5; // Randomly returns true or false
  
      const statusMessage = isSuccessful ? "Payment went through" : "Payment failed";
      res.status(200).json({ paymentId, status: isSuccessful, message: statusMessage });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('u_id'); // Populate user ID if referenced
    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payments found' });
    }
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId).populate('u_id');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a payment by ID
exports.updatePayment = async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.paymentId, req.body, { new: true }).populate('u_id');
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment by ID
exports.deletePayment = async (req, res) => {
    const {paymentId}=req.params;
  try {
     await Payment.deleteOne({paymentId:paymentId});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
