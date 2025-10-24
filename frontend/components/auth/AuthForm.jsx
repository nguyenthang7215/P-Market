'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react'; // Icon loading

export default function AuthForm({ formType, onSubmit, isLoading }) {
  const [username, setUsername] = useState(''); // MSV (Login) or Email (Register)
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for register
  const [referralCode, setReferralCode] = useState(''); // Only for register
  const [errors, setErrors] = useState({}); // State for validation errors

  const isRegister = formType === 'register';
  const title = isRegister ? 'Tạo tài khoản' : 'Đăng nhập';
  const submitButtonText = isRegister ? 'Đăng ký' : 'Đăng nhập';
  const switchFormLink = isRegister ? '/' : '/register';
  const switchFormText = isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay';
  const switchFormPrompt = isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?';

  // --- Validation Functions ---
  const validatePtitEmail = (email) => /^[a-zA-Z0-9._%+-]+@(stu\.)?ptit\.edu\.vn$/.test(email);
  const validateStudentId = (msv) => /^B\d{2}DC[A-Z]{2}\d{3}$/i.test(msv); // Example: B23DCCE076
  const validatePassword = (pass) => pass.length >= 6; // Min 6 characters

  // --- Handle Submit with Validation ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic required checks
    if (!username.trim()) newErrors.username = 'Tài khoản không được để trống.';
    if (!password.trim()) newErrors.password = 'Mật khẩu không được để trống.';

    // Specific validation
    if (isRegister) {
      if (!name.trim()) newErrors.name = 'Họ và Tên không được để trống.';
      if (username.trim() && !validatePtitEmail(username)) newErrors.username = 'Email PTIT không hợp lệ.';
      if (password.trim() && !validatePassword(password)) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    } else { // Login
      if (username.trim() && !validateStudentId(username)) newErrors.username = 'Mã sinh viên không hợp lệ.';
    }

    setErrors(newErrors); // Update errors state

    // If no errors, call the parent onSubmit function
    if (Object.keys(newErrors).length === 0) {
      const formData = { username, password };
      if (isRegister) {
        formData.name = name;
        formData.referralCode = referralCode;
        formData.email = username;
      } else {
        formData.msv = username;
      }
      onSubmit(formData);
    } else {
      toast.error('Vui lòng kiểm tra lại thông tin đã nhập.'); // General error toast
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="flex flex-col items-center justify-center text-center p-6">
        <Image src="/ptit-logo.png" alt="PTIT Logo" width={80} height={80} />
        <h2 className="text-2xl font-bold mt-4">{title}</h2>
        <p className="text-xl text-gray-700 font-semibold">PTIT-Marketplace</p>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-4">
          {/* Name (Register only) */}
          {isRegister && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
              <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className={`mt-1 ${errors.name ? 'border-red-500' : ''}`} />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
          )}
          {/* Username/Email */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">{isRegister ? 'Email (PTIT)' : 'Tài khoản (Mã sinh viên)'}</label>
            <Input
              type={isRegister ? 'email' : 'text'} id="username" name="username"
              placeholder={isRegister ? "your.msv@stu.ptit.edu.vn" : "Nhập mã số sinh viên..."}
              className={`mt-1 ${errors.username ? 'border-red-500' : ''}`}
              style={{ borderLeft: !isRegister ? '4px solid #CC0000' : '' }}
              value={username} onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <Input type="password" id="password" name="password" placeholder="********"
              className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
             {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>
          {/* Referral Code (Register only) */}
          {isRegister && (
            <div>
              <label htmlFor="referral" className="block text-sm font-medium text-gray-700">Mã giới thiệu (Nếu có)</label>
              <Input type="text" id="referral" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} className="mt-1" placeholder="Nhập mã của bạn bè" />
            </div>
          )}
          {/* Remember Me / Forgot Password (Login only) */}
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
          {/* Removed general error display here */}
        </CardContent>

        <CardFooter className="flex flex-col gap-4 px-6 pb-6">
          <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            {isLoading ? 'Đang xử lý...' : submitButtonText}
          </Button>
          {/* Or login with */}
          <div className="relative my-2"><div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span></div></div>
          <Button type="button" className="w-full" variant="secondary">PTIT Microsoft Office 365</Button>
          {/* Switch form link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            {switchFormPrompt}{' '}
            <Link href={switchFormLink} className="font-medium text-primary hover:text-primary-hover">{switchFormText}</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}