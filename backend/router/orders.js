const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const { verifyToken } = require("./users.js");
router.get(`/`, async (req, res) => {
  const orderList = await Order.find().populate("user", "name email").sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false, message: "error fetching products" });
  }
  res.send(orderList);
});

router.get(`/:id`, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate({ path: "orderItems", populate: "product" });
  if (!order) {
    res.status(500).json({ success: false, message: "error fetching order" });
  }
  res.send(order);
});

router.post(`/`, verifyToken, async (req, res) => {
  try {
    // Create order items
    const orderItemsIds = await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      }),
    );

    // Calculate total prices
    const totalPrices = await Promise.all(
      orderItemsIds.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate("product", "price");
        return orderItem.product.price * orderItem.quantity;
      }),
    );

    const subtotal = totalPrices.reduce((a, b) => a + b, 0);
    let shippingFee = 0;

    if (req.body.deliveryMethod === "shipping") {
      shippingFee = req.body.shippingMethod === "fast" ? 5 : 2;
    }

    const totalPrice = subtotal + shippingFee;

    // Create new order
    let order = new Order({
      orderItems: orderItemsIds,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.user.userId, // Use the user ID from the token
      shippingMethod: req.body.deliveryMethod === "pickup" ? "none" : req.body.shippingMethod,
      deliveryMethod: req.body.deliveryMethod,
    });

    order = await order.save();
    if (!order) {
      return res.status(404).json("Failed to create order");
    }

    res.send(order);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to create order", error: error.message });
  }
});

router.put(`/:id`, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true },
  );
  if (!order) {
    return res.status(404).json("Failed to find order!");
  }

  return res.status(200).send(order);
});

router.delete("/:id", (req, res) => {
  Order.findByIdAndDelete(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndDelete(orderItem);
        });
        return res.status(200).json({ success: true, message: "Order deleted successfully!" });
      } else {
        return res.status(404).json({ success: false, message: "Order not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.get("/get/totalSales", async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("Total sales failed to be generated!");
  }
  res.send({ totalSales: totalSales.pop().totalSales });
});

router.get(`/get/count`, async (req, res) => {
  const orderCount = await Order.countDocuments();

  if (!orderCount) {
    res.status(500).json({ success: false, message: "error fetching total orders number" });
  }
  res.send({ orderCount: orderCount });
});

router.get(`/get/userOrders/:userId`, async (req, res) => {
  const userOrderList = await Order.find({ user: req.params.userId })
    .populate({ path: "orderItems", populate: "product" })
    .sort({ dateOrdered: -1 });

  if (!userOrderList) {
    res.status(500).json({ success: false, message: "error fetching user orders" });
  }
  res.send(userOrderList);
});

module.exports = router;
