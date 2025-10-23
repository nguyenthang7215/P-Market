import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false // Mac dinh se hien ra cau lenh sql khi truy van, logging:false de tat no di
    }
);

const checkConnection = async () => {
    try {
        await sequelize.authenticate(); // Gui 1 truy van thu (ping) den database
        await sequelize.sync({ alter: true });
        console.log('🎉 Kết nối ORM (Sequelize) thành công!');
    } catch (error) {
        console.error('Lỗi kết nối ORM (Sequelize):', error.message);
    }
};

checkConnection();

export default sequelize;