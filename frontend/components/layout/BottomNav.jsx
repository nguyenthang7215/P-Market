'use client';
import Link from 'next/link';
import { Home, LayoutGrid, Bell, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
      <div className="flex justify-around items-center h-16">
        <Link href="/home" className="flex flex-col items-center text-primary">
          <Home />
          <span className="text-xs">Trang chủ</span>
        </Link>
        <Link href="/categories" className="flex flex-col items-center text-gray-600 hover:text-primary">
          <LayoutGrid />
          <span className="text-xs">Danh mục</span>
        </Link>
        <Link href="/notifications" className="flex flex-col items-center text-gray-600 hover:text-primary relative">
          <Bell />
          <span className="absolute top-0 right-2 block h-4 w-4 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center transform -translate-y-1/4 translate-x-1/4">
            5
          </span>
          <span className="text-xs">Thông báo</span>
        </Link>
        <Link href="/dashboard" className="flex flex-col items-center text-gray-600 hover:text-primary">
          <User />
          <span className="text-xs">Tôi</span>
        </Link>
      </div>
    </nav>
  );
}