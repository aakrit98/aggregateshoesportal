const db = require("../index"); // Import the existing DB connection

// Create the URLs table (if not already created)
const createUrlTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS urls (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      shortId VARCHAR(255) NOT NULL UNIQUE, 
      redirectURL VARCHAR(255) NOT NULL, 
      visitHistory JSON DEFAULT '[]',  -- Store visit history as JSON array
      createdBy INT,  -- Reference to user ID (foreign key)
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (createdBy) REFERENCES users(id)  -- Foreign key to the users table
    )
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error creating URLs table:", err);
    } else {
      console.log("URLs table created or exists");
    }
  });
};

// Insert a new URL
const createUrl = (shortId, redirectURL, visitHistory = [], createdBy) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO urls (shortId, redirectURL, visitHistory, createdBy) VALUES (?, ?, ?, ?)";
    const visitHistoryJson = JSON.stringify(visitHistory); // Convert visitHistory to JSON string

    db.query(
      query,
      [shortId, redirectURL, visitHistoryJson, createdBy],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// Find URL by shortId
const findUrlByShortId = (shortId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM urls WHERE shortId = ?";
    db.query(query, [shortId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]); // Return the first match
      }
    });
  });
};

// Update visit history
const updateVisitHistory = (shortId, timestamp) => {
  return new Promise((resolve, reject) => {
    // Add a new visit timestamp to the visitHistory JSON field
    const query = `
      UPDATE urls
      SET visitHistory = JSON_ARRAY_APPEND(visitHistory, '$', ?)
      WHERE shortId = ?
    `;
    db.query(query, [timestamp, shortId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Exporting functions for use in controllers
module.exports = {
  createUrlTable,
  createUrl,
  findUrlByShortId,
  updateVisitHistory,
};
