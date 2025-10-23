import ApiError from '../utils/classes/api-error.js';
import dotenv from 'dotenv';

dotenv.config();

function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }

    res.status(500).json({
        success: false,
        message: err.message,
    });
}

export default errorHandler;