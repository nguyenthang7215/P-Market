import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const Category = sequelize.define(
    'Category', // Tên của model
    {
        // Định nghĩa các cột
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        // SQL của bạn không có createdAt/updatedAt
        // nên chúng ta sẽ tắt timestamps
    },
    {
        // Tùy chọn cho model
        tableName: 'Category', // Bắt buộc tên bảng phải khớp với SQL
        timestamps: false,     // Tắt tự động quản lý createdAt, updatedAt
    }
);

export default Category;