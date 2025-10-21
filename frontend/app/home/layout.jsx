import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import BottomNav from '../../components/layout/BottomNav';
import { CartProvider } from '../../context/CartContext';
import { WalletProvider } from '../../context/WalletContext'; // <-- Import

export const metadata = {
  title: 'Trang chủ P-Market',
};

export default function HomeLayout({ children }) {
  return (
    // Bọc layout bằng WalletProvider
    <WalletProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col pb-16 md:pb-0">
          <Header />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </div>
      </CartProvider>
    </WalletProvider>
  );
}