import * as authService from '../services/authService.js';
// Import userService nếu cần (ví dụ: lấy profile)
// import * as userService from '../services/userService.js';

/**
 * Controller xử lý đăng ký.
 */
export async function handleRegister(req, res, next) {
    const newUser = await authService.register(req.body);
    //const tokenInfo = authService.generateAuthToken(newUser);
    res.status(201).json({
        success: true,
        message: 'Registration successful!',
        user: newUser, // Lưu ý: userService nên trả về user đã loại bỏ hash
        //token: tokenInfo,
    });
}

/**
 * Controller xử lý đăng nhập.
 */
export async function handleLogin(req, res, next) {
    const { email, password } = req.body;
    const user = await authService.checkValidLogin(email, password);
    // Giả sử user luôn hợp lệ ở đây (controller khác sẽ xử lý lỗi)

    //const tokenInfo = authService.generateAuthToken(user);
    // const userResponse = user.toJSON();
    // delete userResponse.passwordHash;

    res.status(200).json({
        success: true,
        message: 'Login successful!',
        user: user //userResponse,
       // token: tokenInfo,
    });
}

// /**
//  * Controller xử lý đăng xuất.
//  */
// export async function handleLogout(req, res, next) {
//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(' ')[1];
//     await authService.blockToken(token); // Gọi service để block token
//     res.status(200).json({
//         success: true,
//         message: 'Logout successful!',
//     });
// }

// /**
//  * Controller xử lý yêu cầu quên mật khẩu (gửi email).
//  * (Giả sử authService.generatePasswordResetToken tồn tại)
//  */
// export async function handleForgotPassword(req, res, next) {
//     const { email } = req.body; // Giả sử Joi đã validate email
//     // Gọi service để tạo token reset và gửi email (service sẽ xử lý logic)
//     await authService.generatePasswordResetToken(email);

//     // Luôn trả về thông báo thành công chung chung để bảo mật
//     res.status(200).json({
//         success: true,
//         message: 'If an account with that email exists, a password reset link has been sent.',
//     });
// }

// /**
//  * Controller xử lý việc đặt lại mật khẩu bằng token.
//  * (Giả sử authService.resetPasswordWithToken tồn tại)
//  */
// export async function handleResetPassword(req, res, next) {
//     const { token, newPassword } = req.body; // Giả sử Joi đã validate
//     // Gọi service để xác thực token và cập nhật mật khẩu
//     await authService.resetPasswordWithToken(token, newPassword);

//     res.status(200).json({
//         success: true,
//         message: 'Password has been reset successfully.',
//     });
// }

// /**
//  * Controller lấy thông tin profile của user đang đăng nhập.
//  * (Yêu cầu middleware requireAuthentication chạy trước)
//  */
// export async function handleGetMyProfile(req, res, next) {
//     // Middleware xác thực đã gắn user (chứa id) vào req.user
//     const userId = req.user.id;
//     // Gọi userService để lấy thông tin chi tiết (đã loại bỏ hash)
//     const userProfile = await userService.findUserById(userId);

//     // Giả sử user luôn được tìm thấy
//     res.status(200).json({
//         success: true,
//         user: userProfile,
//     });
// }