const express = require("express");
const router = express.Router();
const { getRevenueData } = require("../controllers/orderController");

router.get("/revenue-data", getRevenueData);

module.exports = router;
