import React from 'react';

// Metadata cho trang
export const metadata = { title: 'Chi tiết đơn hàng - P-Market' };

// Layout này chỉ render children, không import layout nào khác
export default function OrderDetailLayout({ children }) {
  return (
    <>
      {children}
    </>
  );
}