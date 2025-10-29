'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function AuthForm({ formType, onSubmit, isLoading }) {
  // --- States ---
  const [loginEmail, setLoginEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isExternal, setIsExternal] = useState(false);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const isRegister = formType === 'register';
  const title = isRegister ? 'Tạo tài khoản' : 'Đăng nhập';
  const submitButtonText = isRegister ? 'Đăng ký' : 'Đăng nhập';
  const switchFormLink = isRegister ? '/' : '/auth/register';
  const switchFormText = isRegister ? 'Đăng nhập ngay' : 'Đăng ký ngay';
  const switchFormPrompt = isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản?';

  // --- Validation ---
  const validatePtitEmail = (email) => /^[a-zA-Z0-9._%+-]+@(stu\.)?ptit\.edu\.vn$/.test(email);
  const validateAnyEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (uname) => /^[a-zA-Z0-9_]{3,}$/.test(uname);
  const validatePassword = (pass) => pass.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (isRegister) {
      if (!firstName.trim()) newErrors.firstName = 'Họ không được để trống.';
      if (!lastName.trim()) newErrors.lastName = 'Tên không được để trống.';
      if (!registerEmail.trim()) newErrors.email = 'Email không được để trống.';
      else if (!isExternal && !validatePtitEmail(registerEmail)) newErrors.email = 'Email PTIT không hợp lệ.';
      else if (isExternal && !validateAnyEmail(registerEmail)) newErrors.email = 'Email không hợp lệ.';
      if (!registerUsername.trim()) newErrors.usernameReg = 'Username không được để trống.';
      else if (!validateUsername(registerUsername)) newErrors.usernameReg = 'Username phải có ít nhất 3 ký tự (chữ, số, _).';
      if (!password.trim()) newErrors.password = 'Mật khẩu không được để trống.';
      else if (!validatePassword(password)) newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
    } else {
      if (!loginEmail.trim()) newErrors.loginEmail = 'Email không được để trống.';
      else if (!validateAnyEmail(loginEmail)) newErrors.loginEmail = 'Email không hợp lệ.';
      if (!password.trim()) newErrors.password = 'Mật khẩu không được để trống.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = isRegister
        ? { firstName, lastName, email: registerEmail, password, username: registerUsername, referralCode, isExternal }
        : { email: loginEmail, password };

      onSubmit(formData);
    } else {
      toast.error('Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <Card className={`w-full ${isRegister ? 'max-w-lg' : 'max-w-md'} shadow-xl`}>
      <CardHeader className="items-center text-center p-6">
        <Image
          src="/logomain.png"
          alt="P-Market Logo"
          width={220}
          height={140}
          priority
        />
        <h2 className="text-2xl font-bold mt-4">{title}</h2>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-4">
          {/* --- Register Fields --- */}
          {isRegister && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName">Họ</label>
                  <Input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName">Tên</label>
                  <Input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="isExternal"
                  name="isExternal"
                  type="checkbox"
                  checked={isExternal}
                  onChange={(e) => setIsExternal(e.target.checked)}
                  className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <label htmlFor="isExternal" className="ml-2 block text-sm text-gray-900">
                  Đăng ký với tư cách người ngoài PTIT?
                </label>
              </div>

              <div>
                <label htmlFor="email">Email {isExternal ? '' : '(PTIT)'}</label>
                <Input
                  type="email"
                  id="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder={isExternal ? 'Nhập email của bạn' : 'your.msv@stu.ptit.edu.vn'}
                  className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="usernameReg">Username</label>
                <Input
                  type="text"
                  id="usernameReg"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  placeholder="Tên đăng nhập (ít nhất 3 ký tự)"
                  className={`mt-1 ${errors.usernameReg ? 'border-red-500' : ''}`}
                />
                {errors.usernameReg && <p className="mt-1 text-xs text-red-600">{errors.usernameReg}</p>}
              </div>
            </>
          )}

          {/* --- Login Fields (Chỉ Email) --- */}
          {!isRegister && (
            <>
              <div>
                <label htmlFor="loginEmail">Email</label>
                <Input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  placeholder="Nhập email PTIT của bạn"
                  className={`mt-1 ${errors.loginEmail ? 'border-red-500' : ''}`}
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                {errors.loginEmail && <p className="mt-1 text-xs text-red-600">{errors.loginEmail}</p>}
              </div>
            </>
          )}

          {/* --- Password Field --- */}
          <div>
            <label htmlFor="password">Mật khẩu</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder={isRegister ? 'Ít nhất 6 ký tự' : '********'}
              className={`mt-1 ${errors.password ? 'border-red-500' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          {!isRegister && (
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Ghi nhớ</label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-primary hover:text-primary-hover">
  Quên mật khẩu?
</Link>

              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4 px-6 pb-6">
          <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
            {isLoading ? 'Đang xử lý...' : submitButtonText}
          </Button>
          {!isRegister && (
            <>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span></div>
              </div>
              <Button type="button" className="w-full" variant="secondary">PTIT Microsoft Office 365</Button>
            </>
          )}
          <p className="mt-4 text-center text-sm text-gray-600">
            {switchFormPrompt}{' '}
            <Link href={switchFormLink} className="font-medium text-primary hover:text-primary-hover">{switchFormText}</Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
