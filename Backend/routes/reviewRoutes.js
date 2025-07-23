const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/reviewController');
const auth = require('../middleware/auth');

// Fetch all reviews for a product
router.get('/api/products/:productId/reviews', reviewController.getProductReviews);

// Get average rating for a product
router.get('/api/products/:productId/reviews/average', reviewController.getProductAverageRating);

// Post a review (auth required)
router.post('/api/products/:productId/reviews', auth.authenticateToken, reviewController.createReview);

module.exports = router; 