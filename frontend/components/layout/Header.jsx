'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Search, ShoppingCart, Bell, Wallet, PlusSquare } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWallet } from '../../context/WalletContext'; // <-- Import

export default function Header() {
  const { itemCount } = useCart();
  const { isConnected, walletAddress, connectWallet } = useWallet(); // <-- Lấy từ context

  const userName = "Nguyễn Hữu Niêm";
  const userAvatarUrl = "/avatar.png";
  const notificationCount = 5;

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-16 gap-4">
          <div className="flex-shrink-0">
            <Link href="/home" className="text-3xl font-extrabold text-white tracking-wide">P-Market</Link>
          </div>
          <div className="flex-grow max-w-2xl hidden md:flex items-center relative">
            <Input type="text" placeholder="Tìm kiếm tại P-Market..." className="w-full pr-14 text-black" />
            <Button variant="primary" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2"><Search size={20} /></Button>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1 md:gap-2">
            {isConnected ? (
              <div className="hidden lg:flex items-center text-xs font-medium bg-primary-hover p-2 rounded-full">
                <Wallet size={18} className="mr-1" />
                <span>{walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}</span>
              </div>
            ) : (
              <Button onClick={connectWallet} variant="outline" size="sm" className="hidden lg:block bg-white text-primary hover:bg-gray-100 border-white font-semibold">
                Connect Wallet
              </Button>
            )}
            <Link href="/products/new" className="relative p-2 rounded-full hover:bg-primary-hover"><PlusSquare /></Link>
            <Link href="/notifications" className="relative p-2 rounded-full hover:bg-primary-hover">
              <Bell />
              {notificationCount > 0 && (<span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center transform -translate-y-1/4 translate-x-1/4">{notificationCount}</span>)}
            </Link>
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-primary-hover">
              <ShoppingCart />
              {itemCount > 0 && (<span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-white text-primary text-xs font-bold flex items-center justify-center transform -translate-y-1/4 translate-x-1/4">{itemCount}</span>)}
            </Link>
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