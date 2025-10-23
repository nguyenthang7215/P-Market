import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const Wallet = sequelize.define(
    'Wallet', // Tên của model
    {
        // Định nghĩa các cột
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            // Mối quan hệ 1-1 (FOREIGN KEY) với User
            // sẽ được định nghĩa trong file models/index.js
            },
        walletAddress: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
    },
    {
        // Tùy chọn cho model
        tableName: 'Wallet', // Bắt buộc tên bảng phải khớp với SQL
        timestamps: false,   // SQL của bạn không có createdAt/updatedAt
    }
);

export default Wallet;