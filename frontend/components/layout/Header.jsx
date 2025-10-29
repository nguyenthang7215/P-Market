'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Container } from '../ui/Container';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Search, ShoppingCart, Bell, Wallet, PlusSquare } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWallet } from '../../context/WalletContext';

// --- Dữ liệu thông báo giả lập ---
const mockNotifications = [
  { id: 1, text: 'Khuyến mãi cực sốc! Giảm giá 50%...', time: '15 phút trước', read: false, link: '/sale' },
  { id: 2, text: 'Đơn hàng DH456 đã được giao thành công.', time: '2 giờ trước', read: false, link: '/dashboard/orders/DH456' },
  { id: 3, text: 'Bạn nhận được 5 Green Credit.', time: '1 ngày trước', read: true, link: '/dashboard/rewards' },
];

// --- Dữ liệu giỏ hàng giả lập ---
const mockCartItems = [
  { id: 1, name: 'Sản phẩm A', price: 120000, image: '/product1.jpg', quantity: 1 },
  { id: 2, name: 'Sản phẩm B', price: 90000, image: '/product2.jpg', quantity: 2 },
];

export default function Header() {
  const { itemCount } = useCart();
  const { isConnected, walletAddress, connectWallet } = useWallet();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const userName = "Nguyễn Hữu Niêm";
  const userAvatarUrl = "/avatar.png";
  const notificationCount = mockNotifications.filter(n => !n.read).length;
  const cartCount = mockCartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-16 gap-4">
          {/* --- LOGO --- */}
          <div className="flex-shrink-0 flex items-center gap-2">
  <Link href="/home" className="flex items-center gap-2">
    {/* Logo hình ảnh */}
    <Image
      src="/logo-home.png"       
      alt="P-Market Logo"
      width={150}
      height={50}
      className="rounded-md"
    />
   
  </Link>
</div>


          {/* --- Ô TÌM KIẾM --- */}
          <div className="flex-grow max-w-2xl hidden md:flex items-center relative">
            <Input
              type="text"
              placeholder="Tìm kiếm tại P-Market..."
              className="w-full pr-14 text-black"
            />
            <Button
              variant="primary"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Search size={20} />
            </Button>
          </div>

          {/* --- ICONS --- */}
          <div className="flex-shrink-0 flex items-center gap-1 md:gap-2">
            {/* Ví (Wallet) */}
            {isConnected ? (
              <div className="hidden lg:flex items-center text-xs font-medium bg-primary-hover p-2 rounded-full">
                <Wallet size={18} className="mr-1" />
                <span>
                  {walletAddress.substring(0, 6)}...
                  {walletAddress.substring(walletAddress.length - 4)}
                </span>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                variant="outline"
                size="sm"
                className="hidden lg:block bg-white text-primary hover:bg-gray-100 border-white font-semibold"
              >
                Connect Wallet
              </Button>
            )}

            {/* Đăng sản phẩm */}
            <Link
              href="/products/new"
              className="relative p-2 rounded-full hover:bg-primary-hover"
              aria-label="Đăng sản phẩm mới"
            >
              <PlusSquare />
            </Link>

            {/* --- THÔNG BÁO --- */}
            <div
              className="relative"
              onMouseEnter={() => setIsNotificationOpen(true)}
              onMouseLeave={() => setIsNotificationOpen(false)}
            >
              {/* Icon click được để sang trang */}
              <Link
                href="/notifications"
                className="relative p-2 rounded-full hover:bg-primary-hover focus:outline-none"
                aria-label="Thông báo"
              >
                <Bell />
                {notificationCount > 0 && (
<span className="absolute top-[13px] right-[1px] block h-4 w-4 rounded-full bg-white text-primary text-[10px] font-bold flex items-center justify-center ring-1 ring-primary">
                    {notificationCount}
                  </span>
                )}
              </Link>

              {/* Popup thông báo */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 text-gray-800">
                  <div className="py-2 px-4 font-semibold border-b">Thông Báo Mới Nhận</div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.map((noti) => (
                      <Link
                        key={noti.id}
                        href={noti.link}
                        className={`block px-4 py-3 hover:bg-gray-100 border-b last:border-b-0 ${!noti.read ? 'bg-blue-50' : ''}`}
                      >
                        <p className={`text-sm ${!noti.read ? 'font-semibold' : ''}`}>{noti.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{noti.time}</p>
                      </Link>
                    ))}
                  </div>
                  <div className="py-2 px-4 border-t text-center">
                    <Link href="/notifications" className="text-sm font-medium text-primary hover:underline">
                      Xem tất cả
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* --- GIỎ HÀNG (Hover popup + Click link) --- */}
            <div
              className="relative"
              onMouseEnter={() => setIsCartOpen(true)}
              onMouseLeave={() => setIsCartOpen(false)}
            >
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-primary-hover"
                aria-label="Giỏ hàng"
              >
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute top-[13px] right-[1px] block h-4 w-4 rounded-full bg-white text-primary text-[10px] font-bold flex items-center justify-center ring-1 ring-primary">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Popup giỏ hàng */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20 text-gray-800">
                  <div className="py-2 px-4 font-semibold border-b">Giỏ Hàng Của Bạn</div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockCartItems.length > 0 ? (
                      mockCartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0 hover:bg-gray-100">
                          <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md object-cover" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} × {item.price.toLocaleString()}₫
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">Giỏ hàng trống.</div>
                    )}
                  </div>
                  <div className="py-2 px-4 border-t text-center">
                    <Link href="/cart" className="text-sm font-medium text-primary hover:underline">
                      Xem giỏ hàng
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* --- USER --- */}
            <Link
              href="/dashboard"
              className="hidden md:flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-primary-hover"
            >
              <Avatar src={userAvatarUrl} alt={`Avatar của ${userName}`} />
              <span className="text-sm font-medium">{userName}</span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
