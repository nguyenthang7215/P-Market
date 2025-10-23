class ApiError extends Error {
    constructor(statusCode, message) {
        super(message); 
        this.statusCode = statusCode;
    }
    /**
     * Lỗi 400 Bad Request: Dữ liệu gửi lên từ client không hợp lệ về mặt cú pháp
     * (thường do validation thất bại).
     */
    static badRequest(msg = 'Bad Request') {
        return new ApiError(400, msg);
    }

    /**
     * Lỗi 401 Unauthorized: Yêu cầu thiếu thông tin xác thực hợp lệ.
     * Client cần đăng nhập hoặc cung cấp token hợp lệ.
     */
    static unauthorized(msg = 'Unauthorized') {
        return new ApiError(401, msg);
    }

    /**
     * Lỗi 403 Forbidden: Client đã được xác thực nhưng không có quyền truy cập tài nguyên này.
     * Ví dụ: User thường cố gắng truy cập trang quản trị.
     */
    static forbidden(msg = 'Forbidden') {
        return new ApiError(403, msg);
    }

    /**
     * Lỗi 404 Not Found: Tài nguyên được yêu cầu không tồn tại trên server.
     */
    static notFound(msg = 'Not Found') {
        return new ApiError(404, msg);
    }

    /**
     * Lỗi 409 Conflict: Yêu cầu không thể hoàn thành do xung đột với trạng thái hiện tại
     * của tài nguyên. Thường dùng khi cố gắng tạo một tài nguyên đã tồn tại (ví dụ: email đã đăng ký).
     */
    static conflict(msg = 'Conflict') {
        return new ApiError(409, msg);
    }

    /**
     * Lỗi 500 Internal Server Error: Lỗi chung cho các sự cố không mong muốn xảy ra trên server.
     * Nên dùng thận trọng, thường là để gói các lỗi không lường trước được.
     */
    static internal(msg = 'Internal Server Error') {
        // Lỗi 500 thường không phải lỗi 'operational' trừ khi bạn cố ý tạo ra nó
        return new ApiError(500, msg);
    }

    /**
    * Lỗi 503 Service Unavailable: Server hiện không sẵn sàng xử lý yêu cầu
    * (ví dụ: quá tải hoặc đang bảo trì, database không kết nối được).
    */
    static serviceUnavailable(msg = 'Service Unavailable') {
        return new ApiError(503, msg);
    }
}

export default ApiError;