import Link from 'next/link'; // Import Link ở đây

export default function ProductCard({ product }) {
  const imageUrl = product.imageUrl || `https://placehold.co/600x400/eee/31343C?text=${product.title}`;
  
  return (
    // Component này chỉ là phần giao diện, Link được bọc ở page.jsx
    <div className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
      <div className="relative w-full h-48">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{product.title}</h3>
        <p className="text-gray-600 mt-2">${Number(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
}