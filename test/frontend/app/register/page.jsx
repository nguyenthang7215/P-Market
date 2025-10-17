// Thư mục: frontend/app/register
// Tên file: page.jsx
'use client';
import { useState } from 'react';

// Ghi chú: Component <Link> của Next.js đã được thay thế bằng thẻ <a> tiêu chuẩn
// để tránh lỗi biên dịch trong môi trường hiện tại.

export default function RegisterPage() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Logic gọi API đăng ký sẽ ở đây
    console.log({ userName, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Tạo tài khoản</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label className="block mb-1 font-medium">Tên người dùng</label>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full p-3 border rounded-md" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-md" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Mật khẩu</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border rounded-md" required />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-300">
            Đăng Ký
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:underline">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
}
