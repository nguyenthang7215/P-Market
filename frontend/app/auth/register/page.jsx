'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// --- SỬA CÁC ĐƯỜNG DẪN NÀY ---
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
// --- HẾT PHẦN SỬA ---

export default function RegisterPage() {
  const router = useRouter();
  
  // State cho tất cả các ô
  const [name, setName] = useState('');
  const [msv, setMsv] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState(''); // <-- MÃ GIỚI THIỆU
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra đơn giản
    if (!name || !msv || !email || !password) {
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    // Giả lập đăng ký thành công
    console.log('Đăng ký với thông tin:', { name, msv, email, password, referralCode });
    
    // Giả lập đăng ký xong, chuyển vào trang chủ
    router.push('/home');
  };

  return (
    // Trang này sẽ tự động dùng layout nền xám (app/auth/layout.jsx)
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="flex flex-col items-center justify-center text-center p-6">
        <Image src="/ptit-logo.png" alt="PTIT Logo" width={80} height={80} />
        <h2 className="text-2xl font-bold mt-4">Tạo tài khoản</h2>
        <p className="text-xl text-gray-700 font-semibold">
          PTIT-Marketplace
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <form className="space-y-4" onSubmit={handleRegister}>
          
          {/* Tên người dùng */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
            <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
          </div>

          {/* Mã sinh viên */}
          <div>
            <label htmlFor="msv" className="block text-sm font-medium text-gray-700">Mã sinh viên</label>
            <Input type="text" id="msv" value={msv} onChange={(e) => setMsv(e.target.value)} className="mt-1" />
          </div>

          {/* Email trường */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (PTIT)</label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
          </div>

          {/* Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
          </div>

          {/* --- Ô MÃ GIỚI THIỆU (FLOW #1) --- */}
          <div>
            <label htmlFor="referral" className="block text-sm font-medium text-gray-700">
              Mã giới thiệu (Nếu có)
            </label>
            <Input 
              type="text" 
              id="referral" 
              value={referralCode} 
              onChange={(e) => setReferralCode(e.target.value)} 
              className="mt-1"
              placeholder="Nhập mã của bạn bè"
            />
          </div>
          {/* --- HẾT Ô MÃ GIỚI THIỆU --- */}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" className="w-full" variant="primary">
            Đăng ký
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <Link href="/" className="font-medium text-primary hover:text-primary-hover">
            Đăng nhập ngay
          </Link>
        </p>

      </CardContent>
    </Card>
  );
}