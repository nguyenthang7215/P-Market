// Thư mục: frontend/app
// Tên file: page.jsx
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../lib/api';

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Sản phẩm</h1>
      {products.length === 0 ? (
        <p>Không có sản phẩm nào để hiển thị.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}