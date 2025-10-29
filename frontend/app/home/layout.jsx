import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer'; // <-- 1. Import Footer
import BottomNav from '../../components/layout/BottomNav';
import { CartProvider } from '../../context/CartContext';
import { WalletProvider } from '../../context/WalletContext';

export const metadata = { title: 'P-Market' };

export default function HomeLayout({ children }) {
  return (
    <WalletProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col pb-16 md:pb-0">
          <Header />
          <main className="flex-grow w-full bg-background">
            {children}
          </main>
          <Footer /> {/* <-- 2. Thêm Footer vào đây */}
          <BottomNav />
        </div>
      </CartProvider>
    </WalletProvider>
  );
}