import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Import the Redis blocklist check function and User model
import { isTokenBlocked } from '../../services/authService.js'; // Check Redis
import { User } from '../../../models/index.js'; // Use Sequelize User model
import ApiError from '../../../utils/classes/api-error.js';

dotenv.config();

/**
 * Middleware to verify JWT token and attach user to request object.
 */
async function requireAuthentication(req, res, next) {
    try {
        // 1. Check for Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // Check both existence and 'Bearer ' prefix
            return next(ApiError.unauthorized('Thiếu token xác thực hoặc định dạng không đúng (Bearer token).'));
        }

        // 2. Extract token
        const token = authHeader.split(' ')[1];
        if (!token) {
            // This case might be redundant due to the first check, but good for clarity
            return next(ApiError.unauthorized('Token không hợp lệ hoặc bị thiếu.'));
        }

        // 3. Check Redis blocklist (Logout check)
        const blocked = await isTokenBlocked(token);
        if (blocked) {
            return next(ApiError.unauthorized('Token đã bị vô hiệu hoá (đã đăng xuất).'));
        }

        // 4. Verify JWT token (Signature and Expiry)
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            console.error('Lỗi cấu hình: JWT_SECRET_KEY chưa được đặt!');
            return next(ApiError.internal('Lỗi cấu hình server.')); // Use 500 for config errors
        }

        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
        } catch (jwtError) {
            // Handle specific JWT errors
            if (jwtError.name === 'TokenExpiredError') {
                return next(ApiError.unauthorized('Token đã hết hạn. Vui lòng đăng nhập lại.'));
            }
            if (jwtError.name === 'JsonWebTokenError') {
                return next(ApiError.unauthorized('Token không hợp lệ.'));
            }
            // For other unexpected verification errors
            throw jwtError; // Rethrow to be caught by the outer catch block
        }


        // 5. Find user in database using Sequelize
        // We trust the decoded.id because the token signature was verified
        const user = await User.findByPk(decoded.id, {
            // Optionally exclude password hash even here for extra safety
            attributes: { exclude: ['passwordHash'] }
        });

        // 6. Check if user exists
        if (!user) {
            return next(ApiError.unauthorized('Người dùng tương ứng với token không tồn tại.'));
        }

        // 7. Attach user object to request and proceed
        req.user = user.toJSON(); // Attach plain user object, not Sequelize instance
        return next();

    } catch (error) {
        // Catch any unexpected errors during the process
        // Log the error for debugging, but send a generic message
        console.error("Authentication Middleware Error:", error);
        // Avoid sending specific JWT internal errors to the client
        if (error instanceof ApiError) {
            return next(error); // Forward known ApiErrors
        }
        // For unexpected errors, return a generic unauthorized or internal error
        return next(ApiError.unauthorized('Lỗi xác thực không xác định.'));
    }
}

export default requireAuthentication;