import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const Product = sequelize.define(
    'Product', // Tên của model
    {
        // Định nghĩa các cột
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Mối quan hệ (FOREIGN KEY) sẽ được định nghĩa
            // trong file models/index.js
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Mối quan hệ (FOREIGN KEY) sẽ được định nghĩa
            // trong file models/index.js
        },
        title: {
            type: DataTypes.STRING(255),
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
            allowNull: false,
            defaultValue: 'Active',
        },
        campusLocation: {
            type: DataTypes.STRING(255),
        },
        images: {
            type: DataTypes.JSON,
        },
        // 'createdAt' và 'updatedAt' sẽ được 'timestamps: true' quản lý
    },
    {
        // Tùy chọn cho model
        tableName: 'Product', // Bắt buộc tên bảng phải khớp với SQL
        timestamps: true,     // Tự động quản lý createdAt, updatedAt
    }
);

export default Product;