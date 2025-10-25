'use client'; 

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // <-- 1. Import useRouter
import Link from 'next/link';
import { getProductById, getReviewsByProductId } from '../../../lib/api';
// Đảm bảo các đường dẫn import component UI đúng
import { Container } from '../../../components/ui/Container'; // Kiểm tra lại nếu đã xóa Container
import { Button } from '../../../components/ui/Button';      
import { Card, CardContent } from '../../../components/ui/Card'; 
import { Avatar } from '../../../components/ui/Avatar';       
import ReviewCard from '../../../components/product/ReviewCard'; 
import { MessageSquare, ShoppingCart, Star, ShieldCheck, Handshake } from 'lucide-react';
import { useCart } from '../../../context/CartContext';       
import { useWallet } from '../../../context/WalletContext'; 

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter(); // <-- 2. Khởi tạo router
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const { isConnected, connectWallet } = useWallet();

  useEffect(() => {
    async function fetchData() {
      if (params.id) {
        setIsLoading(true);
        try { 
          const productData = await getProductById(params.id);
          const reviewsData = await getReviewsByProductId(params.id);
          setProduct(productData);
          setReviews(reviewsData);
        } catch (error) {
          console.error("Lỗi khi tải chi tiết sản phẩm:", error);
          setProduct(null); 
        } finally {
          setIsLoading(false);
        }
      } else {
         setIsLoading(false); 
         setProduct(null);
      }
    }
    fetchData();
  }, [params.id]);

  const handleWriteReview = () => { alert("Chức năng đánh giá sẽ có sau khi mua hàng thành công!"); };
  const handleAddToCart = () => { if (product) addToCart(product); };
  
  // Hàm này bây giờ đã có thể dùng router
  const handleDirectPurchase = () => { 
    router.push('/chat'); 
  }; 
  
  const handleEscrowPurchase = async () => {
    if (!isConnected) {
      alert("Vui lòng kết nối ví để sử dụng Mua an toàn!");
      await connectWallet(); 
      return;
    }
    alert(`Đang tiến hành Mua an toàn (Ký quỹ Escrow) cho sản phẩm ${product.title}... (Giả lập)`);
  };

  // Kiểm tra trạng thái loading
  if (isLoading) {
    // Nếu bạn đã xóa Container, dùng div thay thế
    return ( <div className="py-8 text-center"><p>Đang tải...</p></div> ); 
  }

  // Kiểm tra nếu không tìm thấy sản phẩm
  if (!product) {
    // Nếu bạn đã xóa Container, dùng div thay thế
    return ( <div className="py-8 text-center"><p>Không tìm thấy sản phẩm.</p></div> );
  }

  // --- RETURN CHÍNH ---
  return (
    // Nếu đã xóa Container ở layout, thêm div padding ở đây
    <div className="py-8 px-4 sm:px-6 lg:px-8"> 
      {/* Giới hạn chiều rộng nội dung nếu muốn */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"> 
        
        {/* === Cột Trái: Ảnh, Mô tả, Đánh giá === */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-0 overflow-hidden rounded-lg">
              {/* Định nghĩa imageUrl và hiển thị ảnh */}
              {(() => {
                 const imageUrl = product.imageUrl || `https://placehold.co/600x400/eee/31343C?text=${product.title}`;
                 return <img src={imageUrl} alt={product.title} className="w-full h-auto object-cover aspect-video md:aspect-[16/9]" />;
              })()}
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
               <div className="flex justify-between items-center mb-4">
                 <h2 className="text-2xl font-bold">Đánh giá sản phẩm</h2>
                 <Button variant="outline" size="sm" onClick={handleWriteReview}><Star size={16} className="mr-2"/> Viết đánh giá</Button>
               </div>
               <div className="space-y-4">
                {reviews.length === 0 ? (<p className="text-gray-600">Chưa có đánh giá.</p>) : (reviews.map(review => (<ReviewCard key={review.id} review={review} />)))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* === Cột Phải: Mua hàng, Người bán === */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="sticky top-24 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>
              <p className="text-3xl text-primary font-semibold">
                {Number(product.price) === 0 ? 'Miễn phí' : `${Number(product.price).toLocaleString('vi-VN')} ₫`}
              </p>
              
              {/* Các nút mua hàng */}
              <Button size="lg" className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 focus:ring-green-500" onClick={handleEscrowPurchase}>
                <ShieldCheck size={20} /> Mua an toàn (Ký quỹ Escrow)
              </Button>
              <Button size="lg" variant="secondary" className="w-full flex items-center justify-center gap-2" onClick={handleDirectPurchase}>
                <Handshake size={20} /> Mua trực tiếp (Liên hệ)
              </Button>
              <Button size="lg" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleAddToCart}>
                 <ShoppingCart size={20} /> Thêm vào giỏ hàng
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <Avatar src={product.seller.avatar} />
              <div>
                <h3 className="font-semibold">{product.seller.name}</h3>
                <p className="text-sm text-gray-600">Điểm uy tín: {product.seller.reputation}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
  );
}