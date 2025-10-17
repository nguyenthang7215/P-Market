// Thư mục: frontend/app/products/[id]
// Tên file: page.jsx
import { getProductById } from '../../lib/api';

export default async function ProductDetailPage({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    return <div className="container mx-auto p-8 text-center">Không tìm thấy sản phẩm.</div>;
  }
  
  const imageUrl = product.imageUrl || 'https://placehold.co/600x400/eee/31343C?text=No+Image';

  return (
    <div className="container mx-auto p-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
           <img src={imageUrl} alt={product.title} className="w-full rounded-lg shadow-lg"/>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl text-indigo-600 font-semibold mb-6">${Number(product.price).toFixed(2)}</p>
          <p className="text-gray-700 mb-8">{product.description}</p>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700 transition">
            Mua hàng
          </button>
        </div>
      </div>
    </div>
  );
}