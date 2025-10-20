import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../ui/Card';

export default function ProductCard({ product }) {
  const imageUrl = product.imageUrl || `https://placehold.co/600x400/eee/31343C?text=${product.title}`;
  const isFree = Number(product.price) === 0;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
        <div className="relative w-full h-40 md:h-48">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
          {isFree && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              CHO TẶNG
            </span>
          )}
        </div>
        <div className="p-2 md:p-4 flex flex-col flex-grow">
          <h3 className="text-sm md:text-base font-medium text-gray-800 line-clamp-2" title={product.title}>
            {product.title}
          </h3>
          <div className="flex-grow"></div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-base md:text-lg font-bold text-primary">
              {isFree ? 'Miễn phí' : `${Number(product.price).toLocaleString('vi-VN')} ₫`}
            </span>
            <span className="text-xs text-gray-500">Đã bán 10+</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}