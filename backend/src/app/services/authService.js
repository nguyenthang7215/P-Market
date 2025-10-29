import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pool from '../../configs/mysql.js';
import moment from 'moment';
import NodeCache from 'node-cache';
import * as userService from './userService'

dotenv.config();

export const tokenBlocklist = new NodeCache();

export async function checkValidLogin(email, password) {
    const [rows] = await pool.query(`
        select * from User
        where email = ? 
        `, [email]);
    const user = rows[0];

    if (user) {
        const verified = await bcrypt.compare(password, user.passwordHash);
        if (verified) {
            return user;
        }
    }
    return false;
}

export async function register({ firstName, lastName, userName, email, password }) {
    const newUser = await userService.createUser({ firstName, lastName, userName, email, password });
    return newUser;
}

export function authToken(user) {
    const payload = { id: user.id };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.LOGIN_EXPIRE_IN });
    const decode = jwt.decode(accessToken);
    const expireIn = decode.exp - decode.iat;
    return {
        access_token: accessToken,
        expire_in: expireIn,
        auth_type: 'Bearer token'
    };
}

export function blockToken(token){
    const decode = jwt.decode(token);
    const now = moment().unix();
    const expireIn = decode.exp - now;
    tokenBlocklist.set(token, true, expireIn);
}
