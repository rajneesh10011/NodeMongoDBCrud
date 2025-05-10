const express = require("express");

const router = express.Router();

const User = require("../models/User");

// Create a new User
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const newUser = new User({ name, email, age });
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (err) {
    // Mongoose Validation Errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    // Duplicate key error (e.g., unique email)
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate field value entered",
        errors: [`${Object.keys(err.keyValue)[0]} already exists`],
      });
    }

    // Other server or DB errors
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});
