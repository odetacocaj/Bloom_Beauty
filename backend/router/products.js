const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.category) {
    filter = { category: req.query.category };
  }
  const productList = await Product.find(filter).populate("category");

  if (!productList) {
    res.status(500).json({ success: false, message: "error fetching products" });
  }
  res.send(productList);
});

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    res.status(400).json({ success: false, message: "Category does not exist" });
  }
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    stock: req.body.stock,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    dateCreated: req.body.dateCreated,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) {
    return res.status(500).send("Failed to create product");
  }

  res.send(product);
});

router.get(`/:id`, async (req, res) => {
  console.log("🚀 ~ router.post ~ product:", product);
  console.log("🚀 ~ router.post ~ product:", product);
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false, message: "error fetching product" });
  }
  res.send(product);
});

router.put(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid id");
  }
  const category = await Category.findById(req.body.category);
  if (!category) {
    res.status(400).json({ success: false, message: "Category does not exist" });
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      stock: req.body.stock,
      price: req.body.price,
      brand: req.body.brand,
      category: req.body.category,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      dateCreated: req.body.dateCreated,
      isFeatured: req.body.isFeatured,
    },
    { new: true },
  );
  if (!product) {
    return res.status(404).json("Failed to update product!");
  }

  return res.status(200).send(product);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).json({ success: true, message: "Product deleted successfully!" });
      } else {
        return res.status(404).json({ success: false, message: "Product not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false, message: "error fetching product number" });
  }
  res.send({ productCount: productCount });
});

module.exports = router;
