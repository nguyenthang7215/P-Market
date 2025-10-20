import React from 'react';
import Image from 'next/image';
// (Bạn có thể thêm các ảnh nền trang trí vào đây nếu muốn)
// import Image from 'next/image';

export default function AuthLayout({ children }) {
  return (
    // Tạo một nền xám nhạt cho toàn bộ trang
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      {
        <Image 
          src="/themelayout.png" 
          alt="decoration" 
          width={200} 
          height={300} 
          className="absolute bottom-0 left-10 z-0" 
        />
        }
      
      {/* 'children' ở đây chính là file page.jsx của login */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}