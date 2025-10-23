import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const Cart = sequelize.define(
    'Cart', // Tên của model
    {
        // Định nghĩa các cột
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        buyerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Mối quan hệ (FOREIGN KEY) với User
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
            defaultValue: 1,
        },
    },
    {
        // Tùy chọn cho model
        tableName: 'Cart',     // Bắt buộc tên bảng phải khớp với SQL
        timestamps: false,     // SQL của bạn không có createdAt/updatedAt

        // Định nghĩa UNIQUE KEY kết hợp
        // Tương đương: UNIQUE KEY unique_cart_item (buyerId, productId)
        indexes: [
            {
                unique: true,
                fields: ['buyerId', 'productId'],
                name: 'unique_cart_item', // Đặt tên cho khóa (giống trong SQL)
            },
        ],
    }
);

export default Cart;