// routes/staticRouter.js
const express = require("express");
const router = express.Router();

// Modified to return JSON instead of rendering views
router.get("/", async (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  
  try {
    const db = require("../connect").db;
    const query = 'SELECT * FROM urls WHERE createdBy = ?';
    const [allurls] = await db.query(query, [req.user._id]);
    
    return res.json({
      success: true,
      urls: allurls
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).json({ error: "Database error" });
  }
});


router.get("/login", (req, res) => {
  return res.json({ 
    message: "Please use POST /api/login endpoint with email and password" 
  });
});


router.get("/signup", (req, res) => {
  return res.json({ 
    message: "Please use POST /api/signup endpoint with name, email, and password" 
  });
});

module.exports = router;