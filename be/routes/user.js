// In routes/user.js
const express = require("express")
const userController = require("../controllers/user");
const { restrictToLoggedinUserOnly } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", userController.handleUserSignup);
router.post("/login", userController.handleUserLogin);



// Use the function directly from the imported object
router.delete("/users/:userId", restrictToLoggedinUserOnly, userController.handleDeleteUserById);
router.patch('/users/:id', restrictToLoggedinUserOnly, userController.handleUpdateUser);
router.get('/users' , restrictToLoggedinUserOnly,userController.handleGetAllUsers);

module.exports = router;