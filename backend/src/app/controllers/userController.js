import * as userService from '../services/userService.js';

export async function createUser(req, res, next) {
    const newUser = await userService.createUser(req.body);

    res.status(201).json({
        success: true,
        message: 'Tạo người dùng thành công!',
        user: newUser.userName
    });
}