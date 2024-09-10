const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

router.get("/latest", async (req, res) => {
  const numProducts = parseInt(req.query.count, 10) || 5; 

  if (isNaN(numProducts) || numProducts <= 0) {
    return res.status(400).json({ success: false, message: "Invalid count parameter" });
  }

  try {
    const latestProducts = await Product.find({})
      .sort({ dateCreated: -1 })
      .limit(numProducts)
      .populate("category");

    if (!latestProducts.length) {
      return res.status(404).json({ success: false, message: "No products found" });
    }

    res.json(latestProducts);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products", error: error.message });
  }
});

const uploadOptions = multer({ storage: storage });
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

router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: `${basePath}${fileName}`,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});

router.get(`/:id`, async (req, res) => {
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

router.put("/gallery-images/:id", uploadOptions.array("images", 5), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  const files = req.files;
  let imagesPaths = [];
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  if (files) {
    files.map((file) => {
      imagesPaths.push(`${basePath}${file.filename}`);
    });
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      images: imagesPaths,
    },
    { new: true },
  );

  if (!product) return res.status(500).send("the gallery cannot be updated!");

  res.send(product);
});

module.exports = router;
