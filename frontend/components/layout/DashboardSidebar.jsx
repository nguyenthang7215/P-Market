'use client';
import Link from 'next/link';
import { ShoppingBag, Star, Gift, User, Settings, Shield } from 'lucide-react';

export default function DashboardSidebar() {
  return (
    <nav className="w-64 bg-white p-4 rounded-lg shadow-sm">
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-primary font-medium">
            <User size={20} />
            <span>Tài khoản của tôi</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-gray-700">
            <ShoppingBag size={20} />
            <span>Đơn mua</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/reviews" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-gray-700">
            <Star size={20} />
            <span>Đánh giá</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/rewards" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-gray-700">
            <Gift size={20} />
            <span>Green Credit</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/reputation" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-gray-700">
            <Shield size={20} />
            <span>Điểm uy tín</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}