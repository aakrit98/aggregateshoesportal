const db = require("../connect"); // ✅ Ensure correct import

// Create the users table
const createUserTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await db.query(query); // ✅ Use `query()` for table creation
    console.log("✅ Users table created or already exists.");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
  }
};

// Insert a new user (Signup)
const createUser = async (name, email, password) => {
  try {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [name, email, password]); // ✅ Use `query()`
    return result;
  } catch (error) {
    console.error("❌ Error creating user:", error);
    throw error;
  }
};

// Find a user by email (Login)
const findUserByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(query, [email]); // ✅ Use `query()`
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("❌ Error finding user:", error);
    throw error;
  }
};

// Exporting the functions
module.exports = {
  createUserTable,
  createUser,
  findUserByEmail,
};
