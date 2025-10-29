'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProductById, getReviewsByProductId } from '../../../lib/api';
import { Button } from '../../../components/ui/Button';
import { Card, CardContent } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import ReviewCard from '../../../components/product/ReviewCard';
import { ShoppingCart, Star, ShieldCheck, Handshake } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { useWallet } from '../../../context/WalletContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { isConnected, connectWallet } = useWallet();

  // --- Fetch dữ liệu ---
  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      if (params.id) {
        setIsLoading(true);
        try {
          const productData = await getProductById(params.id);
          const reviewsData = await getReviewsByProductId(params.id);
          if (isMounted) {
            setProduct(productData);
            setReviews(reviewsData);
          }
        } catch (error) {
          console.error("Lỗi khi tải chi tiết sản phẩm:", error);
          if (isMounted) setProduct(null);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => { isMounted = false; };
  }, [params.id]);

  // --- Các handler ---
  const handleWriteReview = () => alert("Chức năng đánh giá sẽ có sau khi mua hàng thành công!");
  const handleAddToCart = () => { if (product) addToCart(product); };
  const handleDirectPurchase = () => router.push('/chat');
  const handleEscrowPurchase = async () => {
    if (!isConnected) {
      alert("Vui lòng kết nối ví để sử dụng Mua an toàn!");
      await connectWallet();
      return;
    }
    alert(`Đang tiến hành Mua an toàn (Ký quỹ Escrow) cho sản phẩm ${product.title}... (Giả lập)`);
  };

  // --- Loading Skeleton ---
  if (isLoading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Cột trái */}
          <div className="lg:col-span-2 space-y-8">
            <Card><CardContent className="p-0"><Skeleton height={400} /></CardContent></Card>
            <Card><CardContent className="p-6"><Skeleton count={4} /></CardContent></Card>
            <Card><CardContent className="p-6"><Skeleton height={30} width="60%" style={{ marginBottom: '1rem' }}/><Skeleton count={2} height={80}/></CardContent></Card>
            <Card><CardContent className="p-4"><Skeleton circle height={40} width={40} inline style={{ marginRight: '1rem' }}/><Skeleton width="150px"/></CardContent></Card>
          </div>
          {/* Cột phải */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="sticky top-24"><CardContent className="p-6 space-y-4">
              <Skeleton height={30} width="70%" />
              <Skeleton height={40} width="40%" />
              <Skeleton height={48} />
              <Skeleton height={48} />
              <Skeleton height={48} />
            </CardContent></Card>
          </div>
        </div>
      </div>
    );
  }

  // --- Không tìm thấy sản phẩm ---
  if (!product) {
    return (
      <div className="py-8 text-center">
        <p>Không tìm thấy sản phẩm.</p>
      </div>
    );
  }

  // --- Nội dung chính ---
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* === Cột Trái === */}
        <div className="lg:col-span-2 space-y-8">
          {/* Ảnh sản phẩm */}
          <Card>
            <CardContent className="p-0 overflow-hidden rounded-lg">
              <img
                src={product.imageUrl || `https://placehold.co/600x400/eee/31343C?text=${product.title}`}
                alt={product.title}
                className="w-full h-auto object-cover aspect-video md:aspect-[16/9]"
              />
            </CardContent>
          </Card>

          {/* Mô tả */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
            </CardContent>
          </Card>

          {/* Đánh giá */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Đánh giá sản phẩm</h2>
                <Button variant="outline" size="sm" onClick={handleWriteReview}>
                  <Star size={16} className="mr-2" /> Viết đánh giá
                </Button>
              </div>
              <div className="space-y-4">
                {reviews.length === 0
                  ? (<p className="text-gray-600">Chưa có đánh giá.</p>)
                  : (reviews.map((review) => (<ReviewCard key={review.id} review={review} />)))}
              </div>
            </CardContent>
          </Card>

          {/* --- Thông tin người bán (đã chuyển về cột trái) --- */}
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar src={product.seller?.avatar} />
              <div>
                <h3 className="font-semibold">{product.seller?.name || 'Người bán ẩn danh'}</h3>
                <p className="text-sm text-gray-600">
                  Điểm uy tín: {product.seller?.reputation ?? 'Chưa có'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* === Cột Phải (Chỉ chứa phần mua hàng) === */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-24 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>
              <p className="text-3xl text-primary font-semibold">
                {Number(product.price) === 0
                  ? 'Miễn phí'
                  : `${Number(product.price).toLocaleString('vi-VN')} ₫`}
              </p>

              <Button
                size="lg"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 focus:ring-green-500"
                onClick={handleEscrowPurchase}
              >
                <ShieldCheck size={20} /> Mua an toàn (Ký quỹ Escrow)
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleDirectPurchase}
              >
                <Handshake size={20} /> Mua trực tiếp (Liên hệ)
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} /> Thêm vào giỏ hàng
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
