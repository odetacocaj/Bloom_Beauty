const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false, message: "error fetching products" });
  }
  res.status(200).send(categoryList);
});

router.get(`/:id`, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json("Failed to find category");
  }
  return res.status(200).send(category);
});

router.put(`/:id`, async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true },
  );
  if (!category) {
    return res.status(404).json("Failed to find category");
  }

  return res.status(200).send(category);
});

router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
  });

  category = await category.save();
  if (!category) {
    return res.status(404).json("Failed to create category");
  }

  res.send(category);
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({ success: true, message: "Category deleted successfully!" });
      } else {
        return res.status(404).json({ success: false, message: "Category not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
