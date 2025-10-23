'use client'; // <-- Chuyển thành Client Component để dùng Provider
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import { CartProvider } from '../../context/CartContext';
import { WalletProvider } from '../../context/WalletContext';
import Header from '../../components/layout/Header'; // <-- Import Header
import Footer from '../../components/layout/Footer'; // <-- Import Footer
import BottomNav from '../../components/layout/BottomNav'; // <-- Import BottomNav

// Metadata có thể không hoạt động tốt, tạm thời bỏ qua hoặc cấu hình riêng
// export const metadata = { title: 'Trang cá nhân - P-Market' };

export default function DashboardLayout({ children }) {
  return (
    // Bọc Provider cho các trang dashboard
    <WalletProvider>
      <CartProvider>
        {/* Layout cơ bản giống HomeLayout */}
        <div className="min-h-screen flex flex-col pb-16 md:pb-0">
          <Header /> {/* <-- THÊM HEADER VÀO ĐÂY */}
          <main className="flex-grow w-full bg-background">
            {/* Div bao ngoài có padding */}
            <div className="py-8 px-4 sm:px-6 lg:px-8">
              {/* Bố cục 2 cột */}
              <div className="flex flex-col md:flex-row gap-8">
                <DashboardSidebar /> {/* <-- SIDEBAR Ở ĐÂY */}
                <div className="flex-grow w-full">
                  {children} {/* Nội dung các trang dashboard con */}
                </div>
              </div>
            </div>
          </main>
          <Footer /> {/* <-- THÊM FOOTER VÀO ĐÂY */}
          <BottomNav /> {/* <-- THÊM BOTTOMNAV VÀO ĐÂY */}
        </div>
      </CartProvider>
    </WalletProvider>
  );
}