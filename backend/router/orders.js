const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
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

router.post(`/`, async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    }),
  );

  const orderItemsIdsResloved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResloved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate("product", "price");
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    }),
  );
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems: orderItemsIdsResloved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });

  order = await order.save();
  if (!order) {
    return res.status(404).json("Failed to create order");
  }

  res.send(order);
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

router.get("/best-selling", async (req, res) => {
  try {
    const bestSellingProducts = await Order.aggregate([
      { $unwind: "$orderItems" }, 
      {
        $lookup: {
          from: "orderitems", 
          localField: "orderItems",
          foreignField: "_id",
          as: "orderItemDetails",
        },
      },
      { $unwind: "$orderItemDetails" },
      {
        $group: {
          _id: "$orderItemDetails.product",
          totalQuantity: { $sum: "$orderItemDetails.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } }, // Sort by totalQuantity in descending order
      { $limit: 5 },
      {
        $lookup: {
          from: "products", // Collection name for Product
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          product: "$productDetails",
          totalQuantity: 1,
        },
      },
    ]);

    if (bestSellingProducts.length === 0) {
      return res.status(404).json({ success: false, message: "No best-selling products found" });
    }

    res.json(bestSellingProducts);
  } catch (error) {
    console.error("Error fetching best-selling products:", error);
    res.status(500).json({ success: false, message: "Error fetching best-selling products", error: error.message });
  }
});


module.exports = router;
