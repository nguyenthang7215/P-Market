'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../../components/ui/Card'; // 5 dots
import { Button } from '../../../../../components/ui/Button';      // 5 dots
import { Textarea } from '../../../../../components/ui/Textarea';   // 5 dots
import { Select } from '../../../../../components/ui/Select';      // 5 dots
import Image from 'next/image';
import { Star } from 'lucide-react';

const getMockProductForReview = (orderId) => {
  if (orderId === 'DH456') return { id: 2, title: 'Bàn phím cơ', imageUrl: 'https://placehold.co/100x100/bbf7d0/31343C?text=Keyboard' };
  return null;
};

export default function ReviewPage() {
  const params = useParams();
  const router = useRouter();
  const product = getMockProductForReview(params.id);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Đang gửi đánh giá:", { orderId: params.id, rating, comment });
    setTimeout(() => {
      alert("Gửi đánh giá thành công!");
      router.push('/dashboard/orders');
    }, 1000);
  };

  if (!product) return <p>Đơn hàng không hợp lệ hoặc đã đánh giá.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Viết đánh giá cho sản phẩm</h1>
      <form onSubmit={handleSubmitReview}>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 border-b pb-4">
             <Image src={product.imageUrl} alt={product.title} width={60} height={60} className="rounded-md object-cover"/>
             <CardTitle className="text-lg">{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium mb-1">Mức độ hài lòng?</label>
              <Select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value={5}>⭐⭐⭐⭐⭐ Rất hài lòng</option>
                <option value={4}>⭐⭐⭐⭐ Hài lòng</option>
                <option value={3}>⭐⭐⭐ Bình thường</option>
                <option value={2}>⭐⭐ Không hài lòng</option>
                <option value={1}>⭐ Rất không hài lòng</option>
              </Select>
            </div>
            <div>
               <label htmlFor="comment" className="block text-sm font-medium mb-1">Viết bình luận</label>
               <Textarea id="comment" placeholder="Chia sẻ cảm nhận..." value={comment} onChange={(e) => setComment(e.target.value)} rows={5} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}