const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  ipAddress: { type: String },
  isVerified: { type: Boolean, default: false },
  emailToken: String,
  emailTokenExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
