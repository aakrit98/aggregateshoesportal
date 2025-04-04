const express = require("express");
const router = express.Router();
const { 
    handleAddToCart,
    handleClearCart,
    handleDeleteCartItem,
    handleGetCartByUserId,
    handleUpdateCartItem,
    handleGetAllCartItems,
} = require("../controllers/Cart.js")

router.get("/getall" , handleGetAllCartItems);
// ✅ Add a product to the cart
router.post("/", handleAddToCart);

// ✅ Get all cart items for a user
router.get("/:userId", handleGetCartByUserId);

// ✅ Update cart item quantity
router.patch("/:id", handleUpdateCartItem);

// ✅ Delete a specific cart item
router.delete("/:id", handleDeleteCartItem);

// ✅ Clear entire cart for a user
router.delete("/clear/:userId", handleClearCart); 


module.exports = router;
