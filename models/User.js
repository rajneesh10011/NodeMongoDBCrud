const mongoose = require('mongoose');

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],  // Custom error message
    minlength: [3, 'Name must be at least 3 characters long'], // Minimum length validation
    maxlength: [50, 'Name cannot be longer than 50 characters'], // Maximum length validation
  },
  email: {
    type: String,
    required: [true, 'Email is required'],  // Custom error message
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
      'Please enter a valid email address'
    ], // Email format validation
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],  // Custom error message
    min: [18, 'Age must be at least 18'],  // Minimum age validation
    max: [120, 'Age cannot be more than 120'],  // Maximum age validation
  },
});

// Create User model
const User = mongoose.model('User', UserSchema);

// Export User model
module.exports = User;
