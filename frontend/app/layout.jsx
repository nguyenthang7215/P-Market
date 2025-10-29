import './globals.css';
import React from 'react';
import { AuthProvider } from '../context/AuthContext'; // Đảm bảo đường dẫn đúng
import { Toaster } from 'react-hot-toast'; // <-- 1. Import Toaster

export const metadata = {
  title: 'P-Market',
  description: 'Sàn trao đổi sinh viên PTIT',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider>
          {/* Layout này KHÔNG căn giữa */}
          {children}
          {/* 2. Thêm Toaster ở đây */}
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}