const express = require("express");
const router = express.Router();
const { 
  handleAddToWishlist,
  handleGetWishlistByUserId, 
  handleDeleteWishlistItem,
  handleClearWishlist
} = require("../controllers/wishList");
// Add a product to the wishlist
router.post("/", handleAddToWishlist);

// Get all products in a user's wishlist
router.get("/:userId", handleGetWishlistByUserId);

// Remove an item from the wishlist
router.delete("/:id", handleDeleteWishlistItem);

// Clear all items from the wishlist for a user
router.delete("/clear/:userId", handleClearWishlist);

module.exports = router;
