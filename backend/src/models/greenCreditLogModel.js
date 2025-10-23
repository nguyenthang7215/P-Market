import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const GreenCreditLog = sequelize.define(
    'GreenCreditLog', // Tên của model
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
            // Mối quan hệ FOREIGN KEY (userId -> User)
            // sẽ được định nghĩa trong file models/index.js
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Mối quan hệ FOREIGN KEY (orderId -> OrderProduct)
            // sẽ được định nghĩa trong file models/index.js
        },
        actionType: {
            type: DataTypes.ENUM(
                'SoldUsed',
                'BoughtUsed',
                'FreeGift',
                'UsedBoost',
                'AdminAdjustment'
            ),
            allowNull: false,
        },
        creditAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // 'timeStamp' sẽ được Sequelize quản lý
    },
    {
        // Tùy chọn cho model
        tableName: 'GreenCreditLog', // Bắt buộc tên bảng phải khớp với SQL
        
        // Yêu cầu Sequelize quản lý timestamps
        timestamps: true,
        
        // Ánh xạ cột 'timeStamp' trong SQL thành 'createdAt' của Sequelize
        createdAt: 'timeStamp',
        
        // Tắt cột 'updatedAt' vì SQL của bạn không có
        updatedAt: false,
    }
);

export default GreenCreditLog;