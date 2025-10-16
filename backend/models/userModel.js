// Thư mục: backend/models
// Tên file: userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  profilePicture: {
    type: DataTypes.STRING,
  },
  reputationScore: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
  },
  greenCredit: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isGreenSeller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
  tableName: 'User'
});

module.exports = User;
