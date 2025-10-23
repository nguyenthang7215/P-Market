'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Đổi User thành UserCircle hoặc một icon Profile khác nếu muốn
import { ShoppingBag, Star, Gift, Shield, UserCircle } from 'lucide-react'; 

const navItems = [
  // --- SỬA DÒNG NÀY ---
  { href: '/dashboard', icon: UserCircle, label: 'Profile' }, // Đổi thành Profile
  // --- HẾT SỬA ---
  { href: '/dashboard/orders', icon: ShoppingBag, label: 'Đơn mua' },
  { href: '/dashboard/reviews', icon: Star, label: 'Đánh giá' },
  { href: '/dashboard/rewards', icon: Gift, label: 'Green Credit' },
  { href: '/dashboard/reputation', icon: Shield, label: 'Điểm uy tín' },
];

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm flex-shrink-0">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => {
            // Logic kiểm tra active dựa trên href chính xác hoặc bắt đầu bằng href
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-md transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}