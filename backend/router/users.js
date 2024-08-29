const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.get(`/`, async (req, res) => {
  const userList = await user.find();

  if (!userList) {
    res.status(500).json({ success: false, message: "error fetching products" });
  }
  res.send(userList);
});

module.exports = router;
