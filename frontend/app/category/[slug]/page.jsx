'use client'; 

import { useParams } from 'next/navigation';
import ProductCard from '../../../components/product/ProductCard'; // <-- Đường dẫn 3 chấm
import { Card, CardContent } from '../../../components/ui/Card'; // <-- Đường dẫn 3 chấm
import Link from 'next/link';

// Dữ liệu sản phẩm giả lập
const mockCategoryProducts = {
  books: [
    { id: 1, title: "Sách Lập trình JavaScript", description: "...", price: "150000.00", imageUrl: "https://placehold.co/600x400/e9d5ff/31343C?text=JS+Book", seller: { name: "...", avatar: "...", reputation: 0 } },
    { id: 5, title: "Giáo trình Giải tích 1", description: "...", price: "50000.00", imageUrl: "https://placehold.co/600x400/e9d5ff/31343C?text=Giai+Tich", seller: { name: "...", avatar: "...", reputation: 0 } },
  ],
  electronics: [
     { id: 2, title: "Bàn phím cơ", description: "...", price: "750000.00", imageUrl: "https://placehold.co/600x400/bbf7d0/31343C?text=Keyboard", seller: { name: "...", avatar: "...", reputation: 0 } },
     { id: 3, title: "Chuột không dây", description: "...", price: "220000.00", imageUrl: "https://placehold.co/600x400/fecaca/31343C?text=Mouse", seller: { name: "...", avatar: "...", reputation: 0 } },
  ],
  housing: [],
  fashion: [],
};

// Hàm lấy tên danh mục tiếng Việt
const getCategoryName = (slug) => {
  switch (slug) {
    case 'books': return 'Sách vở';
    case 'electronics': return 'Đồ điện tử';
    case 'housing': return 'Phòng trọ';
    case 'fashion': return 'Thời trang';
    default: return 'Không xác định';
  }
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;
  const categoryName = getCategoryName(slug);
  const products = mockCategoryProducts[slug] || [];

  return (
    // Thêm div bao ngoài với padding
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Giới hạn chiều rộng nội dung */}
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Danh mục: {categoryName}</h1>

        {products.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center text-gray-500">
              Hiện chưa có sản phẩm nào trong danh mục này.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}