// Thư mục: backend/routes
// Tên file: productRoutes.js
const express = require('express');
const { getAllProducts, getProductById, createProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

module.exports = router;