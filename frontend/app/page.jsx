import { Container } from '../components/ui/Container';
import { getAllProducts } from '../lib/api';
import ProductCard from '../components/product/ProductCard';
import Link from 'next/link'; // Cần import Link ở đây

export default async function HomePage() {
  // Sẽ gọi hàm mock data từ lib/api.js
  const products = await getAllProducts();

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-8">Sản phẩm mới</h1>
      {products.length === 0 ? (
        <p>Không có sản phẩm nào để hiển thị.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            // Bọc ProductCard trong Link
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}