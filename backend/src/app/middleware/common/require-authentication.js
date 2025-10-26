import jwt from 'jsonwebtoken';
import ApiError from '../../../utils/classes/api-error';
import { tokenBlocklist } from '../../services/authService';
import pool from '../../../configs/mysql.js';
import dotenv from 'dotenv';

dotenv.config();

async function requireAuthentication(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(ApiError.unauthorized('Thiếu token xác thực'));
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return next(ApiError.unauthorized('Token không hợp lệ'));
        }

        if (tokenBlocklist.has(token)) {
            return next(ApiError.unauthorized('Token đã bị vô hiệu quá'));
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const [rows] = await pool.query(`
                select email 
                from User
                where id = ?
            `, [decoded.id]);

        if (rows.length > 0) {
            next();
            return;
        }

        next(ApiError.unauthorized('Không tồn tại người dùng'));
    } catch (error) {
        return next(ApiError.unauthorized('Token hết hạn hoặc không hợp lệ'));
    }
}

export default requireAuthentication;