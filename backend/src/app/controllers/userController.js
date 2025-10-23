import * as userService from '../services/userService.js';

// // File: src/app/controllers/userController.js

// // ... (Các hàm khác như handleCreateUser, handleFindUserById...)

// /**
//  * Controller để lấy thông tin profile của chính user đang đăng nhập.
//  */
// export async function handleGetMyProfile(req, res, next) {
//     try {
//         // Middleware 'requireAuthentication' đã xác thực và gắn user vào req.user
//         // req.user chứa thông tin cơ bản, nhưng chúng ta nên lấy lại thông tin mới nhất từ DB
//         const userId = req.user.id;
//         const userProfile = await userService.findUserById(userId);

//         if (!userProfile) {
//             // Trường hợp hiếm gặp: user trong token tồn tại nhưng đã bị xóa khỏi DB
//             throw ApiError.notFound('Không tìm thấy thông tin người dùng.');
//         }

//         res.status(200).json({
//             success: true,
//             user: userProfile,
//         });
//     } catch (error) {
//         next(error);
//     }
// }

/**
 * Xử lý tạo user mới.
 */
export async function handleCreateUser(req, res, next) {
    // Giả sử req.body đã hợp lệ (do Joi validate)
    const newUser = await userService.createUser(req.body);

    // // Loại bỏ passwordHash trước khi gửi về
    // const userResponse = newUser.toJSON();
    // delete userResponse.passwordHash;

    res.status(201).json({
        success: true,
        message: 'Tạo người dùng thành công!',
        user: newUser //userResponse,
    });
    // Lưu ý: Cần thêm try...catch để bắt lỗi (ví dụ: email/username trùng)
}

// /**
//  * Xử lý tìm user bằng ID.
//  */
// export async function handleFindUserById(req, res, next) {
//     const userId = req.params.id;
//     const user = await userService.findUserById(userId);

//     // Giả sử tìm thấy user
//     if (user) {
//         res.status(200).json({
//             success: true,
//             user: user, // passwordHash đã bị loại bỏ ở service
//         });
//     } else {
//         // Cần xử lý trường hợp không tìm thấy user (lỗi 404)
//         res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' }); // Tạm thời
//     }
//     // Lưu ý: Cần thêm try...catch và xử lý lỗi 404 chuẩn hơn
// }

// /**
//  * Xử lý tìm user bằng Email (Thường không dùng cho API public, có thể dùng nội bộ).
//  * Hàm này chỉ để ví dụ, bạn có thể không cần expose nó ra route.
//  */
// export async function handleFindUserByEmail(req, res, next) {
//     const email = req.params.email; // Giả sử email lấy từ params
//     const user = await userService.findUserByEmail(email); // Service trả về cả hash

//     if (user) {
//         // Cẩn thận: Không nên trả về password hash cho client
//         const userResponse = user.toJSON();
//         delete userResponse.passwordHash;
//         res.status(200).json({
//             success: true,
//             user: userResponse,
//         });
//     } else {
//         res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' }); // Tạm thời
//     }
//     // Lưu ý: Cần thêm try...catch và xử lý lỗi 404
// }


// /**
//  * Xử lý lấy tất cả user.
//  */
// export async function handleFindAllUsers(req, res, next) {
//     const users = await userService.findAllUsers();
//     res.status(200).json({
//         success: true,
//         users: users,
//     });
//     // Lưu ý: Cần thêm try...catch
// }

// /**
//  * Xử lý cập nhật profile user (userName, bio, profilePicture).
//  */
// export async function handleUpdateUserProfile(req, res, next) {
//     const userId = req.params.id;
//     const updateData = req.body; // Giả sử đã validate

//     const affectedRows = await userService.updateUserProfile(userId, updateData);

//     // Giả sử cập nhật thành công (affectedRows > 0)
//     if (affectedRows > 0) {
//         const updatedUser = await userService.findUserById(userId); // Lấy lại thông tin mới
//         res.status(200).json({
//             success: true,
//             message: 'Cập nhật thông tin thành công!',
//             user: updatedUser,
//         });
//     } else {
//         // Cần xử lý trường hợp không tìm thấy user (lỗi 404)
//         res.status(404).json({ success: false, message: 'Không tìm thấy người dùng để cập nhật.' }); // Tạm thời
//     }
//     // Lưu ý: Cần thêm try...catch và xử lý lỗi 404
// }

