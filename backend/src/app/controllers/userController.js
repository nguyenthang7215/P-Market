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

export async function findUserByEmail(req, res) {
    const user = await userService.findUserByEmail(req.params.email);

    res.json({
        success: true,
        message: 'Người dùng tồn tại'
    });
}

export async function findUserByUserName(req, res) {
    const user = await userService.findUserByUserName(req.params.userName);

    res.json({
        success: true,
        message: 'Người dùng tồn tại'
    })
}

export async function resetPassword(req, res) {
    await userService.resetPassword(req.params.id, req.body.password);

    res.json({
        success: true,
        message: 'Thay đổi mật khẩu thành công!'
    });
}

export async function updateUserName(req, res) {
    await userService.updateUserName(req.params.id, req.body.userName);

    res.json({
        success: true,
        message: 'Cập nhật UserName thành công!'
    })
}

export async function updatePhone(req, res) {
    await userService.updatePhone(req.params.id, req.body.phone);

    res.json({
        success: true,
        message: 'Cập nhật số điện thoại thành công!'
    });
}

export async function updateAddress(req, res) {
    await userService.updateAddress(req.params.id, req.body.address);

    res.json({
        success: true,
        message: 'Cập nhật địa chỉ thành công!'
    })
}

export async function uploadAvatar(req, res) {
    const id = req.params.id;
    const imagePath = `public/uploads/${req.file.filename}`;
    await userService.uploadAvatar(id, imagePath);

    res.json({
        success: true,
        message: 'Cập nhật ảnh thành công!'
    })
}