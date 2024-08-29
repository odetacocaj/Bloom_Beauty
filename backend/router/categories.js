const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false, message: "error fetching products" });
  }
  res.send(categoryList);
});

// router.post(`/`, (req, res) => {
//   const category = new Category({
//     name: req.body.name,
//     image: req.body.image,
//     stock: req.body.stock,
//     price: req.body.price,
//     description: req.body.description,
//   });

//   category
//     .save()
//     .then((createdCategory) => {
//       res.status(201).json(createdCategory);
//     })
//     .catch((error) => {
//       res.status(500).json({ error: error, success: false });
//     });
//   res.send(category);
// });

module.exports = router;
