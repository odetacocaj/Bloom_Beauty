const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  image: String,
  stock: Number,
  price: Number,
  description: String,
});

exports.User = mongoose.model("User", userSchema);
