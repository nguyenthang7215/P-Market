import { Router } from 'express';

// // Import các thành phần cần thiết
import * as userController from '../app/controllers/userController.js';
// import * as userMiddleware from '../app/middleware/userMiddleware.js';
// import requireAuthentication from '../app/middleware/common/require-authentication.js';
// import { isAdmin } from '../app/middleware/authMiddleware.js';

const userRouter = Router();

// // =================================================================
// // ÁP DỤNG MIDDLEWARE XÁC THỰC CHO TẤT CẢ CÁC ROUTE BÊN DƯỚI
// userRouter.use(requireAuthentication);
// // =================================================================


// // --- CÁC ROUTE DÀNH CHO ADMIN ---

// // [ADMIN] Lấy danh sách tất cả người dùng
// userRouter.get(
//     '/',
//     isAdmin, // Chỉ Admin có quyền
//     userController.handleFindAllUsers
// );

// [ADMIN] Tạo một người dùng mới (Admin tạo cho người khác)
userRouter.post(
    '/',
    //isAdmin, // Chỉ Admin có quyền
    userController.handleCreateUser // Controller nhận trực tiếp req.body
);

// // [ADMIN] Cập nhật trạng thái Green Seller cho một user
// userRouter.patch(
//     '/:id/status/green-seller',
//     isAdmin,
//     userMiddleware.checkUserIdExists, // Đảm bảo user tồn tại
//     userController.handleUpdateGreenSellerStatus
// );


// // --- CÁC ROUTE DÀNH CHO NGƯỜI DÙNG ĐÃ ĐĂNG NHẬP ---

// // Lấy thông tin profile của chính mình
// userRouter.get(
//     '/me',
//     userController.handleGetMyProfile // Controller sẽ lấy id từ req.user
// );

// // Lấy thông tin của một người dùng bất kỳ bằng ID
// userRouter.get(
//     '/:id',
//     userMiddleware.checkUserIdExists, // Kiểm tra ID hợp lệ và user tồn tại
//     userController.handleFindUserById
// );

// // Cập nhật thông tin profile của chính mình (userName, bio, profilePicture)
// userRouter.put(
//     '/me',
//     userController.handleUpdateUserProfile // Controller sẽ lấy id từ req.user
// );

// // Cập nhật mật khẩu của chính mình
// userRouter.patch(
//     '/me/password',
//     userController.handleUpdateUserPassword // Controller sẽ lấy id từ req.user
// );

// // Xóa tài khoản của chính mình
// userRouter.delete(
//     '/me',
//     userController.handleDeleteUser // Controller sẽ lấy id từ req.user
// );

// export default userRouter;