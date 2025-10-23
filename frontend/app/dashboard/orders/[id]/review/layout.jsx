import React from 'react';

// Metadata cho trang
export const metadata = { title: 'Viết đánh giá - P-Market' };

// Layout này chỉ render children, không import layout nào khác
export default function ReviewLayout({ children }) {
  return (
    <>
      {children} {/* Chỉ hiển thị nội dung của review/page.jsx */}
    </>
  );
}