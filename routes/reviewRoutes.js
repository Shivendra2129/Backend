const express = require("express");
const router = express.Router();
const { addReview, getProductReviews } = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");

// Customer adds review
router.post("/", auth(["customer"]), addReview);

// Public - view reviews
router.get("/:productId", getProductReviews);

module.exports = router;
