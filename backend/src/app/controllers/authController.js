import * as authService from '../services/authService.js';
import * as userService from '../services/userService.js';

export async function register(req, res) {
    const newUser = await authService.register(req.body);

    const tokenInfo = authService.authToken(newUser);

    res.status(201).json({
        success: true,
        message: 'Đăng ký người dùng thành công!',
        user: {
            fullName: newUser.lastName + " " + newUser.firstName,
            userName: newUser.userName
        },
        token: tokenInfo,
    });
}

export async function login(req, res) {
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
        res.status(400).json({
            success: false,
            message: 'Email hoặc mật khẩu không đúng!'
        });
    }
}

export async function logout(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    authService.blockToken(token);
    res.json({
        success: true,
        message: 'Thoát đăng nhập thành công!'
    });
}

export async function resetPassword(req, res) {
    const { id, password } = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    authService.blockToken(token);

    await userService.resetPassword(id, password);
    res.json({
        success: true,
        message: 'Thay đổi mật khẩu thành công!'
    });
}

