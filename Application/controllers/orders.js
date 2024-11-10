const Order = require("../models/orders");
const User = require("../models/users");
const Car = require("../models/cars");
const { createOrderFilters } = require("../helpers/filters");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, orderStatus, totalCost, purchaseDate } = req.body;

    // Check if userId is valid
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if all car IDs in items are valid
    const carsExist = await Promise.all(
      items.map((item) => Car.findById(item.carId))
    );
    if (carsExist.includes(null)) {
      return res.status(404).json({ message: "One or more cars not found" });
    }

    const order = new Order({
      userId,
      items,
      orderStatus,
      totalCost,
      purchaseDate,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try { 
    const query = req.query;
    if(req.body.isAdmin) {
      const filters = createOrderFilters(query, req.body.isAdmin);
      const orders = await Order.find(filters);
      res.json(orders);
    } else {
      res.status(500).json({ message: "Error fetching orders - the user is not admin", error: error.message });
    }

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
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
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: error.message });
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

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the user's order history with the modified order
    await User.updateOne(
      { _id: updatedOrder.userId, "orderHistory.orderId": updatedOrder._id },
      { $set: { "orderHistory.$": updatedOrder } }
    );

    res
      .status(200)
      .json({ message: "Order updated successfully", data: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id); // Consistent usage of id
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Remove the order from user's order history
    await User.updateOne(
      { _id: deletedOrder.userId },
      { $pull: { orderHistory: { orderId: deletedOrder._id } } }
    );

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.error("Error deleting order:", error);
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

exports.getRevenueByMonth = async (req, res) => {
  const year = parseInt(req.params.year, 10);
  try {
    const startDate = new Date(`${year}-01-01T00:00:00Z`);
    const endDate = new Date(`${year + 1}-01-01T00:00:00Z`);

    const revenueData = await Order.aggregate([
      {
        $match: {
          purchaseDate: {
            $gte: startDate,
            $lt: endDate,
          },
          orderStatus: { $in: ["Shipped", "Delivered"] }, 
        }
      },
      {
        $project: {
          month: { $month: "$purchaseDate" }, 
          totalCost: 1,
        }
      },
      {
        $group: {
          _id: "$month", // Group by month
          totalRevenue: { $sum: "$totalCost" },
        }
      },
      { $sort: { _id: 1 } } // Sort by month in ascending order
    ]);

    res.status(200).json(
      revenueData.map(d => ({
        month: d._id,
        totalRevenue: d.totalRevenue,
      }))
    );
  } catch (err) {
    console.error("Error in revenue aggregation:", err);
    res.status(500).json({ message: err.message });
  }
};
