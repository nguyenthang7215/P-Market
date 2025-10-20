import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import BottomNav from '../../components/layout/BottomNav';

export const metadata = {
  title: 'Trang chủ P-Market',
  description: 'Sàn trao đổi sinh viên PTIT',
};

export default function HomeLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}