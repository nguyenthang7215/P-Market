// Thư mục: frontend/components
// Tên file: ProductCard.jsx
export default function ProductCard({ product }) {
  // Fallback image in case imageUrl is missing
  const imageUrl = product.imageUrl || 'https://placehold.co/600x400/eee/31343C?text=No+Image';

  return (
    <a href={`/products/${product.id}`} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{product.title}</h3>
        <p className="text-gray-600 mt-2">${Number(product.price).toFixed(2)}</p>
      </div>
    </a>
  );
}