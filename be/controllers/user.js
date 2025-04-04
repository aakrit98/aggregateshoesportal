// controllers/user.js
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { setUser } = require("../service/auth");
const {db} = require("../connect")

async function handleUserSignup(req, res) {
  try {
    console.log("inside signup");
    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase();
    
    // Check if user already exists
    const existingUser = await User.findUserByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    
    await User.createUser({
      name,
      email: normalizedEmail,
      password,
    });
    
    return res.status(201).json({ 
      success: true, 
      message: "User registered successfully" 
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleUserLogin(req, res) {
  try {
    console.log("Inside login");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const normalizedEmail = email.toLowerCase();
    
    console.log("Fetching user from database...");
    const user = await User.findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("Comparing passwords...");
    const passwordMatch = await User.validatePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("Generating token...");
    const token = setUser(user);

    return res.json({
      success: true,
      message: "Login successful",
      token: token,
      user: { id: user.id, name: user.name },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}






//function to handle the delete user

async function handleDeleteUserById(req, res) {
  try {
    // Get user ID from the request parameters
    const userId = req.params.userId;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    
    const deleted = await User.deleteUserById(userId);
    
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    
    return res.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


async function handleGetAllUsers(req, res) {
  try {
    // Query to fetch all users (excluding sensitive info like password)
    const [rows, fields] = await db.query('SELECT id, name, email FROM users');
    
    // Check if no users found
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found"
      });
    }

    // Return users in response
    return res.json({
      success: true,
      count: rows.length,
      users: rows
    });
  } catch (error) {
    console.error("Error getting users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleUpdateUser(req, res) {
  const { id } = req.params;  // User ID from request parameters
  const { name, email } = req.body;  // Name and email from the request body

  try {
    // Check if user exists in the database
    const [existingUsers] = await db.query("SELECT * FROM Users WHERE id = ?", [id]);
    
    // If user not found, return 404 error
    if (existingUsers.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const existingUser = existingUsers[0];

    // Prepare the values for updating, fallback to existing user data if not provided
    const updatedName = name || existingUser.name;
    const updatedEmail = email || existingUser.email;

    // Update user information in the database
    await db.query(
      `UPDATE Users SET name = ?, email = ? WHERE id = ?`,
      [updatedName, updatedEmail, id]
    );

    // Respond with success and the fields that were updated
    return res.json({
      status: "success",
      msg: "User updated successfully",
      updatedFields: {
        name: name !== undefined,
        email: email !== undefined
      }
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      status: "error",
      msg: "Internal server error",
      error: error.message
    });
  }
}


module.exports = {
  handleUserLogin,
  handleUserSignup,
  handleDeleteUserById, 
  handleGetAllUsers,
  handleUpdateUser,
};
