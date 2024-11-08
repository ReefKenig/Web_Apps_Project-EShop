// controllers/orderController.js
const Order = require("../models/orders");
const User = require("../models/users");
const Car = require("../models/cars");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, orderStatus, totalCost } = req.body;

    // Check if userId is valid
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if all car IDs in items are valid
    for (const item of items) {
      const carExists = await Car.findById(item.carId);
      if (!carExists) {
        return res
          .status(404)
          .json({ message: `Car with ID ${item.carId} not found` });
      }
    }

    const order = new Order({
      userId,
      items,
      orderStatus,
      totalCost,
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
      .populate("userId")
      .populate("items.carId");

    res.status(200).json(Orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("items.carId");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id }).populate(
      "items.carId"
    );

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aggregation function to get total revenue by month for a specific year
const getRevenueByMonth = async (year) => {
  try {
    const revenueData = await Order.aggregate([
      {
        $match: {
          // Filter orders by the given year
          createdAt: {
            $gte: new Date(`${year}-01-01T00:00:00`),
            $lt: new Date(`${year + 1}-01-01T00:00:00`),  // Year + 1 to get all of 2024
          },
          orderStatus: { $in: ["Shipped", "Delivered"] },  // Only count completed orders
        }
      },
      {
        $project: {
          month: { $month: "$createdAt" },  // Extract the month from createdAt
          totalCost: 1,  // Include the totalCost field for revenue
        }
      },
      {
        $group: {
          _id: "$month",  // Group by month
          totalRevenue: { $sum: "$totalCost" },  // Sum the totalCost for each month
        }
      },
      { $sort: { _id: 1 } }  // Sort by month (ascending order)
    ]);
    
    // Return data in a more usable format (optional)
    return revenueData.map(d => ({
      month: d._id,  // Month (1-12)
      totalRevenue: d.totalRevenue,  // Total revenue for that month
    }));
  } catch (err) {
    console.error("Error in aggregation:", err);
    return [];
  }
};



// Update order details
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOrder)
      return res.status(404).json({ message: "Order not found" });

    // Update the user's order history with the modified order
    await User.updateOne(
      { _id: updatedOrder.userId, "orderHistory.orderId": updatedOrder._id },
      { $set: { "orderHistory.$": updatedOrder } }
    );

    res
      .status(200)
      .json({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    // Remove the order from user's order history
    await User.updateOne(
      { _id: deletedOrder.userId },
      { $pull: { orderHistory: { orderId: deletedOrder._id } } }
    );

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
