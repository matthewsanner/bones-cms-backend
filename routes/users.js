const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

// Route to handle user registration
router.post("/create-account", (req, res) => {
  // Get username, email, and password from the request body
  const { username, email, password } = req.body;

  // Create a new user object with the provided data
  const newUser = new User({
    username,
    email,
    role: "guest",
  });

  // Register the user using Passport's register method
  User.register(newUser, password, (err, user) => {
    if (err) {
      // Handle error during registration
      console.error("Error registering user:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // User registration successful
      // You can add additional logic here if needed
      res.status(201).json({ message: "User registered successfully" });
    }
  });
});

// Handle user login
router.post("/login", passport.authenticate("local"), (req, res) => {
  // If authentication is successful, user object is stored in req.user
  res.json({ message: "Login successful", user: req.user });
});

// Logout route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      res.status(500).json({ message: "Failed to logout" });
    } else {
      res.json({ message: "Logged out successfully" });
    }
  });
});

// Route to check authentication status
router.get("/status", async (req, res) => {
  try {
    // Check if the user is authenticated
    const authenticated = req.isAuthenticated();

    // Include the user ID if authenticated
    if (authenticated) {
      const userId = req.user._id; // Assuming your user object has an _id field
      res.json({ authenticated, userId });
    } else {
      res.json({ authenticated });
    }
  } catch (error) {
    console.error("Error checking authentication status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get user data by ID
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // So far app only accesses username out of these provided variables, REMOVE unused ones later
    const { _id, username, email } = user;

    res.json({ _id, username, email });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

module.exports = router;
