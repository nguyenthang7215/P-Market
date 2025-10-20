'use client';
import { Container } from '../../components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../context/CartContext'; // Import hook giỏ hàng
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react'; // Icon xóa

export default function CartPage() {
  const { cartItems, removeFromCart, itemCount } = useCart();

  // Tính tổng tiền (ví dụ đơn giản)
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn ({itemCount})</h1>
      
      {itemCount === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-600">
            <p>Giỏ hàng của bạn đang trống.</p>
            <Link href="/home">
              <Button variant="link" className="mt-4">Tiếp tục mua sắm</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái: Danh sách sản phẩm */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 flex items-center gap-4">
                  <Image 
                    src={item.imageUrl || `https://placehold.co/100x100/eee/31343C?text=${item.title}`} 
                    alt={item.title} 
                    width={80} 
                    height={80} 
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                    <p className="font-bold text-primary">
                      {Number(item.price) === 0 ? 'Miễn phí' : `${Number(item.price).toLocaleString('vi-VN')} ₫`}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cột phải: Tổng tiền */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Tạm tính ({itemCount} sản phẩm)</span>
                  <span className="font-semibold">{totalPrice.toLocaleString('vi-VN')} ₫</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span>{totalPrice.toLocaleString('vi-VN')} ₫</span>
                </div>
                <Button size="lg" className="w-full">
                  Tiến hành đặt hàng (Giả lập)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
}