import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import BottomNav from '../../components/layout/BottomNav';
import { CartProvider } from '../../context/CartContext';
import { WalletProvider } from '../../context/WalletContext';

export const metadata = { title: 'P-Market' };

export default function HomeLayout({ children }) {
  return (
    <WalletProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col pb-16 md:pb-0">
          <Header /> {/* <-- HEADER CHUNG (1 LẦN) */}
          <main className="flex-grow w-full bg-background">
            {children} {/* DashboardLayout sẽ vào đây */}
          </main>
          <Footer /> {/* <-- FOOTER CHUNG (1 LẦN) */}
          <BottomNav />
        </div>
      </CartProvider>
    </WalletProvider>
  );
}