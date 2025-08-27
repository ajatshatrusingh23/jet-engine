const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two users can have the same email
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// This special function will run *before* a user is saved to the database
userSchema.pre('save', async function (next) {
  // We only want to hash the password if it's new or has been changed
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a "salt" to make the hash more secure
  const salt = await bcrypt.genSalt(10);
  // Replace the plain text password with the new, hashed password
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;