const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Create a product (admin)
router.post('/', authenticateToken, authorizeAdmin, productController.createProduct);
// Get all products
router.get('/', productController.getProducts);
// Get a single product by ID
router.get('/:id', productController.getProductById);
// Update a product (admin)
router.put('/:id', authenticateToken, authorizeAdmin, productController.updateProduct);
// Delete a product (admin)
router.delete('/:id', authenticateToken, authorizeAdmin, productController.deleteProduct);

module.exports = router;