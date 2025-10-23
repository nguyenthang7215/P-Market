import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import moment from 'moment';
import Redis from 'ioredis'; // Sử dụng Redis
import * as userService from './userService' // Service để tương tác với DB User

dotenv.config();

// // --- Cấu hình Redis Client ---
// const redisClient = new Redis(process.env.REDIS_URL, {
//     lazyConnect: true, // Kết nối khi cần
//     maxRetriesPerRequest: 1,
// });
// redisClient.on('error', (err) => console.error('Lỗi Redis Client:', err));
// redisClient.on('connect', () => console.log('🔌 Đã kết nối Redis cho blocklist token.'));
// const BLOCKLIST_PREFIX = 'blocklist:'; // Tiền tố cho key Redis

// // --- Các hàm Service ---

// /**
//  * Kiểm tra thông tin đăng nhập (email, password).
//  * @param {string} email
//  * @param {string} password Mật khẩu thô từ người dùng.
//  * @returns {Promise<User|false>} Trả về đối tượng User Sequelize nếu hợp lệ, ngược lại trả về false.
//  */
export async function checkValidLogin(email, password) {
    // Gọi userService để tìm user (bao gồm cả passwordHash)
    const user = await userService.findUserByEmail(email);

    if (user) {
        // So sánh mật khẩu thô với hash đã lưu
        const verified = await bcrypt.compare(password, user.passwordHash);
        if (verified) {
            return user; // Trả về đối tượng User nếu khớp
        }
    }
    // Trả về false nếu không tìm thấy user hoặc mật khẩu sai
    return false;
}

// /**
//  * Tạo token JWT cho người dùng.
//  * @param {object} user Đối tượng User Sequelize (hoặc object từ .toJSON()).
//  * @returns {{access_token: string, expire_in: number, auth_type: string}} Chi tiết token.
//  */
// export function generateAuthToken(user) {
//     const payload = { id: user.id, email: user.email }; // Payload chứa thông tin định danh
//     const secretKey = process.env.JWT_SECRET_KEY;
//     const expiresIn = process.env.JWT_EXPIRES_IN || '1h'; // Lấy thời hạn từ .env hoặc mặc định 1h

//     if (!secretKey) {
//         console.error('LỖI NGHIÊM TRỌNG: JWT_SECRET_KEY chưa được định nghĩa trong .env');
//         // Ném lỗi để dừng, vì không có key thì không thể tạo token an toàn
//         throw new Error('Lỗi cấu hình server.');
//     }

//     const accessToken = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
//     const decode = jwt.decode(accessToken);
//     const expireIn = decode.exp - decode.iat; // Thời gian còn lại (giây)

//     return {
//         access_token: accessToken,
//         expire_in: expireIn > 0 ? expireIn : 0, // Đảm bảo không âm
//         auth_type: 'Bearer Token',
//     };
// }

// /**
//  * Đăng ký người dùng mới (ủy quyền cho userService).
//  * @param {object} userData Dữ liệu người dùng { userName, email, password }.
//  * @returns {Promise<User>} Đối tượng User Sequelize mới (đã loại bỏ passwordHash).
//  */
export async function register({userName, email, password}) {
    // Chỉ cần gọi userService, nó sẽ xử lý tạo User và Wallet
    const newUser = await userService.createUser({userName, email, password});
    // userService đã trả về user không có passwordHash
    return newUser;
}

// /**
//  * Chặn token JWT bằng cách thêm vào Redis với thời gian hết hạn còn lại.
//  * @param {string} token Token JWT cần chặn.
//  * @returns {Promise<void>}
//  */
// export async function blockToken(token) {
//     try {
//         const decoded = jwt.decode(token);
//         if (!decoded || !decoded.exp) {
//             return; // Bỏ qua nếu token không hợp lệ
//         }

//         const expiresInTimestamp = decoded.exp; // Thời điểm hết hạn (Unix timestamp)
//         const now = moment().unix(); // Thời điểm hiện tại
//         const remainingSeconds = expiresInTimestamp - now; // Số giây còn lại

//         // Chỉ thêm vào Redis nếu token chưa hết hạn
//         if (remainingSeconds > 0) {
//             // Dùng SETEX: SET key value EX seconds
//             await redisClient.setex(`${BLOCKLIST_PREFIX}${token}`, remainingSeconds, 'blocked');
//             console.log(`Token đã bị chặn trong Redis trong ${remainingSeconds} giây.`);
//         }
//     } catch (err) {
//         console.error('Lỗi khi chặn token:', err.message);
//     }
// }

// /**
//  * Kiểm tra xem token có trong Redis blocklist hay không.
//  * @param {string} token Token JWT cần kiểm tra.
//  * @returns {Promise<boolean>} True nếu token bị chặn, False nếu không hoặc có lỗi Redis.
//  */
// export async function isTokenBlocked(token) {
//     try {
//         // Dùng EXISTS để kiểm tra key có tồn tại không
//         const result = await redisClient.exists(`${BLOCKLIST_PREFIX}${token}`);
//         return result === 1; // EXISTS trả về 1 nếu có, 0 nếu không
//     } catch (err) {
//         console.error('Lỗi Redis khi kiểm tra blocklist:', err.message);
//         return false; // An toàn: coi như không bị chặn nếu có lỗi Redis
//     }
// }