import * as authService from '../services/authService.js';

export async function register(req, res, next) {
    const newUser = await authService.register(req.body);

    const userResponse = newUser.toJson();
    delete userResponse.passwordHash;

    const tokenInfo = authService.authToken(newUser);

    res.status(201).json({
        success: true,
        message: 'Đăng ký người dùng thành công!',
        user: userResponse,
        token: tokenInfo,
    });
}

export async function login(req, res, next) {
    const { email, password } = req.body;
    const user = await authService.checkValidLogin(email, password);

    const userResponse = user.toJSON();
    delete userResponse.passwordHash;

    const tokenInfo = authService.authToken(newUser);

    res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công!',
        user: userResponse,
        token: tokenInfo,
    });
}