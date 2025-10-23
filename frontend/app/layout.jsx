import './globals.css';
import React from 'react';
// 1. Sửa lại tên file thành 'AuthContext'
import { AuthProvider } from '../context/AuthContext'; 

export const metadata = {
  title: 'P-Market',
  description: 'Sàn trao đổi sinh viên PTIT',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        {/* 2. Bọc toàn bộ ứng dụng bằng AuthProvider */}
        <AuthProvider>
          {/* --- THÊM PHẦN NÀY ĐỂ CĂN GIỮA --- */}
          {/* div này sẽ tạo nền xám và căn giữa nội dung theo chiều dọc và ngang */}
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {children} {/* 'children' ở đây chính là trang đăng nhập của bạn */}
          </div>
          {/* --- HẾT PHẦN THÊM --- */}
        </AuthProvider>
      </body>
    </html>
  );
}