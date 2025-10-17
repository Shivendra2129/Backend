const Review = require("../models/Review");


exports.addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const newReview = new Review({
      product,
      customer: req.user.id,
      rating,
      comment
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("customer", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
