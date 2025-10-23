import ApiError from '../../utils/classes/api-error.js';
import validator from 'validator'; // For format validation
import { User } from '../../models/index.js'; // Sequelize User model

/**
 * Middleware: Checks if req.params.id is a valid integer format
 * AND if a User with that ID exists.
 * If found, attaches the user object (excluding password) to req.user.
 */
export async function checkUserIdExists(req, res, next) {
    const { id } = req.params;

    // 1. Check ID format: Must be a positive integer string.
    if (!id || !validator.isInt(id, { min: 1 })) {
        return next(ApiError.badRequest('ID người dùng không hợp lệ.'));
    }

    try {
        // 2. Check existence in the database.
        const user = await User.findByPk(id, {
            attributes: { exclude: ['passwordHash'] } // Exclude sensitive info
        });

        // 3. Handle result.
        if (user) {
            req.user = user.toJSON(); // Attach plain user object.
            return next(); // User found, proceed.
        } else {
            return next(ApiError.notFound('Không tìm thấy người dùng.')); // User not found.
        }
    } catch (error) {
        // Handle unexpected database errors.
        console.error("Error in checkUserIdExists:", error); // Log the actual error for debugging
        return next(ApiError.internal('Lỗi khi kiểm tra người dùng.')); // Send a generic internal error
    }
}


/**
 * Middleware: Checks if req.params.email is a valid email format
 * AND if a User with that email exists.
 * If found, attaches the user object (excluding password) to req.user.
 */
export async function checkUserEmailExists(req, res, next) {
    const { email } = req.params;

    // 1. Check email format (convert to lowercase for consistency).
    const lowerEmail = email ? email.toLowerCase() : ''; // Handle potential undefined email
    if (!validator.isEmail(lowerEmail)) {
        return next(ApiError.badRequest('Định dạng email không hợp lệ.'));
    }

    try {
        // 2. Check existence using the lowercased email.
        const user = await User.findOne({
            where: { email: lowerEmail }, // Query with lowercase email
            attributes: { exclude: ['passwordHash'] } // Exclude sensitive info
        });

        // 3. Handle result.
        if (user) {
            req.user = user.toJSON(); // Attach plain user object.
            return next(); // User found, proceed.
        } else {
            return next(ApiError.notFound('Không tìm thấy người dùng với email này.')); // User not found.
        }
    } catch (error) {
        // Handle unexpected database errors.
        console.error("Error in checkUserEmailExists:", error); // Log the actual error
        return next(ApiError.internal('Lỗi khi kiểm tra email người dùng.')); // Send generic internal error
    }
}