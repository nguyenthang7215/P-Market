// Thư mục: backend/models
// Tên file: productModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  priceVND: {
    type: DataTypes.DECIMAL(15, 0),
  },
  stablecoinPrice: {
    type: DataTypes.DECIMAL(18, 6),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  conditionProduct: {
    type: DataTypes.ENUM('New', 'Used'),
    allowNull: false,
  },
  listingType: {
    type: DataTypes.ENUM('Sell', 'FreeGift'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Sold'),
    defaultValue: 'Active',
  },
  campusLocation: {
    type: DataTypes.STRING,
  },
  images: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
  tableName: 'Product'
});

module.exports = Product;