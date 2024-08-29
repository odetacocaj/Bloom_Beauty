const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  stock: Number,
  price: Number,
  description: String,
});

exports.Product = mongoose.model("Product", productSchema);
