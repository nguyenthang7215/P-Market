import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const User = sequelize.define(
    'User', // Tên của model
    {
        // Định nghĩa các cột
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Tận dụng validation có sẵn
            },
        },
        passwordHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
        },
        profilePicture: {
            type: DataTypes.STRING(255),
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
        // 'createdAt' và 'updatedAt' sẽ được 'timestamps: true' tự động quản lý
    },
    {
        // Tùy chọn cho model
        tableName: 'User', // Bắt buộc tên bảng phải khớp với SQL
        timestamps: false,  // Tự động quản lý createdAt, updatedAt
    }
);

export default User;