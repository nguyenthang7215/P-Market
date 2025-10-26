import * as userService from '../services/userService.js';

export async function createUser(req, res) {
    const newUser = await userService.createUser(req.body);

    res.status(201).json({
        success: true,
        message: 'Tạo người dùng thành công!',
        user: {
            fullName: newUser.lastName + " " + newUser.firstName,
            userName: newUser.userName,
        }
    });
}

export async function resetPassword(req, res) {
    await userService.resetPassword(req.params.id, req.body.password);

    res.json({
        success: true,
        message: 'Thay đổi mật khẩu thành công!'
    });
}

export async function updateProfile(req, res) {
    await userService.updateProfile(req.params.id, req.body);
    res.json({
        success: true,
        message: 'Cập nhật thông tin người dùng thành công!'
    });
}