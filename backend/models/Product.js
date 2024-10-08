const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    required: false,
  },
  ingredients: [
    {
      type: String,
      required: false,
    },
  ],
  instructions: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: String,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  skinType: {
    type: String,
    enum: ["dry", "oily", "combination", "normal"],
    required: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

productSchema.set("toJSON", {
  virtuals: true,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
