const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false, message: "error fetching products" });
  }
  res.send(productList);
});

router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    stock: req.body.stock,
    price: req.body.price,
    description: req.body.description,
  });

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((error) => {
      res.status(500).json({ error: error, success: false });
    });
  res.send(product);
});

module.exports = router;
