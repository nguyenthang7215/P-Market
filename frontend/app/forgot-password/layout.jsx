import React from 'react';

// Layout này sẽ được bọc bởi RootLayout (có AuthProvider và Toaster)
// Nó không cần layout riêng, nhưng chúng ta có thể tạo file này
// để sau này thêm metadata riêng.

export const metadata = {
  title: 'Quên mật khẩu - P-Market',
};

export default function ForgotPasswordLayout({ children }) {
  return (
    // Thêm div căn giữa giống như trang Login/Register
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      {children}
    </div>
  );
}