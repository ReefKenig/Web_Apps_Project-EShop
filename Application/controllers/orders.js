// controllers/orderController.js
const Order = require('../models/orders');
const User = require('../models/users');
const Car = require('../models/cars');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalCost, paymentInfo } = req.body;

    // Validate the input
    if (!userId || !items || items.length === 0 || !totalCost || !paymentInfo) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if userId is valid
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if all carIds in items are valid
    for (const item of items) {
      const carExists = await Car.findById(item.carId);
      if (!carExists) {
        return res.status(404).json({ message: `Car with ID ${item.carId} not found` });
      }
    }

    const order = new Order({
      userId,
      items,
      totalCost,
      paymentInfo,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Populate user details and car details in items
    const Orders = await Order.find({})
      .populate('userId')
      .populate('items.carId');

    res.status(200).json(Orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message });
  }
};


// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('userId')
      .populate('items.carId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.carId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order details
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    // Update the user's order history with the modified order
    await User.updateOne(
      { _id: updatedOrder.userId, "orderHistory.orderId": updatedOrder._id },
      { $set: { "orderHistory.$": updatedOrder } }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });

    // Remove the order from user's order history
    await User.updateOne(
      { _id: deletedOrder.userId },
      { $pull: { orderHistory: { orderId: deletedOrder._id } } }
    );

    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { orderStatus: req.body.orderStatus },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    // Reflect the updated order status in user's order history
    await User.updateOne(
      { _id: updatedOrder.userId, "orderHistory.orderId": updatedOrder._id },
      { $set: { "orderHistory.$.orderStatus": updatedOrder.orderStatus } }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
