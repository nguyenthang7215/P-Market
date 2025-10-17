// Thư mục: frontend/components
// Tên file: Header.jsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          P-MARKET
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/register" className="text-gray-600 hover:text-indigo-500">
            Đăng ký
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-indigo-500">
            Đăng nhập
          </Link>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
            Kết nối Ví
          </button>
        </div>
      </nav>
    </header>
  );
}
