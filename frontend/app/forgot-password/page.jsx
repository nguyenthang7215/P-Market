'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';
import { Loader2, Mail } from 'lucide-react'; // Import icon

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái sau khi gửi
  const [error, setError] = useState('');

  // Hàm validate email đơn giản
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Vui lòng nhập một địa chỉ email hợp lệ.');
      toast.error('Email không hợp lệ.');
      return;
    }

    setIsLoading(true);
    // Giả lập gọi API gửi email
    console.log("Đang gửi link reset mật khẩu đến (giả lập):", email);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true); // Chuyển sang trạng thái đã gửi
      toast.success('Đã gửi link, vui lòng kiểm tra email!');
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="items-center text-center p-6">
        <Image src="/ptit-logo.png" alt="PTIT Logo" width={80} height={80} />
        <h2 className="text-2xl font-bold mt-4">Quên mật khẩu</h2>
      </CardHeader>
      
      {/* Hiển thị form HOẶC thông báo đã gửi */}
      {isSubmitted ? (
        // --- GIAO DIỆN SAU KHI GỬI ---
        <CardContent className="p-6 text-center space-y-4">
           <Mail size={48} className="mx-auto text-green-500" />
           <p className="font-semibold text-lg">Kiểm tra Email của bạn</p>
           <p className="text-sm text-gray-600">
             Chúng tôi đã gửi một email chứa link đặt lại mật khẩu đến 
             <strong className="block">{email}</strong>.
           </p>
           <Link href="/">
             <Button variant="link" className="mt-4">Quay lại trang Đăng nhập</Button>
           </Link>
        </CardContent>

      ) : (
        // --- GIAO DIỆN FORM NHẬP ---
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-4">
            <p className="text-sm text-gray-600 text-center">
              Nhập email của bạn và chúng tôi sẽ gửi cho bạn một link để đặt lại mật khẩu.
            </p>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email của bạn..."
                className={`mt-1 ${error ? 'border-red-500' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 px-6 pb-6">
            <Button type="submit" className="w-full" variant="primary" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
              {isLoading ? 'Đang gửi...' : 'Gửi link reset'}
            </Button>
            <Link href="/">
              <Button type="button" variant="link" className="w-full">
                Hủy
              </Button>
            </Link>
          </CardFooter>
        </form>
      )}
    </Card>
  );
}