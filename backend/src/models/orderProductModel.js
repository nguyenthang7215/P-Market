import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const OrderProduct = sequelize.define(
    'OrderProduct', // Tên của model
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
            // Mối quan hệ FOREIGN KEY (buyerId -> User)
            // sẽ được định nghĩa trong file models/index.js
        },
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Mối quan hệ FOREIGN KEY (sellerId -> User)
            // sẽ được định nghĩa trong file models/index.js
        },
        smartContractAddress: {
            type: DataTypes.STRING(255),
        },
        finalPriceStablecoin: {
            type: DataTypes.DECIMAL(18, 6),
            allowNull: false,
        },
        orderStatus: {
            type: DataTypes.ENUM(
                'PendingDeposit',
                'Deposited',
                'Delivered',
                'Completed',
                'Cancelled',
                'Disputed'
            ),
            allowNull: false,
            defaultValue: 'PendingDeposit',
        },
        escrowStatus: {
            type: DataTypes.ENUM(
                'Deposited',
                'Released',
                'DisputedHold',
                'Cancelled'
            ),
            allowNull: false,
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
        // 'timeStamp' sẽ được Sequelize quản lý
    },
    {
        // Tùy chọn cho model
        tableName: 'OrderProduct', // Bắt buộc tên bảng phải khớp với SQL
        
        // Yêu cầu Sequelize quản lý timestamps
        timestamps: true,
        
        // Ánh xạ cột 'timeStamp' trong SQL thành 'createdAt' của Sequelize
        createdAt: 'timeStamp',
        
        // Tắt cột 'updatedAt' vì SQL của bạn không có
        updatedAt: false,
    }
);

export default OrderProduct;