// In your controller, create a function to get order revenue by date
const getRevenueData = async (req, res) => {
    try {
        const revenueData = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, // group by day
                    totalRevenue: { $sum: "$totalPrice" }
                }
            },
            { $sort: { _id: 1 } } // sort by date
        ]);
        res.json(revenueData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
