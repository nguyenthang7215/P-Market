// Thư mục: frontend/app
// Tên file: layout.jsx
import Header from '../components/Header';
import './globals.css'; // File này sẽ được tạo bởi Next.js khi cài đặt Tailwind

export const metadata = {
  title: 'P-Market',
  description: 'Decentralized Marketplace',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-gray-50">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}