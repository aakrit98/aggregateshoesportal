const { db } = require("../connect");

// Add a product to the wishlist
async function handleAddToWishlist(req, res) {
    const { UserID, ProductID } = req.body; // Change to match the capitalized keys
  
    console.log("Received Data:", req.body); // Debugging
  
    if (!UserID || !ProductID) {
      return res.status(400).json({ msg: "Invalid input" });
    }
  
    try {
      // Check if the product exists
      const [product] = await db.query("SELECT * FROM Products WHERE ID = ?", [ProductID]);
      if (product.length === 0) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      // Check if the product is already in the wishlist
      const [wishlistItem] = await db.query("SELECT * FROM Wishlist WHERE UserID = ? AND ProductID = ?", [UserID, ProductID]);
      if (wishlistItem.length > 0) {
        return res.status(400).json({ msg: "Product already in wishlist" });
      }
  
      // Add product to the wishlist
      await db.query("INSERT INTO Wishlist (UserID, ProductID) VALUES (?, ?)", [UserID, ProductID]);
      res.status(201).json({ status: "success", msg: "Product added to wishlist" });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }
  

// Get all products in a user's wishlist
async function handleGetWishlistByUserId(req, res) {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }

  try {
    const [wishlistItems] = await db.query(
      `SELECT Wishlist.ID, Products.ID AS ProductID, Products.Name, Products.Description, 
              Products.Price, Products.Image 
       FROM Wishlist 
       JOIN Products ON Wishlist.ProductID = Products.ID 
       WHERE Wishlist.UserID = ?`,
      [userId]
    );

    const updatedWishlistItems = wishlistItems.map((item) => ({
      ...item,
      Image: item.Image ? `${req.protocol}://${req.get("host")}/uploads/${item.Image}` : null,
    }));

    res.json(updatedWishlistItems);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

// Remove an item from the wishlist
async function handleDeleteWishlistItem(req, res) {
  const id = Number(req.params.id);

  try {
    const [wishlistItem] = await db.query("SELECT * FROM Wishlist WHERE ID = ?", [id]);

    if (wishlistItem.length === 0) {
      return res.status(404).json({ msg: "Wishlist item not found" });
    }

    await db.query("DELETE FROM Wishlist WHERE ID = ?", [id]);

    res.json({ status: "success", msg: "Wishlist item removed successfully" });
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

// Clear all items from the wishlist
async function handleClearWishlist(req, res) {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }

  try {
    await db.query("DELETE FROM Wishlist WHERE UserID = ?", [userId]);
    res.json({ status: "success", msg: "Wishlist cleared successfully" });
  } catch (error) {
    console.error("Error clearing wishlist:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

module.exports = {
  handleAddToWishlist,
  handleGetWishlistByUserId,
  handleDeleteWishlistItem,
  handleClearWishlist,
};
