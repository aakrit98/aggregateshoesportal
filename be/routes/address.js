const express = require("express");
const { addShippingAddress, getShippingAddresses } = require("../controllers/address");

const router = express.Router();

// Route to add a new shipping address
router.post("/shipping", addShippingAddress);

// Route to get all shipping addresses for a user
router.get("/shipping/:userId", getShippingAddresses);

module.exports = router;
