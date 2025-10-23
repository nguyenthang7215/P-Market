'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductById, getReviewsByProductId } from '../../../lib/api';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import ReviewCard from '../../../components/product/ReviewCard';
import { MessageSquare, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      if (params.id) {
        setIsLoading(true);
        const productData = await getProductById(params.id);
        const reviewsData = await getReviewsByProductId(params.id);
        setProduct(productData);
        setReviews(reviewsData);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  if (isLoading) { return ( <div className="py-8 text-center"><p>Đang tải...</p></div> ); }
  if (!product) { return ( <div className="py-8 text-center"><p>Không tìm thấy sản phẩm.</p></div> ); }

  const imageUrl = product.imageUrl || `https://placehold.co/600x400/eee/31343C?text=${product.title}`;
  const handleAddToCart = () => { addToCart(product); };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-2 space-y-8">
           <Card><CardContent className="p-0 overflow-hidden rounded-lg"><img src={imageUrl} alt={product.title} className="w-full h-auto object-cover aspect-video md:aspect-[16/9]" /></CardContent></Card>
           <Card><CardContent className="p-6"><h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2><p className="text-gray-700 whitespace-pre-wrap">{product.description}</p></CardContent></Card>
           <Card><CardContent className="p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">Đánh giá sản phẩm</h2><Button variant="outline" size="sm" onClick={() => alert('Chức năng đang phát triển')}><Star size={16} className="mr-2"/> Viết đánh giá</Button></div><div className="space-y-4">{reviews.length === 0 ? <p>Chưa có đánh giá.</p> : reviews.map(r => <ReviewCard key={r.id} review={r} />)}</div></CardContent></Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
           <Card className="sticky top-24 shadow-lg"><CardContent className="p-6 space-y-4"><h1 className="text-2xl font-bold leading-tight">{product.title}</h1><p className="text-3xl text-primary font-semibold">{Number(product.price) === 0 ? 'Miễn phí' : `${Number(product.price).toLocaleString('vi-VN')} ₫`}</p><Button size="lg" className="w-full flex items-center justify-center gap-2" onClick={handleAddToCart}><ShoppingCart size={20} />Thêm vào giỏ hàng</Button><Link href="/chat"><Button size="lg" variant="outline" className="w-full flex items-center justify-center gap-2"><MessageSquare size={20} />Nhắn tin</Button></Link></CardContent></Card>
           <Card><CardContent className="p-4 flex items-center gap-4"><Avatar src={product.seller.avatar} /><div><h3 className="font-semibold">{product.seller.name}</h3><p className="text-sm text-gray-600">Điểm uy tín: {product.seller.reputation}</p></div></CardContent></Card>
        </div>
      </div>
    </div>
  );
}