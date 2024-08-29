const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  name: String,
  image: String,
  stock: Number,
  price: Number,
  description: String,
});

exports.Order = mongoose.model("Order", orderSchema);
