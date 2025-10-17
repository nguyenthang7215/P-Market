// Thư mục: backend/routes
// Tên file: userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser); // Thêm route đăng nhập
router.get('/:id', userController.getUserProfile);

module.exports = router;