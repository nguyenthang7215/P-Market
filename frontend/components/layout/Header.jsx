'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Search, ShoppingCart, Bell, Wallet, PlusSquare } from 'lucide-react';
import { useCart } from '../../context/CartContext'; // <-- 1. Import useCart

export default function Header() {
  const { itemCount } = useCart(); // <-- 2. Lấy số lượng từ context

  // Dữ liệu giả lập khác (có thể xóa nếu không cần)
  const userName = "Nguyễn Hữu Niêm";
  const userAvatarUrl = "/avatar.png";
  const notificationCount = 5;
  const isWalletConnected = true; // Đặt là true/false tùy ý để test UI

  const handleConnectWallet = () => {
    alert("Đang kết nối ví...");
  };

  return (
    // Nền Đỏ (primary), chữ trắng
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-16 gap-4">

          {/* 1. Logo P-Market */}
          <div className="flex-shrink-0">
            <Link href="/home" className="text-3xl font-extrabold text-white tracking-wide">
              P-Market
            </Link>
          </div>

          {/* 2. Thanh tìm kiếm */}
          <div className="flex-grow max-w-2xl hidden md:flex items-center relative">
            <Input
              type="text"
              placeholder="Tìm kiếm sách, đồ dùng, phòng trọ tại PTIT..."
              className="w-full pr-14 text-black"
            />
            <Button
              variant="primary"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2"
              aria-label="Tìm kiếm" // Thêm aria-label cho accessibility
            >
              <Search size={20} />
            </Button>
          </div>

          {/* 3. Actions: Ví, Đăng bài, Thông báo, Giỏ hàng, User */}
          <div className="flex-shrink-0 flex items-center gap-1 md:gap-2">

            {/* Nút Kết nối ví */}
            {isWalletConnected ? (
              <div className="hidden lg:flex items-center text-xs font-medium bg-primary-hover p-2 rounded-full">
                <Wallet size={18} className="mr-1" />
                <span>0x1a...9c8d</span> {/* Thay bằng địa chỉ thật sau */}
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleConnectWallet}
                className="
                  hidden lg:block
                  bg-white text-primary hover:bg-gray-100
                  border-white font-semibold
                "
              >
                Connect Wallet
              </Button>
            )}

            {/* Nút Đăng bài (+) */}
            <Link href="/products/new" className="relative p-2 rounded-full hover:bg-primary-hover" aria-label="Đăng bài mới">
              <PlusSquare />
            </Link>

            {/* Nút Thông báo */}
            <Link href="/notifications" className="relative p-2 rounded-full hover:bg-primary-hover" aria-label="Thông báo">
              <Bell />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center transform -translate-y-1/4 translate-x-1/4">
                  {notificationCount}
                </span>
              )}
            </Link>

            {/* Giỏ hàng (Sử dụng itemCount từ context) */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-primary-hover" aria-label="Giỏ hàng">
              <ShoppingCart />
              {/* --- 3. HIỂN THỊ itemCount Ở ĐÂY --- */}
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center transform -translate-y-1/4 translate-x-1/4">
                  {itemCount} {/* <-- Số lượng động */}
                </span>
              )}
              {/* --- HẾT PHẦN HIỂN THỊ itemCount --- */}
            </Link>

            {/* User */}
            <Link href="/dashboard" className="hidden md:flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-primary-hover">
              <Avatar src={userAvatarUrl} alt={`Avatar của ${userName}`} />
              <span className="text-sm font-medium">{userName}</span>
            </Link>

          </div>
        </div>
      </Container>
    </header>
  );
}