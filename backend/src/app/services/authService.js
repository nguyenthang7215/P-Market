import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import * as userService from './userService'

dotenv.config();

export async function checkValidLogin(email, password) {
    const user = await userService.findUserByEmail(email);

    if (user) {
        const verified = await bcrypt.compare(password, user.passwordHash);
        if (verified) {
            return user;
        }
    }
    return false;
}

export async function register({ userName, email, password }) {
    const newUser = await userService.createUser({ userName, email, password });
    return newUser;
}

export function authToken(user) {
    const payload = { id: user.id };
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.LOGIN_EXPIRE_DAY });
    const decode = jwt.decode(accessToken);
    const expireIn = decode.exp - decode.iat;
    return {
        access_token: accessToken,
        expire_in: expireIn,
        auth_type: 'Bearer token'
    };
}

// thieu block token 
