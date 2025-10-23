// =================================================================
// BƯỚC 1: IMPORT TẤT CẢ CÁC MODEL ĐÃ ĐƯỢC ĐỊNH NGHĨA
// (Giả sử mỗi file model đã import 'sequelize' và 'DataTypes' từ configs/mysql.js)
// =================================================================
import User from './userModel.js';
import Category from './categoryModel.js';
import Product from './productModel.js';
import OrderProduct from './orderProductModel.js';
import OrderItem from './orderItemModel.js';
import Wallet from './walletModel.js';
import TransactionLog from './transactionLogModel.js';
import Review from './reviewModel.js';
import GreenCreditLog from './greenCreditLogModel.js';
import Cart from './cartModel.js';
import Chat from './chatModel.js';

// =================================================================
// BƯỚC 2: THIẾT LẬP MỐI QUAN HỆ (ASSOCIATIONS) - BẮT BUỘC
// Code này phải chạy để Sequelize biết cách liên kết các bảng
// =================================================================

// User <-> Product (Seller)
User.hasMany(Product, { foreignKey: 'sellerId', as: 'Products' });
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'Seller' });

// Category <-> Product
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

// User <-> OrderProduct (Buyer & Seller)
User.hasMany(OrderProduct, { foreignKey: 'buyerId', as: 'Purchases' });
User.hasMany(OrderProduct, { foreignKey: 'sellerId', as: 'Sales' });
OrderProduct.belongsTo(User, { foreignKey: 'buyerId', as: 'Buyer' });
OrderProduct.belongsTo(User, { foreignKey: 'sellerId', as: 'Seller' });

// OrderProduct <-> OrderItem
OrderProduct.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(OrderProduct, { foreignKey: 'orderId' });

// Product <-> OrderItem
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// User <-> Wallet (1-1)
User.hasOne(Wallet, { foreignKey: 'userId' });
Wallet.belongsTo(User, { foreignKey: 'userId' });

// User <-> TransactionLog
User.hasMany(TransactionLog, { foreignKey: 'userId' });
TransactionLog.belongsTo(User, { foreignKey: 'userId' });

// OrderProduct <-> TransactionLog
OrderProduct.hasMany(TransactionLog, { foreignKey: 'orderId' });
TransactionLog.belongsTo(OrderProduct, { foreignKey: 'orderId' });

// User <-> Review (Reviewer & ReviewedUser)
User.hasMany(Review, { foreignKey: 'reviewerId', as: 'SentReviews' });
User.hasMany(Review, { foreignKey: 'reviewedUserId', as: 'ReceivedReviews' });
Review.belongsTo(User, { foreignKey: 'reviewerId', as: 'Reviewer' });
Review.belongsTo(User, { foreignKey: 'reviewedUserId', as: 'ReviewedUser' });

// OrderProduct <-> Review
OrderProduct.hasMany(Review, { foreignKey: 'orderId' });
Review.belongsTo(OrderProduct, { foreignKey: 'orderId' });

// User <-> GreenCreditLog
User.hasMany(GreenCreditLog, { foreignKey: 'userId' });
GreenCreditLog.belongsTo(User, { foreignKey: 'userId' });

// OrderProduct <-> GreenCreditLog
OrderProduct.hasMany(GreenCreditLog, { foreignKey: 'orderId' });
GreenCreditLog.belongsTo(OrderProduct, { foreignKey: 'orderId' });

// User <-> Cart
User.hasMany(Cart, { foreignKey: 'buyerId' });
Cart.belongsTo(User, { foreignKey: 'buyerId' });

// Product <-> Cart
Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

// User <-> Chat (Sender & Receiver)
User.hasMany(Chat, { foreignKey: 'senderId', as: 'SentMessages' });
User.hasMany(Chat, { foreignKey: 'receiverId', as: 'ReceivedMessages' });
Chat.belongsTo(User, { foreignKey: 'senderId', as: 'Sender' });
Chat.belongsTo(User, { foreignKey: 'receiverId', as: 'Receiver' });

// OrderProduct <-> Chat
OrderProduct.hasMany(Chat, { foreignKey: 'orderId' });
Chat.belongsTo(OrderProduct, { foreignKey: 'orderId' });


// =================================================================
// BƯỚC 3: EXPORT THEO FORMAT CỦA BẠN
// =================================================================

export { default as User } from './userModel.js';
export { default as Category } from './categoryModel.js';
export { default as Product } from './productModel.js';
export { default as OrderProduct } from './orderProductModel.js';
export { default as OrderItem } from './orderItemModel.js';
export { default as Wallet } from './walletModel.js';
export { default as TransactionLog } from './transactionLogModel.js';
export { default as Review } from './reviewModel.js';
export { default as GreenCreditLog } from './greenCreditLogModel.js';
export { default as Cart } from './cartModel.js';
export { default as Chat } from './chatModel.js';