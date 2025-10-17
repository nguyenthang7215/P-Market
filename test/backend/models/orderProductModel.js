// Thư mục: backend/models
// Tên file: orderProductModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderProduct = sequelize.define('OrderProduct', {
  smartContractAddress: {
    type: DataTypes.STRING,
  },
  finalPriceStablecoin: {
    type: DataTypes.DECIMAL(18, 6),
    allowNull: false,
  },
  orderStatus: {
    type: DataTypes.ENUM('PendingDeposit', 'Deposited', 'Delivered', 'Completed', 'Cancelled', 'Disputed'),
    defaultValue: 'PendingDeposit',
  },
  escrowStatus: {
    type: DataTypes.ENUM('Deposited', 'Released', 'DisputedHold', 'Cancelled'),
    defaultValue: 'Deposited',
  },
  isReceivedConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isCashTransaction: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  tableName: 'OrderProduct'
});

module.exports = OrderProduct;
