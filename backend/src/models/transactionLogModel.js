import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const TransactionLog = sequelize.define(
    'TransactionLog', // Tên của model
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
        type: {
            type: DataTypes.ENUM(
                'Purchase',
                'Fee',
                'Release',
                'Deposit',
                'Withdrawal'
            ),
            allowNull: false,
        },
        amountStablecoin: {
            type: DataTypes.DECIMAL(18, 6),
            allowNull: false,
        },
        txHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        // 'timeStamp' sẽ được Sequelize quản lý
    },
    {
        // Tùy chọn cho model
        tableName: 'TransactionLog', // Bắt buộc tên bảng phải khớp với SQL

        // Yêu cầu Sequelize quản lý timestamps
        timestamps: true,

        // Ánh xạ cột 'timeStamp' trong SQL thành 'createdAt' của Sequelize
        createdAt: 'timeStamp',

        // Tắt cột 'updatedAt' vì SQL của bạn không có
        updatedAt: false,
    }
);

export default TransactionLog;