import HomeLayout from '../home/layout'; // Dùng Header/Footer chung
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import { Container } from '../../components/ui/Container';

export default function DashboardLayout({ children }) {
  return (
    // Chúng ta lồng HomeLayout (có Header/Footer)
    // bên trong nó là một layout 2 cột (Sidebar + children)
    <HomeLayout>
      <Container className="py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <DashboardSidebar />
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </Container>
    </HomeLayout>
  );
}