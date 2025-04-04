const { db } = require("../connect");


const addShippingAddress = (req, res) => {
    const { userId, fullName, phoneNumber, address } = req.body;
  
    const query = `
      INSERT INTO ShippingAddresses (UserID, FullName, PhoneNumber, Address)
      VALUES (?, ?, ?, ?)
    `;
    const values = [userId, fullName, phoneNumber, address];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting address:", err);
        return res.status(500).json({ message: "Error saving address" });
      }
      res.status(200).json({ message: "Address saved successfully", addressId: result.insertId });
    });
  };
  
  // Function to get all shipping addresses for a user
  const getShippingAddresses = (req, res) => {
    const userId = req.params.userId;
  
    const query = "SELECT * FROM ShippingAddresses WHERE UserID = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching addresses:", err);
        return res.status(500).json({ message: "Error fetching addresses" });
      }
      res.status(200).json({ addresses: results });
    });
  };
  
  module.exports = {
    addShippingAddress,
    getShippingAddresses,
  };