const { db } = require("../connect");

// const [user] = await db.query("SELECT * FROM Users WHERE ID = ?", [userId]);
// if (user.length === 0) {
//   return res.status(404).json({ msg: "User not found" });
// }
async function handleAddToCart(req, res) {
    const { userId, productId, quantity } = req.body;
    console.log(
      'body', req.body
    );
  
    console.log("Received Data:", req.body); // Debugging 
    
  
    if (!userId || !productId || !quantity || quantity < 1) {
      return res.status(400).json({ msg: "Invalid input" });
    }
  
    try {
      // Check if the product exists
      const [product] = await db.query("SELECT * FROM Products WHERE ID = ?", [productId]);
      console.log("Product Found:", product); // Debugging
      if (product.length === 0) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      // Check if the item is already in the cart
      const [cartItem] = await db.query("SELECT * FROM Cart WHERE UserID = ? AND ProductID = ?", [userId, productId]);
  
      if (cartItem.length > 0) {
        // Update quantity if item exists
        await db.query("UPDATE Cart SET Quantity = Quantity + ? WHERE UserID = ? AND ProductID = ?", [quantity, userId, productId]);
        return res.json({ status: "success", msg: "Cart updated successfully" });
      }
  
      // Insert new item into the cart
      await db.query("INSERT INTO Cart (UserID, ProductID, Quantity) VALUES (?, ?, ?)", [userId, productId, quantity]);
      res.status(201).json({ status: "success", msg: "Product added to cart" });
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }
  

async function handleGetCartByUserId(req, res) {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }

  try {
    const [cartItems] = await db.query(
      `SELECT Cart.ID, Cart.Quantity, Products.ID AS ProductID, Products.Name, Products.Description, 
              Products.Price, Products.Image 
       FROM Cart 
       JOIN Products ON Cart.ProductID = Products.ID 
       WHERE Cart.UserID = ?`,
      [userId]
    );

    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      Image: item.Image ? `${req.protocol}://${req.get("host")}/uploads/${item.Image}` : null,
    }));

    res.json(updatedCartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

async function handleUpdateCartItem(req, res) {
  const id = Number(req.params.id);
  const { quantity } = req.body;

  if (isNaN(id) || !quantity || quantity < 1) {
    return res.status(400).json({ msg: "Invalid input" });
  }

  try {
    const [cartItem] = await db.query("SELECT * FROM Cart WHERE ID = ?", [id]);

    if (cartItem.length === 0) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    await db.query("UPDATE Cart SET Quantity = ? WHERE ID = ?", [quantity, id]);

    res.json({ status: "success", msg: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

async function handleDeleteCartItem(req, res) {
  const id = Number(req.params.id);

  try {
    const [cartItem] = await db.query("SELECT * FROM Cart WHERE ID = ?", [id]);

    if (cartItem.length === 0) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    await db.query("DELETE FROM Cart WHERE ID = ?", [id]);

    res.json({ status: "success", msg: "Cart item removed successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

async function handleClearCart(req, res) {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }

  try {
    await db.query("DELETE FROM Cart WHERE UserID = ?", [userId]);
    res.json({ status: "success", msg: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
} 

async function handleGetAllCartItems(req, res) {
  try {
    console.log("Incoming request to fetch all cart items", req.query); // Debugging log

    // Query to fetch all cart items from the Cart table
    const [cartItems] = await db.query("SELECT * FROM Cart");

    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}





module.exports = {
  handleAddToCart,
  handleGetCartByUserId,
  handleUpdateCartItem,
  handleDeleteCartItem,
  handleClearCart,
  handleGetAllCartItems,
};
  