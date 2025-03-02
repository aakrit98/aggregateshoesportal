const mysql = require("mysql2");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // MySQL username
  password: "", // MySQL password
  database: "aggreagateshoesportal", // Database name
});

// Connect to the MySQL database
db.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: " +error);
    return;
  }
  console.log("Connected to MySQL as ID " );
});

// Export the connection to use in other files
module.exports = db;