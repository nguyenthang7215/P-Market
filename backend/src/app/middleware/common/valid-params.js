import validator from 'validator';
import ApiError from '../../../utils/classes/api-error.js';
import pool from '../../../configs/mysql.js';

export async function checkValidId(req, res, next) {
    const id = req.params.id;

    if (!validator.isInt(id, { min: 1 })) {
        return next(ApiError.badRequest('Id không hợp lệ'));
    }

    const [rows] = await pool.query(`
        select email
        from User
        where id = ?
        `, [id]);

    if (rows.length > 0) {
        next();
        return;
    }

    next(ApiError.notFound('Không tồn tại người dùng'));
}

export async function checkValidEmail(req, res, next) {
    const email = req.params.email;

    if (!validator.isEmail(email)) {
        return next(ApiError.badRequest('Email không hợp lệ'));
    }

    const [rows] = await pool.query(`
        select email
        from User
        where email = ?
        `, [email]);

    if (rows.length > 0) {
        next();
        return;
    }

    next(ApiError.notFound('Không tồn tại người dùng'))
}

export async function checkValidUserName(req, res, next) {
    const userName = req.params.userName;

    if (!validator.matches(userName, '/^[a-zA-Z0-9_]+$/')) {
        return next(ApiError.badRequest('UserName không hợp lệ'));
    }

    const [rows] = await pool.query(`
        select userName 
        from User
        where userName = ?
        `, [userName]);

    if (rows.length > 0) {
        next();
        return;
    }

    next(ApiError.notFound('UserName không tồn tại'));
} 