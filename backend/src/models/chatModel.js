import { DataTypes } from 'sequelize';
import sequelize from '../configs/mysql.js';

const Chat = sequelize.define(
    'Chat', // Tên của model
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
            // Mối quan hệ FOREIGN KEY (orderId -> OrderProduct)
            // sẽ được định nghĩa trong file models/index.js
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Mối quan hệ FOREIGN KEY (senderId -> User)
            // sẽ được định nghĩa trong file models/index.js
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Mối quan hệ FOREIGN KEY (receiverId -> User)
            // sẽ được định nghĩa trong file models/index.js
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // 'timeStamp' sẽ được Sequelize quản lý
    },
    {
        // Tùy chọn cho model
        tableName: 'Chat', // Bắt buộc tên bảng phải khớp với SQL

        // Yêu cầu Sequelize quản lý timestamps
        timestamps: true,

        // Ánh xạ cột 'timeStamp' trong SQL thành 'createdAt' của Sequelize
        createdAt: 'timeStamp',

        // Tắt cột 'updatedAt' vì SQL của bạn không có
        updatedAt: false,
    }
);

export default Chat;