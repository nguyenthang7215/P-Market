'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

// --- Icons (SVG) ---
const SearchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> );
const ShoppingCartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> );
const WalletIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6.248c0 1.02-1.006 1.86-2.218 1.86h-1.564a2.25 2.25 0 01-2.218-1.86V12m18 0a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6.248c0 1.02-1.006 1.86-2.218 1.86h-1.564a2.25 2.25 0 01-2.218-1.86V12" /></svg> );
// *** ICON MỚI ***
const BellIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> );
// --- Hết Icons ---

export default function Header() {
  // Dữ liệu giả lập
  const userName = "Nguyễn Hữu Niêm";
  const userAvatarUrl = "/avatar.png"; // <-- Đặt file avatar.png vào /frontend/public/
  const cartItemCount = 9; // Giữ nguyên số 9
  const notificationCount = 5; // *** SỐ THÔNG BÁO MỚI ***
  const isWalletConnected = false; // *** Đặt là 'false' để hiển thị nút Connect ***

  const handleConnectWallet = () => {
    // Logic kết nối ví của bạn sẽ ở đây
    alert("Đang kết nối ví...");
  };

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* 1. Logo P-Market */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-extrabold text-white tracking-wide">
              P-Market
            </Link>
          </div>

          {/* 2. Thanh tìm kiếm (Style Shopee) */}
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
            >
              <SearchIcon />
            </Button>
          </div>

          {/* 3. Actions: Ví, Thông báo, Giỏ hàng, User */}
          <div className="flex-shrink-0 flex items-center gap-2 md:gap-3">
            
            {/* --- NÚT KẾT NỐI VÍ MỚI --- */}
            {isWalletConnected ? (
              // Nếu đã kết nối, hiển thị địa chỉ
              <div className="hidden lg:flex items-center text-xs font-medium bg-primary-hover p-2 rounded-full">
                <WalletIcon />
                <span>0x1a2b...9c8d</span>
              </div>
            ) : (
              // Nếu CHƯA kết nối, hiển thị nút 'Connect Wallet'
              // Dùng 'variant="outline"' với style riêng cho nền đỏ
              <Button
                variant="outline"
                size="sm"
                onClick={handleConnectWallet}
                className="
                  hidden lg:block 
                  bg-white text-primary hover:bg-gray-100 
                  border-white
                "
              >
                Connect Wallet
              </Button>
            )}
            {/* --- HẾT NÚT VÍ --- */}

            {/* --- NÚT THÔNG BÁO MỚI --- */}
            <Link href="/notifications" className="relative p-2 rounded-full hover:bg-primary-hover">
              <BellIcon />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center transform -translate-y-1/4 translate-x-1/4">
                  {notificationCount}
                </span>
              )}
            </Link>
            {/* --- HẾT NÚT THÔNG BÁO --- */}

            {/* Giỏ hàng (Đã có) */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-primary-hover">
              <ShoppingCartIcon />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center transform -translate-y-1/4 translate-x-1/4">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User (Đã có) */}
            <Link href="/dashboard" className="hidden md:flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-primary-hover">
              <Image
                className="h-8 w-8 rounded-full"
                src={userAvatarUrl} 
                alt="User avatar"
                width={32}
                height={32}
              />
              <span className="text-sm font-medium">{userName}</span>
            </Link>
            
          </div>
        </div>
      </Container>
    </header>
  );
}