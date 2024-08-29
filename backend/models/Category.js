const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
  image: String,
  stock: Number,
  price: Number,
  description: String,
});

exports.Category = mongoose.model("Category", categorySchema);
