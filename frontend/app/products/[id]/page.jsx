import { getProductById } from '../../../lib/api';
import { Container } from '../../../components/ui/Container';
import { Button } from '../../../components/ui/Button';

export default async function ProductDetailPage({ params }) {
  // Sẽ gọi hàm mock data từ lib/api.js
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <Container className="py-8 text-center">
        <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
      </Container>
    );
  }

  const imageUrl = product.imageUrl || `https://placehold.co/600x400/eee/31343C?text=${product.title}`;

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <img src={imageUrl} alt={product.title} className="w-full rounded-lg shadow-md object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl text-indigo-600 font-semibold mb-6">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-gray-700 mb-8 whitespace-pre-wrap">
            {product.description}
          </p>
          <Button size="lg" className="w-full">
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </Container>
  );
}