'use client';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card'; // 3 dots
import { Button } from '../../../components/ui/Button';      // 3 dots
import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, Star } from 'lucide-react';

// Dữ liệu đơn hàng giả lập
const mockOrders = [
  { id: 'DH123', product: { productId: 1, title: 'Sách Lập trình JavaScript', imageUrl: 'https://placehold.co/100x100/e9d5ff/31343C?text=JS+Book', price: '150000.00' }, seller: 'Nguyễn Văn A', status: 'Đang giao', date: '20/10/2025' },
  { id: 'DH456', product: { productId: 2, title: 'Bàn phím cơ', imageUrl: 'https://placehold.co/100x100/bbf7d0/31343C?text=Keyboard', price: '750000.00' }, seller: 'Trần Thị B', status: 'Đã giao', date: '15/10/2025' },
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Đơn mua của bạn</h1>

      {mockOrders.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            Bạn chưa có đơn hàng nào.
          </CardContent>
        </Card>
      ) : (
        mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row justify-between items-center text-sm text-gray-600 border-b pb-3 pt-4 px-4">
              <span>Mã đơn: <strong>{order.id}</strong></span>
              <span>Ngày đặt: {order.date}</span>
              <span className={`font-semibold ${order.status === 'Đã giao' ? 'text-green-600' : 'text-orange-600'}`}>
                {order.status === 'Đang giao' ? <Truck size={16} className="inline mr-1" /> : <Package size={16} className="inline mr-1" />}
                {order.status}
              </span>
            </CardHeader>
            <CardContent className="p-4 flex items-center gap-4">
              <Image
                src={order.product.imageUrl}
                alt={order.product.title}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div className="flex-grow">
                <span className="font-semibold">{order.product.title}</span>
                <p className="text-sm text-gray-500">Người bán: {order.seller}</p>
                <p className="font-bold text-primary mt-1">
                  {Number(order.product.price).toLocaleString('vi-VN')} ₫
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {order.status === 'Đã giao' && (
                  <Link href={`/dashboard/orders/${order.id}/review`}>
                    <Button variant="outline" size="sm">
                      <Star size={16} className="mr-1"/> Đánh giá
                    </Button>
                  </Link>
                )}
                <Link href={`/dashboard/orders/${order.id}`}>
                  <Button variant="secondary" size="sm">Xem chi tiết</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}