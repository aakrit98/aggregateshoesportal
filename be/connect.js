const mysql = require("mysql2/promise");

// Create a MySQL connection pool (best practice for managing MySQL connections)
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Manchesterunited@100",
  database: "aggreagateshoesportal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to test MySQL connection
async function connectToMySQL() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL database!");
    connection.release(); // Release connection back to pool
  } catch (err) {
    console.error("❌ Error connecting to MySQL:", err);
    throw err; // Throw error so it can be handled elsewhere
  }
}

module.exports = {
  connectToMySQL,
  db, // Export connection pool
};
