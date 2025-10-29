// app/home/page.jsx hoặc tương tự
import { Suspense } from 'react';
import { getAllProducts } from '../../lib/api';
import ProductCard from '../../components/product/ProductCard';
import HeroBanner from '../../components/layout/HeroBanner';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonCard from '../../components/ui/SkeletonCard';

// =========================
// 🧩 CATEGORY GRID
// =========================
const CategoryGrid = () => (
  <div className="w-full bg-white mb-4 p-4 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold mb-3">Khám phá Danh mục</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <Link href="/category/books" className="flex flex-col items-center text-center">
        <Image
          src="https://placehold.co/100x100/F5F5F5/CC0000?text=Sach+Vo"
          width={50}
          height={50}
          alt="Sách vở"
          className="rounded-full mb-1"
        />
        <span className="text-xs">Sách vở</span>
      </Link>

      <Link href="/category/electronics" className="flex flex-col items-center text-center">
        <Image
          src="https://placehold.co/100x100/F5F5F5/CC0000?text=Do+Dien+Tu"
          width={50}
          height={50}
          alt="Đồ điện tử"
          className="rounded-full mb-1"
        />
        <span className="text-xs">Đồ điện tử</span>
      </Link>

      <Link href="/category/housing" className="flex flex-col items-center text-center">
        <Image
          src="https://placehold.co/100x100/F5F5F5/CC0000?text=Phong+Tro"
          width={50}
          height={50}
          alt="Phòng trọ"
          className="rounded-full mb-1"
        />
        <span className="text-xs">Phòng trọ</span>
      </Link>

      <Link href="/category/fashion" className="flex flex-col items-center text-center">
        <Image
          src="https://placehold.co/100x100/F5F5F5/CC0000?text=Thoi+Trang"
          width={50}
          height={50}
          alt="Thời trang"
          className="rounded-full mb-1"
        />
        <span className="text-xs">Thời trang</span>
      </Link>
    </div>
  </div>
);

// =========================
// 🧩 PRODUCT GRID (async)
// =========================
async function ProductGrid() {
  const products = await getAllProducts();

  if (products.length === 0) {
    return (
      <p className="text-gray-500 col-span-full text-center py-4">
        Không có sản phẩm nào.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// =========================
// 🧩 SKELETON GRID (fallback)
// =========================
function ProductGridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// =========================
// 🏠 HOME PAGE
// =========================
export default function HomePage() {
  return (
    <div>
      <HeroBanner />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <CategoryGrid />

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Gợi ý hôm nay</h2>
          <Suspense fallback={<ProductGridSkeleton count={12} />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
