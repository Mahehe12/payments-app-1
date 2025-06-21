const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 30,
    lowercase: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

userSchema.pre('remove', async function (next) {
  // Delete associated account
  await Account.deleteOne({ userId: this._id });
  next();
});

const User = mongoose.model("User", userSchema)
module.exports = { User };