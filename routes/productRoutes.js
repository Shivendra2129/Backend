const express = require("express");
const router = express.Router();
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Farmer only
router.post("/", auth(["farmer"]), addProduct);
router.put("/:id", auth(["farmer"]), updateProduct);
router.delete("/:id", auth(["farmer", "admin"]), deleteProduct);

module.exports = router;
