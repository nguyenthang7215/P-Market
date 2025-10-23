/**
 * Lớp lỗi tùy chỉnh để biểu diễn các lỗi hoạt động (operational errors) trong API.
 * Các lỗi này được dự đoán trước và có thể xử lý một cách tường minh.
 * Nó kế thừa từ lớp Error chuẩn của JavaScript và thêm vào mã trạng thái HTTP (statusCode)
 * và một cờ (isOperational) để phân biệt với các lỗi hệ thống không mong muốn.
 */
class ApiError extends Error {
    /**
     * @param {number} statusCode Mã trạng thái HTTP (ví dụ: 400, 404, 500).
     * @param {string} message Mô tả lỗi thân thiện cho client hoặc để ghi log.
     * @param {boolean} isOperational Cờ đánh dấu đây là lỗi dự đoán được (mặc định là true).
     * @param {string} stack Ngăn xếp lỗi (tùy chọn).
     */
    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message); // Gọi constructor của lớp Error cha
        this.statusCode = statusCode;
        this.isOperational = isOperational; // Đánh dấu lỗi này là lỗi dự kiến

        // Ghi lại ngăn xếp lỗi (stack trace) để dễ dàng debug,
        // nhưng chỉ khi stack được cung cấp hoặc tự động tạo
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // --- Các phương thức static factory để tạo lỗi nhanh chóng ---

    /**
     * Lỗi 400 Bad Request: Dữ liệu gửi lên từ client không hợp lệ về mặt cú pháp
     * (thường do validation thất bại).
     * @param {string} msg Thông báo lỗi cụ thể (mặc định là 'Bad Request').
     */
    static badRequest(msg = 'Bad Request') {
        return new ApiError(400, msg);
    }

    /**
     * Lỗi 401 Unauthorized: Yêu cầu thiếu thông tin xác thực hợp lệ.
     * Client cần đăng nhập hoặc cung cấp token hợp lệ.
     * @param {string} msg Thông báo lỗi (mặc định là 'Unauthorized').
     */
    static unauthorized(msg = 'Unauthorized') {
        return new ApiError(401, msg);
    }

    /**
     * Lỗi 403 Forbidden: Client đã được xác thực nhưng không có quyền truy cập tài nguyên này.
     * Ví dụ: User thường cố gắng truy cập trang quản trị.
     * @param {string} msg Thông báo lỗi (mặc định là 'Forbidden').
     */
    static forbidden(msg = 'Forbidden') {
        return new ApiError(403, msg);
    }

    /**
     * Lỗi 404 Not Found: Tài nguyên được yêu cầu không tồn tại trên server.
     * @param {string} msg Thông báo lỗi (mặc định là 'Not Found').
     */
    static notFound(msg = 'Not Found') {
        return new ApiError(404, msg);
    }

    /**
     * Lỗi 409 Conflict: Yêu cầu không thể hoàn thành do xung đột với trạng thái hiện tại
     * của tài nguyên. Thường dùng khi cố gắng tạo một tài nguyên đã tồn tại (ví dụ: email đã đăng ký).
     * @param {string} msg Thông báo lỗi (mặc định là 'Conflict').
     */
    static conflict(msg = 'Conflict') {
        return new ApiError(409, msg);
    }

    /**
     * Lỗi 422 Unprocessable Entity: Server hiểu yêu cầu nhưng không thể xử lý do lỗi ngữ nghĩa
     * trong nội dung yêu cầu (ví dụ: dữ liệu hợp lệ về cú pháp nhưng vi phạm logic nghiệp vụ).
     * @param {string} msg Thông báo lỗi (mặc định là 'Unprocessable Entity').
     */
    static unprocessableEntity(msg = 'Unprocessable Entity') {
        return new ApiError(422, msg);
    }

    /**
     * Lỗi 500 Internal Server Error: Lỗi chung cho các sự cố không mong muốn xảy ra trên server.
     * Nên dùng thận trọng, thường là để gói các lỗi không lường trước được.
     * @param {string} msg Thông báo lỗi (mặc định là 'Internal Server Error').
     * @param {boolean} isOperational Đặt là `false` nếu đây là lỗi không dự kiến.
     */
    static internal(msg = 'Internal Server Error', isOperational = false) {
        // Lỗi 500 thường không phải lỗi 'operational' trừ khi bạn cố ý tạo ra nó
        return new ApiError(500, msg, isOperational);
    }

    /**
    * Lỗi 503 Service Unavailable: Server hiện không sẵn sàng xử lý yêu cầu
    * (ví dụ: quá tải hoặc đang bảo trì, database không kết nối được).
    * @param {string} msg Thông báo lỗi (mặc định là 'Service Unavailable').
    */
    static serviceUnavailable(msg = 'Service Unavailable') {
        return new ApiError(503, msg);
    }
}

export default ApiError;