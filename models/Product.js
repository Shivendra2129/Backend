const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ["Vegetables", "Fruits", "Grains", "Dairy", "Other"], 
    required: true 
  },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  imageURL: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);

