import './globals.css';
import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'Đăng nhập P-Market',
  description: 'Sàn trao đổi sinh viên PTIT',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          {/* Ảnh trang trí - Đặt file 'plant.png' vào /public */}
          <Image 
            src="/themelayout.png" 
            alt="decoration" 
            width={200}
            height={300}
            className="absolute bottom-0 left-10 z-0 opacity-50 hidden md:block"
          />
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}