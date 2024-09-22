const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).send("Access denied.");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).send("No token provided.");

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
      lastname: req.body.lastname,
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

router.put("/me/change-password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).send("User not found.");

    const isMatch = bcrypt.compareSync(currentPassword, user.passwordHash);
    if (!isMatch) return res.status(400).send("Current password is incorrect.");

    user.passwordHash = bcrypt.hashSync(newPassword, 10);
    await user.save();

    res.status(200).send({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error changing password", error });
  }
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-passwordHash");
    if (!user) return res.status(404).send("User not found.");
    res.send(user);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching user details", error });
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

router.put("/me", verifyToken, async (req, res) => {
  const { name, email, lastname } = req.body;
  console.log("🚀 ~ router.patch ~ name:", name);

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).send("User not found.");

    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;

    await user.save();

    res.status(200).send({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating profile", error });
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
module.exports.verifyToken = verifyToken;
