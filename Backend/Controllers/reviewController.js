const Review = require('../models/ReviewModel');
const Order = require('../models/OrderModel');

// Fetch all reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId }).populate('userId', 'firstName lastName profileImage');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
};

// Calculate average rating for a product
exports.getProductAverageRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const result = await Review.aggregate([
      { $match: { productId: require('mongoose').Types.ObjectId(productId) } },
      { $group: { _id: '$productId', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    if (result.length === 0) {
      return res.json({ avgRating: 0, count: 0 });
    }
    res.json({ avgRating: result[0].avgRating, count: result[0].count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate average rating', error });
  }
};

// Helper: Check if user is a verified buyer for the product
async function isVerifiedBuyer(userId, productId) {
  const order = await Order.findOne({
    user: userId,
    'products.product': productId,
    status: { $in: ['completed', 'delivered'] }
  });
  return !!order;
}

// Post a review (only for verified buyers)
exports.createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const { rating, comment, photos } = req.body;

    // Check if user is a verified buyer
    const verified = await isVerifiedBuyer(userId, productId);
    if (!verified) {
      return res.status(403).json({ message: 'Only verified buyers can post reviews.' });
    }

    // Prevent duplicate review by same user for same product
    const existing = await Review.findOne({ productId, userId });
    if (existing) {
      return res.status(400).json({ message: 'You have already reviewed this product.' });
    }

    const review = new Review({
      productId,
      userId,
      rating,
      comment,
      photos,
      isVerifiedBuyer: true
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review', error });
  }
}; 