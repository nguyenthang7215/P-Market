'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card'; // <-- Đường dẫn đúng là ../
import { Button } from '../components/ui/Button'; // <-- Đường dẫn đúng là ../
import { Input } from '../components/ui/Input'; // <-- Đường dẫn đúng là ../

export default function LoginPage() {
  const router = useRouter();
  
  // State để lưu trữ username, password và lỗi
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State để báo lỗi

  // Hàm xử lý khi nhấn nút Đăng nhập
  const handleLogin = (e) => {
    e.preventDefault(); // Ngăn form tải lại trang
    setError(''); // Xóa lỗi cũ

    // Kiểm tra xem người dùng đã nhập hay chưa
    if (username.trim() === '' || password.trim() === '') {
      setError('Vui lòng nhập cả Tài khoản và Mật khẩu.');
      return; // Dừng lại, không cho đăng nhập
    }
    
    // Giả lập đăng nhập thành công (sau này sẽ gọi backend)
    console.log('Đang kiểm tra (giả lập):', { username, password });
    
    // Nếu kiểm tra OK, chuyển hướng
    router.push('/home'); 
  };

  return (
    // Dùng layout nền xám (từ app/layout.jsx)
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="flex flex-col items-center justify-center text-center p-6">
        {/* Logo PTIT */}
        <Image src="/ptit-logo.png" alt="PTIT Logo" width={80} height={80} />
        <h2 className="text-2xl font-bold mt-4">Đăng nhập</h2>
        <p className="text-xl text-gray-700 font-semibold">
          PTIT-Marketplace 
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <form className="space-y-4" onSubmit={handleLogin}>
          
          {/* === PHẦN BỊ THIẾU CỦA BẠN LÀ ĐÂY === */}
          
          {/* Tài khoản */}
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700"
            >
              Tài khoản
            </label>
            <Input 
              type="text" 
              id="username" 
              name="username"
              placeholder="Mã số sinh viên"
              className="mt-1" 
              style={{ borderLeft: '4px solid #CC0000' }}
              // Kết nối Input với state
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Mật khẩu */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <Input 
              type="password" 
              id="password" 
              name="password"
              placeholder="********"
              className="mt-1"
              // Kết nối Input với state
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {/* === HẾT PHẦN BỊ THIẾU === */}


          {/* Ghi nhớ & Quên mật khẩu */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <label 
                htmlFor="remember-me" 
                className="ml-2 block text-sm text-gray-900"
              >
                Ghi nhớ
              </label>
            </div>
            <div className="text-sm">
              <Link href="#" className="font-medium text-primary hover:text-primary-hover">
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          {/* Hiển thị thông báo lỗi (nếu có) */}
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          {/* Nút Đăng nhập (Màu đỏ) */}
          <Button type="submit" className="w-full" variant="primary">
            Đăng nhập
          </Button>
          
          {/* Dấu gạch ngang */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>

          {/* Nút PTIT Office (Màu xanh) */}
          <Button type="button" className="w-full" variant="secondary">
            PTIT Microsoft Office 365
          </Button>

        </form>

        {/* Link Đăng ký */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <Link href="/auth/register" className="font-medium text-primary hover:text-primary-hover">
            Đăng ký ngay
          </Link>
        </p>

      </CardContent>
    </Card>
  );
}