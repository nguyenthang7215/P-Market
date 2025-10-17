// Thư mục: backend/models
// Tên file: index.js
const User = require('./userModel');
const Category = require('./categoryModel');
const Product = require('./productModel');
const OrderProduct = require('./orderProductModel');
// Import các model khác ở đây...

// Định nghĩa các mối quan hệ
// User - Product (One-to-Many)
User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

// Category - Product (One-to-Many)
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// User - Order (Buyer and Seller)
User.hasMany(OrderProduct, { foreignKey: 'buyerId', as: 'purchases' });
User.hasMany(OrderProduct, { foreignKey: 'sellerId', as: 'sales' });
OrderProduct.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });
OrderProduct.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

// ...định nghĩa các quan hệ khác ở đây

// Export tất cả models
module.exports = {
  User,
  Category,
  Product,
  OrderProduct,
  // ...
};
