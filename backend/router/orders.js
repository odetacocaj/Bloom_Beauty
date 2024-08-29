const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
router.get(`/`, async (req, res) => {
  const orderList = await Order.find();

  if (!orderList) {
    res.status(500).json({ success: false, message: "error fetching products" });
  }
  res.send(orderList);
});



module.exports = router;
