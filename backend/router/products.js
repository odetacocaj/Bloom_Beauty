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

const uploadOptions = multer({ storage: storage });

// GET /latest
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

// GET /
router.get("/", async (req, res) => {
  try {
    const filter = {};

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      filter.$or = [{ name: searchRegex }, { description: searchRegex }, { brand: searchRegex }];
    }

    if (req.query.bestsellers === "true") {
      filter.isFeatured = true;
    } else {
      if (req.query.category) {
        const categories = req.query.category.split(",");
        filter.category = { $in: categories };
      }

      if (req.query.skinType) {
        const skinTypes = req.query.skinType.split(",");
        filter.skinType = { $in: skinTypes };
      }

      if (req.query.brand) {
        const brands = req.query.brand.split(",");
        filter.brand = { $in: brands };
      }

      if (req.query.minPrice || req.query.maxPrice) {
        filter.price = {};
        if (req.query.minPrice) {
          filter.price.$gte = parseFloat(req.query.minPrice);
        }
        if (req.query.maxPrice) {
          filter.price.$lte = parseFloat(req.query.maxPrice);
        }
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sort = {};
    if (req.query.sort === "latest") {
      sort.createdAt = -1;
    } else if (req.query.sort === "price") {
      sort.price = 1;
    } else if (req.query.sort === "price-desc") {
      sort.price = -1;
    }

    const productList = await Product.find(filter)
      .populate("category")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalProducts = await Product.countDocuments(filter);

    if (!productList) {
      return res.status(500).json({ success: false, message: "Error fetching products" });
    }

    res.json({
      products: productList,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

// POST /
router.post(
  "/",
  uploadOptions.fields([
    { name: "image", maxCount: 1 }, // Single image
    { name: "images[]", maxCount: 5 }, // Array of images
  ]),
  async (req, res) => {
    try {
      console.log(req.body.ingredients);
      const category = await Category.findById(req.body.category);
      if (!category) return res.status(400).send("Invalid Category");

      // Handle the single image
      const singleImage = req.files["image"] ? req.files["image"][0] : null;
      const singleImagePath = singleImage
        ? `${req.protocol}://${req.get("host")}/public/uploads/${singleImage.filename}`
        : "";

      // Handle the array of images
      const imageFiles = req.files["images[]"] || [];
      const imagePaths = imageFiles.map(
        (file) => `${req.protocol}://${req.get("host")}/public/uploads/${file.filename}`,
      );

      let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: singleImagePath, // Single image path
        images: imagePaths, // Array of image paths
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
        skinType: req.body.skinType,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        ingredients: req.body.ingredients || [],
        instructions: req.body.instructions || "",
      });

      product = await product.save();

      if (!product) return res.status(500).send("The product cannot be created");

      res.send(product);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Server error");
    }
  },
);

// GET /brands
router.get("/brands", async (req, res) => {
  try {
    const brands = await Product.distinct("brand");

    if (!brands.length) {
      return res.status(404).json({ success: false, message: "No brands found" });
    }

    res.status(200).json(brands);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching brands", error: error.message });
  }
});

// GET /:id
router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({ success: false, message: "error fetching product" });
  }
  res.send(product);
});

// PUT /:id (update product)
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

// DELETE /:id (delete product)
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

// GET /get/count
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
