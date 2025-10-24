import * as userService from '../services/userService.js';

export async function createUser(req, res) {
    const newUser = await userService.createUser(req.body);

    res.status(201).json({
        success: true,
        message: 'Tạo người dùng thành công!',
        user: newUser.userName
    });
}

export async function resetPassword(req, res) {
    const { id, password } = req.body;
    await userService.resetPassword(id, password);

    res.json({
        success: true,
        message: 'Thay đổi mật khẩu thành công!'
    });
}

export async function updateProfile(req, res) {
    await userService.updateProfile(req.params, req.body);
    res.json({
        success: true,
        message: 'Cập nhật thông tin người dùng thành công!'
    });
}