// /**
//  * Xử lý cập nhật mật khẩu user.
//  * (Cần có logic kiểm tra mật khẩu cũ hoặc quyền admin ở đây)
//  */
// export async function handleUpdateUserPassword(req, res, next) {
//     const userId = req.params.id; // Cần xác thực user này là ai
//     const { newPassword } = req.body; // Giả sử Joi đã validate

//     // !!! CẢNH BÁO: Thiếu kiểm tra quyền và mật khẩu cũ !!!
//     // Trong thực tế, bạn cần kiểm tra xem người dùng có quyền đổi mk này không

//     const affectedRows = await userService.updateUserPassword(userId, newPassword);

//     if (affectedRows > 0) {
//         res.status(200).json({
//             success: true,
//             message: 'Cập nhật mật khẩu thành công!',
//         });
//     } else {
//         res.status(404).json({ success: false, message: 'Không tìm thấy người dùng để cập nhật.' }); // Tạm thời
//     }
//     // Lưu ý: Cần thêm try...catch, logic xác thực, và xử lý lỗi 404
// }

// /**
//  * Xử lý cập nhật điểm uy tín.
//  * (Thường được gọi bởi hệ thống, không phải user trực tiếp)
//  */
// export async function handleUpdateReputationScore(req, res, next) {
//     const userId = req.params.id;
//     const { amount } = req.body; // Số điểm thay đổi

//     const affectedRows = await userService.updateReputationScore(userId, amount);

//     if (affectedRows > 0) {
//         res.status(200).json({ success: true, message: 'Cập nhật điểm uy tín thành công.' });
//     } else {
//         res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' }); // Tạm thời
//     }
//     // Lưu ý: Cần thêm try...catch và xử lý lỗi 404
// }

// /**
//  * Xử lý cập nhật Green Credit.
//  * (Thường được gọi bởi hệ thống)
//  */
// export async function handleUpdateGreenCredit(req, res, next) {
//     const userId = req.params.id;
//     const { amount } = req.body; // Số credit thay đổi

//     const affectedRows = await userService.updateGreenCredit(userId, amount);

//     if (affectedRows > 0) {
//         res.status(200).json({ success: true, message: 'Cập nhật Green Credit thành công.' });
//     } else {
//         res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' }); // Tạm thời
//     }
//     // Lưu ý: Cần thêm try...catch và xử lý lỗi 404
// }

// /**
//  * Xử lý cập nhật trạng thái Green Seller.
//  * (Thường được gọi bởi admin hoặc hệ thống)
//  */
// export async function handleUpdateGreenSellerStatus(req, res, next) {
//     const userId = req.params.id;
//     const { isGreen } = req.body; // Trạng thái mới (true/false)

//     const affectedRows = await userService.updateGreenSellerStatus(userId, isGreen);

//     if (affectedRows > 0) {
//         res.status(200).json({ success: true, message: 'Cập nhật trạng thái Green Seller thành công.' });
//     } else {
//         res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' }); // Tạm thời
//     }
//     // Lưu ý: Cần thêm try...catch và xử lý lỗi 404
// }


// /**
//  * Xử lý xóa user.
//  */
// export async function handleDeleteUser(req, res, next) {
//     const userId = req.params.id;
//     const affectedRows = await userService.deleteUser(userId);

//     if (affectedRows > 0) {
//         res.status(200).json({
//             success: true,
//             message: 'Xóa người dùng thành công!',
//         });
//     } else {
//         // Cần xử lý trường hợp không tìm thấy user (lỗi 404)
//         res.status(404).json({ success: false, message: 'Không tìm thấy người dùng để xóa.' }); // Tạm thời
//     }
//     // Lưu ý: Cần thêm try...catch và xử lý lỗi 404
// }