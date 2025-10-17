// Thư mục: backend/controllers
// Tên file: productController.js
const { Product, User } = require('../models'); // Import User để lấy thông tin người bán

// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
    try {
        // Câu truy vấn mới: Chỉ lấy các trường cần thiết và thông tin người bán
        const products = await Product.findAll({
            attributes: ['id', 'title', 'stablecoinPrice', 'images', 'status', 'conditionProduct'],
            include: [{
                model: User,
                as: 'seller',
                attributes: ['id', 'userName'] // Chỉ lấy id và tên của người bán
            }],
            order: [['createdAt', 'DESC']] // Sắp xếp sản phẩm mới nhất lên đầu
        });
        res.status(200).json(products);
    } catch (error) {
        console.error("LỖI TRONG CONTROLLER getAllProducts:", error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
             include: [{
                model: User,
                as: 'seller',
                attributes: ['id', 'userName', 'reputationScore', 'profilePicture']
            }]
        });
        
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
    } catch (error) {
        console.error(`LỖI KHI TÌM SẢN PHẨM ${req.params.id}:`, error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

// Tạo sản phẩm mới
const createProduct = async (req, res) => {
    try {
        const {
            sellerId, categoryId, title, description, stablecoinPrice,
            quantity, conditionProduct, listingType, campusLocation, images
        } = req.body;

        if (!sellerId || !categoryId || !title || !stablecoinPrice || !conditionProduct || !listingType) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ các trường bắt buộc." });
        }

        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("LỖI KHI TẠO SẢN PHẨM:", error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
};