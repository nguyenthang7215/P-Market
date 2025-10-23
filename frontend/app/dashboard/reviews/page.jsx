'use client';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import ReviewCard from '../../../components/product/ReviewCard'; // Dùng lại ReviewCard

// Dữ liệu đánh giá giả lập (bạn đã viết)
const mockMyReviews = [
  { id: 1, author: "Bạn", rating: 5, comment: "Sản phẩm tốt, người bán nhiệt tình.", product: { title: 'Sách JavaScript' } },
  { id: 2, author: "Bạn", rating: 4, comment: "Bàn phím gõ êm.", product: { title: 'Bàn phím cơ' } },
];

export default function MyReviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Đánh giá của bạn</h1>

      {mockMyReviews.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            Bạn chưa viết đánh giá nào.
          </CardContent>
        </Card>
      ) : (
        mockMyReviews.map((review) => (
          // Dùng lại component ReviewCard nhưng thêm thông tin sản phẩm
          <Card key={review.id}>
             <CardHeader className="text-sm text-gray-600 border-b pb-2 pt-3 px-4">
                Đánh giá cho sản phẩm: <strong>{review.product.title}</strong>
             </CardHeader>
             {/* Truyền dữ liệu review vào component */}
             <ReviewCard review={review} />
          </Card>
        ))
      )}
    </div>
  );
}