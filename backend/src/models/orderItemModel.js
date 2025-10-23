import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const OrderItem = sequelize.define(
    'OrderItem', // Tên của model
    {
        // Định nghĩa các cột
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Mối quan hệ (FOREIGN KEY) với OrderProduct
            // sẽ được định nghĩa trong file models/index.js
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Mối quan hệ (FOREIGN KEY) với Product
            // sẽ được định nghĩa trong file models/index.js
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        // Tùy chọn cho model
        tableName: 'OrderItem', // Bắt buộc tên bảng phải khớp với SQL
        timestamps: false,      // SQL của bạn không có createdAt/updatedAt
    }
);

export default OrderItem;