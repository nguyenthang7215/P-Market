import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import BottomNav from '../../components/layout/BottomNav';
import { CartProvider } from '../../context/CartContext';

export const metadata = {
  title: 'Trang chủ P-Market',
  description: 'Sàn trao đổi sinh viên PTIT',
};

export default function HomeLayout({ children }) {
  return (
   <CartProvider> 
      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
        <Header />
        <main className="flex-grow w-full">
          {children} {/* Bây giờ children có thể truy cập giỏ hàng */}
        </main>
        <Footer />
        <BottomNav />
      </div>
    </CartProvider>
  );
}