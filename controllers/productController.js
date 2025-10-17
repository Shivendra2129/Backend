const Product = require("../models/Product");


exports.addProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, imageURL } = req.body;
    const newProduct = new Product({
      farmer: req.user.id, // from auth middleware
      name,
      description,
      category,
      price,
      stock,
      imageURL
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("farmer", "name email");
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
