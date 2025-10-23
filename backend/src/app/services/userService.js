import sequelize from '../../configs/mysql.js';
// import { User, Wallet } from '../../models/index.js' // Import models & sequelize instance
import User from '../../models/userModel.js';
import bcrypt from 'bcrypt';

// --- CREATE ---

// /**
//  * Tạo user mới và ví liên kết (trong transaction).
//  * Ném lỗi Sequelize nếu thất bại (ví dụ: unique constraint).
//  * @param {object} userData - { userName, email, password }
//  * @returns {Promise<User>} Đối tượng Sequelize User mới (bao gồm passwordHash).
//  */
export async function createUser({userName, email, password}) {
    // const { userName, email, password } = userData;
    // const t = await sequelize.transaction();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        userName: userName,
        email: email,
        passwordHash: passwordHash,
    })
    // , { transaction: t });

    // await Wallet.create({
    //     userId: newUser.id,
    //     walletAddress: `temp_wallet_${newUser.id}` // Địa chỉ ví tạm
    // }, { transaction: t });

    // await t.commit();
    return newUser; // Trả về đối tượng User đầy đủ
}

// // --- READ ---

// /**
//  * Tìm user bằng email.
//  * Trả về null nếu không tìm thấy.
//  * @param {string} email
//  * @returns {Promise<User|null>} Đối tượng Sequelize User (bao gồm passwordHash) hoặc null.
//  */
export async function findUserByEmail(email) {
    return await User.findOne({
        where: { email: email }
    });
}

// /**
//  * Tìm user bằng ID (khóa chính).
//  * Trả về null nếu không tìm thấy.
//  * @param {number} id
//  * @returns {Promise<User|null>} Đối tượng Sequelize User (không có passwordHash) hoặc null.
//  */
// export async function findUserById(id) {
//     return await User.findByPk(id, {
//         attributes: { exclude: ['passwordHash'] } // Loại bỏ passwordHash
//     });
// }

// /**
//  * Lấy tất cả user (có thể thêm phân trang, lọc sau).
//  * @returns {Promise<User[]>} Mảng các đối tượng User (không có passwordHash).
//  */
// export async function findAllUsers() {
//     return await User.findAll({
//         attributes: { exclude: ['passwordHash'] }
//     });
// }


// // --- UPDATE ---

// /**
//  * Cập nhật thông tin profile cơ bản của user (userName, bio, profilePicture).
//  * @param {number} userId - ID của user cần cập nhật.
//  * @param {object} updateData - Object chứa các trường cần cập nhật (chỉ userName, bio, profilePicture).
//  * @returns {Promise<number>} Số lượng hàng đã được cập nhật (thường là 1 hoặc 0).
//  */
// export async function updateUserProfile(userId, updateData) {
//     // Chỉ lấy các trường được phép cập nhật từ updateData
//     const allowedUpdates = {};
//     if (updateData.userName !== undefined) allowedUpdates.userName = updateData.userName;
//     if (updateData.bio !== undefined) allowedUpdates.bio = updateData.bio;
//     if (updateData.profilePicture !== undefined) allowedUpdates.profilePicture = updateData.profilePicture;

//     // Nếu không có trường nào hợp lệ để cập nhật, trả về 0
//     if (Object.keys(allowedUpdates).length === 0) {
//         return 0;
//     }

//     const [affectedRows] = await User.update(allowedUpdates, {
//         where: { id: userId }
//     });
//     return affectedRows; // Trả về số dòng bị ảnh hưởng
// }

// /**
//  * Cập nhật mật khẩu cho user (chỉ nên dùng cho admin hoặc sau khi đã xác thực kỹ).
//  * @param {number} userId
//  * @param {string} newPassword - Mật khẩu mới (chưa hash).
//  * @returns {Promise<number>} Số lượng hàng đã được cập nhật.
//  */
// export async function updateUserPassword(userId, newPassword) {
//     const salt = await bcrypt.genSalt(10);
//     const newPasswordHash = await bcrypt.hash(newPassword, salt);

//     const [affectedRows] = await User.update(
//         { passwordHash: newPasswordHash },
//         { where: { id: userId } }
//     );
//     return affectedRows;
// }

// /**
//  * Cập nhật điểm uy tín (có thể cộng hoặc trừ).
//  * @param {number} userId
//  * @param {number} amount - Số điểm thay đổi (có thể âm).
//  * @returns {Promise<number>} Số lượng hàng đã được cập nhật.
//  */
// export async function updateReputationScore(userId, amount) {
//     const [affectedRows] = await User.increment(
//         { reputationScore: amount }, // Tăng hoặc giảm điểm
//         { where: { id: userId } }
//     );
//     return affectedRows;
// }

// /**
//  * Cập nhật Green Credit (có thể cộng hoặc trừ).
//  * @param {number} userId
//  * @param {number} amount - Số credit thay đổi (có thể âm).
//  * @returns {Promise<number>} Số lượng hàng đã được cập nhật.
//  */
// export async function updateGreenCredit(userId, amount) {
//     const [affectedRows] = await User.increment(
//         { greenCredit: amount }, // Tăng hoặc giảm credit
//         { where: { id: userId } }
//     );
//     return affectedRows;
// }

// /**
//  * Cập nhật trạng thái Green Seller.
//  * @param {number} userId
//  * @param {boolean} isGreen - Trạng thái mới (true/false).
//  * @returns {Promise<number>} Số lượng hàng đã được cập nhật.
//  */
// export async function updateGreenSellerStatus(userId, isGreen) {
//     const [affectedRows] = await User.update(
//         { isGreenSeller: isGreen },
//         { where: { id: userId } }
//     );
//     return affectedRows;
// }


// // --- DELETE ---

// /**
//  * Xóa một user khỏi database.
//  * @param {number} userId
//  * @returns {Promise<number>} Số lượng hàng đã bị xóa (thường là 1 hoặc 0).
//  */
// export async function deleteUser(userId) {
//     const affectedRows = await User.destroy({
//         where: { id: userId }
//     });
//     return affectedRows; // Trả về số dòng bị ảnh hưởng
// }