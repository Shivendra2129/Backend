const Order = require("../models/Order");


exports.placeOrder = async (req, res) => {
  try {
    const { farmer, products, totalAmount } = req.body;

    const newOrder = new Order({
      customer: req.user.id,
      farmer,
      products,
      totalAmount
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate("products.product", "name price")
      .populate("farmer", "name");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user.id })
      .populate("products.product", "name price")
      .populate("customer", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
