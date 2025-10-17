const express = require("express");
const router = express.Router();
const { placeOrder, getCustomerOrders, getFarmerOrders, updateOrderStatus } = require("../controllers/orderController");
const auth = require("../middleware/authMiddleware");

// Customer
router.post("/", auth(["customer"]), placeOrder);
router.get("/my-orders", auth(["customer"]), getCustomerOrders);

// Farmer
router.get("/farmer-orders", auth(["farmer"]), getFarmerOrders);
router.put("/:id/status", auth(["farmer"]), updateOrderStatus);

module.exports = router;
