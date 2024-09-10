const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) return res.status(403).send("Access denied.");

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token.");
    req.user = decoded;
    next();
  });
};

router.get("/verify", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  try {
    const secret = process.env.secret;
    const decoded = jwt.verify(token, secret);
    res.status(200).send({ isValid: true, user: decoded });
  } catch (err) {
    res.status(401).send("Invalid token");
  }
});

router.get(`/`, async (req, res) => {
  try {
    const userList = await User.find().select("-passwordHash");
    res.send(userList);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users", error });
  }
});

router.post(`/`, verifyToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });

    user = await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create user", error });
  }
});

router.post(`/register`, async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      color: req.body.color,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      address: req.body.address,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });

    user = await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to register", error });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(404).send("User not found.");
    res.send(user);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user", error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User not found.");

    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.secret,
        { expiresIn: "1d" },
      );
      res.status(200).send({ user: user.email, token: token, isAdmin: user.isAdmin });
    } else {
      res.status(400).send("Incorrect password.");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed", error });
  }
});

router.get(`/get/count`, verifyToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  try {
    const userCount = await User.countDocuments();
    res.send({ userCount: userCount });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user count", error });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({ success: true, message: "User deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.post("/logout", (req, res) => {
  res.status(200).send("Logged out successfully");
});

module.exports = router;
