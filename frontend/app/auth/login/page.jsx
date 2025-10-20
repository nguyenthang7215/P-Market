import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="flex flex-col items-center justify-center text-center p-6">
        {/* Logo PTIT - Bạn cần đặt logo này vào /public/ptit-logo.png */}
        <Image 
          src="/ptit-logo.png" 
          alt="PTIT-Marketplace" 
          width={80} 
          height={80} 
        />
        <h2 className="text-2xl font-bold mt-4">Đăng nhập</h2>
        <p className="text-xl text-gray-700 font-semibold">
          PTIT-Marketplace 
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        <form className="space-y-4">
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
              placeholder="Nhập mã số sinh viên..."
              className="mt-1" 
              // Thêm vạch đỏ bên trái (giống hình)
              style={{ borderLeft: '4px solid #CC0000' }}
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
            />
          </div>

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
              <Link href="/forgot-password" className="font-medium text-primary hover:text-primary-hover">
                Quên mật khẩu?
              </Link>
            </div>
          </div>

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
      </CardContent>
    </Card>
  );
}