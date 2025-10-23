import * as authService from '../services/authService.js';

export async function register(req, res, next) {
    const newUser = await authService.register(req.body);

    const tokenInfo = authService.authToken(newUser);

    res.status(201).json({
        success: true,
        message: 'Đăng ký người dùng thành công!',
        user: newUser.userName,
        token: tokenInfo,
    });
}

export async function login(req, res, next) {
    const { email, password } = req.body;
    const validLogin = await authService.checkValidLogin(email, password);

    if (validLogin) {
        const tokenInfo = authService.authToken(validLogin);
        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công!',
            user: validLogin.userName,
            token: tokenInfo,
        });
    }
    else {
        res.status(400).json({ message: 'Email hoặc mật khẩu không đúng!' });
    }
}
