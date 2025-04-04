// routes/order.js
const express = require("express");
const router = express.Router();
const { 
  handleCreateOrder,
  handleGetUserOrders, 
  handleGetOrderById, 
  handleUpdateOrderStatus,
  handleGetAllOrders
} = require("../controllers/order");

// Create a new order
// router.post("/", handleCreateOrder);
router.post("/", (req, res) => {
  console.log("POST request to create order");
  handleCreateOrder(req, res);
});

// Get all orders for a user
router.get("/:userId", handleGetUserOrders); 
// Get a specific order by ID
router.get("/details/:orderId", handleGetOrderById); 

router.put("/status/:orderId" , handleUpdateOrderStatus); 
//get all for the admin view 
// Add this route to routes/order.js
router.get("/admin/all", handleGetAllOrders);

module.exports = router;
