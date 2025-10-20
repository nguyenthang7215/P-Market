import { Container } from '../../components/ui/Container';
import { getAllProducts } from '../../lib/api';
import ProductCard from '../../components/product/ProductCard';
import Link from 'next/link';
import Image from 'next/image';

const HeroBanner = () => (
  <div className="w-full bg-white mb-4 shadow-sm">
    <Container><div className="py-4">
      <Link href="/sale" className="block rounded-lg overflow-hidden shadow-md">
        <Image src="https://placehold.co/1200x400/CC0000/ffffff?text=SALE+LON+P-MARKET" alt="Main Banner" width={1200} height={400} layout="responsive" objectFit="cover" />
      </Link>
    </div></Container>
  </div>
);

const CategoryGrid = () => (
  <div className="w-full bg-white mb-4 p-4 rounded-lg shadow-sm">
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
    <div>
      <HeroBanner />
      <Container>
        <CategoryGrid />
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Gợi ý hôm nay</h2>
          {products.length === 0 ? (<p>Không có sản phẩm nào.</p>) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}