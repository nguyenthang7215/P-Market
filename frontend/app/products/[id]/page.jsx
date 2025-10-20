import { getProductById, getReviewsByProductId } from '../../../lib/api';
import { Container } from '../../../components/ui/Container';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import ReviewCard from '../../../components/product/ReviewCard';
import { MessageSquare } from 'lucide-react';

export default async function ProductDetailPage({ params }) {
  const product = await getProductById(params.id);
  const reviews = await getReviewsByProductId(params.id);

  if (!product) return <Container><p>Không tìm thấy sản phẩm.</p></Container>;

  const imageUrl = product.imageUrl || `https://placehold.co/600x400/eee/31343C?text=${product.title}`;

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột trái: Ảnh và Mô tả */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-4">
              <img src={imageUrl} alt={product.title} className="w-full rounded-lg shadow-md object-cover" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Đánh giá sản phẩm</h2>
              <div className="space-y-4">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cột phải: Mua hàng và Người bán */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-3xl text-primary font-semibold">
                {Number(product.price) === 0 ? 'Miễn phí' : `${Number(product.price).toLocaleString('vi-VN')} ₫`}
              </p>
              <Button size="lg" className="w-full">Thêm vào giỏ hàng</Button>
              <Button size="lg" variant="outline" className="w-full flex items-center gap-2">
                <MessageSquare size={20} />
                Nhắn tin cho người bán
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <Avatar src={product.seller.avatar} />
              <div>
                <h3 className="font-semibold">{product.seller.name}</h3>
                <p className="text-sm text-gray-600">Điểm uy tín: {product.seller.reputation}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}