
const { db } = require("../connect");

async function handleCreateOrder(req, res) {
  const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;

  if (!userId || !items || !totalAmount || !shippingAddress || !paymentMethod) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  // Get a connection from the pool
  let connection;
  try {
    // For mysql2, use the promise-based connection
    connection = await db.getConnection();
    
    // Start a transaction
    await connection.beginTransaction();

    // Create the order
    const [orderResult] = await connection.query(
      "INSERT INTO Orders (UserID, TotalAmount, ShippingAddress, PaymentMethod) VALUES (?, ?, ?, ?)",
      [userId, totalAmount, shippingAddress, paymentMethod]
    );

    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await connection.query(
        "INSERT INTO OrderItems (OrderID, ProductID, Quantity, Price) VALUES (?, ?, ?, ?)",
        [orderId, item.ProductID, item.Quantity, item.Price]
      );
    }

    // Determine initial order status based on payment method
    const initialStatus = paymentMethod === "COD" ? "Processing" : "Awaiting Payment";
    await connection.query("UPDATE Orders SET Status = ? WHERE ID = ?", [initialStatus, orderId]);

    // Clear the cart after successful order
    await connection.query("DELETE FROM Cart WHERE UserID = ?", [userId]);

    // Commit the transaction
    await connection.commit();
    
    // Release the connection
    connection.release();

    // Send success response
    res.status(201).json({ 
      status: "success", 
      msg: "Order created successfully", 
      orderId 
    });
  } catch (error) {
    // Rollback transaction in case of error
    if (connection) {
      try {
        await connection.rollback();
        connection.release();
      } catch (rollbackError) {
        console.error("Error rolling back transaction:", rollbackError);
      }
    }
    console.error("Error creating order:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

async function handleGetUserOrders(req, res) {
  const userId = Number(req.params.userId);

  try {
    const [orders] = await db.query(
      "SELECT * FROM Orders WHERE UserID = ? ORDER BY OrderDate DESC",
      [userId]
    );

    // For each order, get its items
    for (let order of orders) {
      const [items] = await db.query(
        `SELECT oi.*, p.Name, p.Image 
         FROM OrderItems oi
         JOIN Products p ON oi.ProductID = p.ID
         WHERE oi.OrderID = ?`,
        [order.ID]
      );

      order.items = items.map(item => ({
        ...item,
        Image: item.Image ? `${req.protocol}://${req.get("host")}/uploads/${item.Image}` : null,
      }));
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

async function handleGetOrderById(req, res) {
    const orderId = Number(req.params.orderId);
  
    try {
      const [orders] = await db.query(
        "SELECT * FROM Orders WHERE ID = ?",
        [orderId]
      );
  
      if (orders.length === 0) {
        return res.status(404).json({ msg: "Order not found" });
      }
  
      const order = orders[0];
  
      // Get order items
      const [items] = await db.query(
        `SELECT oi.*, p.Name, p.Image 
         FROM OrderItems oi
         JOIN Products p ON oi.ProductID = p.ID
         WHERE oi.OrderID = ?`,
        [orderId]
      );
  
      order.items = items.map(item => ({
        ...item,
        Image: item.Image ? `${req.protocol}://${req.get("host")}/uploads/${item.Image}` : null,
      }));
  
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  } 

  // Add this to controllers/order.js

async function handleUpdateOrderStatus(req, res) {
  const orderId = Number(req.params.orderId);
  const { status } = req.body;
  
  // Validate status
  const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      status: "error", 
      msg: "Invalid status. Valid statuses are: " + validStatuses.join(', ') 
    });
  }

  try {
    await db.query(
      "UPDATE Orders SET Status = ? WHERE ID = ?",
      [status, orderId]
    );
    
    res.json({ 
      status: "success", 
      msg: "Order status updated successfully" 
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

async function handleGetAllOrders(req, res) {
  try {
    const [orders] = await db.query(
      "SELECT * FROM Orders ORDER BY OrderDate DESC"
    );

    // For each order, get its items
    for (let order of orders) {
      const [items] = await db.query(
        `SELECT oi.*, p.Name, p.Image 
         FROM OrderItems oi
         JOIN Products p ON oi.ProductID = p.ID
         WHERE oi.OrderID = ?`,
        [order.ID]
      );

      order.items = items;
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
}

module.exports = {
  handleCreateOrder,
  handleGetUserOrders, 
  handleGetOrderById,
  handleUpdateOrderStatus, 
  handleGetAllOrders
  
};