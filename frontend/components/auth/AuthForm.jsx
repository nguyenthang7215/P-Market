// Đường dẫn: frontend/components/auth/AuthForm.jsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export default function AuthForm({ formType, onSubmit, isLoading }) {
  const [username, setUsername] = useState(''); // MSV (Login) hoặc Email (Register)
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');

  const isRegister = formType === 'register';
  // ... (code xác định title, buttonText... giữ nguyên) ...
  const title = isRegister ? 'Tạo tài khoản' : 'Đăng nhập';
  const submitButtonText = isRegister ? 'Đăng ký' : 'Đăng nhập';
  const switchFormLink = isRegister ? '/' : '/register';
  const switchFormText = isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay';
  const switchFormPrompt = isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?';


  // --- HÀM VALIDATE EMAIL ---
  const validatePtitEmail = (email) => {
    return email.endsWith('@stu.ptit.edu.vn') || email.endsWith('@ptit.edu.vn');
  };
  // ---

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra cơ bản
    if (!username || !password || (isRegister && !name)) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }

    // --- THÊM KIỂM TRA EMAIL KHI ĐĂNG KÝ ---
    if (isRegister && !validatePtitEmail(username)) {
      setError('Vui lòng sử dụng email PTIT (@stu.ptit.edu.vn hoặc @ptit.edu.vn).');
      return; // Dừng lại nếu email không hợp lệ
    }
    // --- HẾT PHẦN KIỂM TRA EMAIL ---

    const formData = { username, password };
    if (isRegister) {
      formData.name = name;
      formData.referralCode = referralCode;
      // Trong form đăng ký, 'username' chính là email
      formData.email = username; 
      // Bạn có thể thêm MSV vào đây nếu cần ô nhập riêng
    } else {
      // Trong form đăng nhập, 'username' là MSV
      formData.msv = username;
    }

    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="flex flex-col items-center justify-center text-center p-6">
        <Image src="/ptit-logo.png" alt="PTIT Logo" width={80} height={80} />
        <h2 className="text-2xl font-bold mt-4">{title}</h2>
        <p className="text-xl text-gray-700 font-semibold">
          PTIT-Marketplace
        </p>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-4">
          {isRegister && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
              <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" required />
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              {isRegister ? 'Email (PTIT)' : 'Tài khoản (Mã sinh viên)'}
            </label>
            <Input
              type={isRegister ? 'email' : 'text'} // <-- Đổi type thành 'email' khi đăng ký
              id="username"
              name="username"
              placeholder={isRegister ? "your.msv@stu.ptit.edu.vn" : "Nhập mã số sinh viên..."}
              className="mt-1"
              style={{ borderLeft: !isRegister ? '4px solid #CC0000' : '' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <div>
              <label htmlFor="referral" className="block text-sm font-medium text-gray-700">
                Mã giới thiệu (Nếu có)
              </label>
              <Input type="text" id="referral" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} className="mt-1" placeholder="Nhập mã của bạn bè" />
            </div>
          )}

          {!isRegister && (
             <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Ghi nhớ</label>
              </div>
              <div className="text-sm">
                <Link href="#" className="font-medium text-primary hover:text-primary-hover">Quên mật khẩu?</Link>
              </div>
            </div>
          )}

          {error && (<p className="text-sm text-red-600 text-center">{error}</p>)}
        </CardContent>

        <CardFooter className="flex flex-col gap-4 px-6 pb-6">
          <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : submitButtonText}
          </Button>
          <div className="relative my-2"><div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span></div></div>
          <Button type="button" className="w-full" variant="secondary">PTIT Microsoft Office 365</Button>
          <p className="mt-4 text-center text-sm text-gray-600">
            {switchFormPrompt}{' '}
            <Link href={switchFormLink} className="font-medium text-primary hover:text-primary-hover">{switchFormText}</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}