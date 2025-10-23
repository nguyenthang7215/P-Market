'use client';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/Card'; // 4 dots
import { Button } from '../../../../components/ui/Button';      // 4 dots
import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, User, MapPin, CreditCard, Star, MessageSquare } from 'lucide-react';

const getMockOrderDetail = (id) => {
  if (id === 'DH123') return { id: 'DH123', product: { productId: 1, title: 'Sách Lập trình JavaScript', imageUrl: 'https://placehold.co/100x100/e9d5ff/31343C?text=JS+Book', price: '150000.00', quantity: 1 }, seller: 'Nguyễn Văn A', status: 'Đang giao', date: '20/10/2025', address: 'KTX Khu 1, PTIT HCM', payment: 'Thanh toán khi nhận hàng', total: '150000.00' };
  if (id === 'DH456') return { id: 'DH456', product: { productId: 2, title: 'Bàn phím cơ', imageUrl: 'https://placehold.co/100x100/bbf7d0/31343C?text=Keyboard', price: '750000.00', quantity: 1 }, seller: 'Trần Thị B', status: 'Đã giao', date: '15/10/2025', address: 'KTX Khu 2, PTIT HCM', payment: 'Ví điện tử', total: '750000.00' };
  return null;
};

export default function OrderDetailPage() {
  const params = useParams();
  const order = getMockOrderDetail(params.id);

  if (!order) return <p>Không tìm thấy đơn hàng.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Chi tiết đơn hàng: {order.id}</h1>
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2">{order.status === 'Đang giao' ? <Truck size={20} className="text-orange-600"/> : <Package size={20} className="text-green-600"/>} Thông tin Vận chuyển ({order.status})</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
           <p className="flex items-center gap-2"><User size={16} /> Người nhận: Nguyễn Hữu Niêm</p>
           <p className="flex items-center gap-2"><MapPin size={16} /> Địa chỉ: {order.address}</p>
        </CardContent>
      </Card>
      <Card>
         <CardHeader><CardTitle className="text-lg">Sản phẩm</CardTitle></CardHeader>
         <CardContent className="p-4 flex items-center gap-4">
            <Image src={order.product.imageUrl} alt={order.product.title} width={80} height={80} className="rounded-md object-cover"/>
            <div className="flex-grow">
              <Link href={`/products/${order.product.productId}`} className="font-semibold hover:text-primary">{order.product.title}</Link>
              <p className="text-sm text-gray-500">Người bán: {order.seller}</p>
              <p className="text-sm">Số lượng: {order.product.quantity}</p>
            </div>
            <p className="font-bold text-primary">{Number(order.product.price).toLocaleString('vi-VN')} ₫</p>
         </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CreditCard size={20} /> Thanh toán</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
           <p>Phương thức: {order.payment}</p>
           <div className="flex justify-between font-semibold pt-2 border-t"><span>Tổng cộng:</span><span>{Number(order.total).toLocaleString('vi-VN')} ₫</span></div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-2">
         {order.status === 'Đã giao' && (<Link href={`/dashboard/orders/${order.id}/review`}><Button variant="outline"><Star size={16} className="mr-1"/> Viết đánh giá</Button></Link>)}
         <Link href="/chat"><Button variant="secondary" className="flex items-center gap-1"><MessageSquare size={16} /> Liên hệ người bán</Button></Link>
      </div>
    </div>
  );
}