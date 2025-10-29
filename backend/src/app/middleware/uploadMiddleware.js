import multer from 'multer';
import path from 'path';
import ApiError from '../../utils/classes/api-error';
import fs from 'fs';

const uploadDir = 'src/public/uploads';

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

function fileFilter(req, file, cb) {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowed.includes(file.mimetype)) {
        return cb(ApiError.badRequest('Tên file không hợp lệ, chỉ nhận ảnh JPEG/PNG'));
    }
    cb(null, true);
}

export const upload = multer({ storage, fileFilter });
