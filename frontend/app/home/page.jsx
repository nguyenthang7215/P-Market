import { Container } from '../../components/ui/Container'; // <-- Vẫn import vì HeroBanner dùng
import { getAllProducts } from '../../lib/api';
import ProductCard from '../../components/product/ProductCard';
import HeroBanner from '../../components/layout/HeroBanner'; // <-- Import HeroBanner
import Link from 'next/link';
import Image from 'next/image';

// Giữ nguyên component CategoryGrid (hoặc import nếu bạn đã tách file)
const CategoryGrid = () => (
  // Thêm padding ngang px-4 để nội dung không dính sát viền màn hình
  <div className="w-full bg-white mb-4 p-4 rounded-lg shadow-sm px-4 sm:px-6 lg:px-8">
    <h2 className="text-lg font-semibold mb-3">Khám phá Danh mục</h2>
    <div className="grid grid-cols-4 gap-4">
      <Link href="#" className="flex flex-col items-center text-center"><Image src="https://placehold.co/100x100/F5F5F5/CC0000?text=Sach+Vo" width={50} height={50} alt="Sách" className="rounded-full mb-1" /><span className="text-xs">Sách vở</span></Link>
      <Link href="#" className="flex flex-col items-center text-center"><Image src="https://placehold.co/100x100/F5F5F5/CC0000?text=Do+Dien+Tu" width={50} height={50} alt="Đồ điện tử" className="rounded-full mb-1" /><span className="text-xs">Đồ điện tử</span></Link>
      <Link href="#" className="flex flex-col items-center text-center"><Image src="https://placehold.co/100x100/F5F5F5/CC0000?text=Phong+Tro" width={50} height={50} alt="Phòng trọ" className="rounded-full mb-1" /><span className="text-xs">Phòng trọ</span></Link>
      <Link href="#" className="flex flex-col items-center text-center"><Image src="https://placehold.co/100x100/F5F5F5/CC0000?text=Thoi+Trang" width={50} height={50} alt="Thời trang" className="rounded-full mb-1" /><span className="text-xs">Thời trang</span></Link>
    </div>
  </div>
);


export default async function HomePage() {
  const products = await getAllProducts();
  return (
    <div className="bg-background min-h-screen"> {/* Nền xám nhạt */}

      <HeroBanner /> {/* Banner vẫn giữ nguyên */}

      {/* --- XÓA CONTAINER Ở ĐÂY --- */}
      {/* <Container className="py-8"> */}

        {/* Thêm padding trực tiếp vào các section */}
        <div className="py-8 px-4 sm:px-6 lg:px-8"> {/* Thêm px-... */}
          <CategoryGrid /> {/* Lưới danh mục */}

          {/* Phần sản phẩm */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Gợi ý hôm nay</h2>
            {products.length === 0 ? (<p>Không có sản phẩm nào.</p>) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"> {/* Tăng số cột */}
                {products.map((product) => (
                   <ProductCard key={product.id} product={product} />
                 ))}
              </div>
            )}
          </div>
        </div>

      {/* </Container> */}
      {/* --- KẾT THÚC XÓA CONTAINER --- */}
    </div>
  );
}