import './globals.css';
import React from 'react';
import { AuthProvider } from '../context/AuthContext'; // Đảm bảo đường dẫn đúng
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'P-Market',
  description: 'Sàn trao đổi sinh viên PTIT',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex items-center justify-center bg-gray-100">
        <AuthProvider>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
