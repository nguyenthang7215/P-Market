import ApiError from '../utils/classes/api-error.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

/**
 * Centralized error handling middleware for Express.
 * Catches errors passed via next(error) and sends appropriate JSON responses.
 */
function errorHandler(err, req, res, next) {
    // Determine the status code
    // If it's an ApiError we trust, use its statusCode. Otherwise, default to 500.
    let statusCode = err instanceof ApiError ? err.statusCode : 500;

    // Determine the message
    // Use the error's message if it's an operational ApiError or if in development.
    // Otherwise, use a generic message for 500 errors in production.
    let message = (err instanceof ApiError && err.isOperational) || process.env.NODE_ENV === 'development'
        ? err.message
        : 'Internal Server Error';

    // --- Logging ---
    // Log all errors in development for debugging
    if (process.env.NODE_ENV === 'development') {
        console.error('💥 ERROR:', err);
    } else {
        // In production, only log non-operational errors (unexpected ones)
        if (!(err instanceof ApiError && err.isOperational)) {
            console.error('💥 UNEXPECTED ERROR:', err);
            // You might want to send more detailed logs to a dedicated logging service here
        }
    }

    // --- Send Response ---
    res.status(statusCode).json({
        success: false,
        message: message,
        // Optionally include stack trace only in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

export default errorHandler;