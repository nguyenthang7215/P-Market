'use client'; // Dùng client component để có thể đánh dấu đã đọc sau này
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import Link from 'next/link';
import { BellRing, Tag, Gift, Truck } from 'lucide-react'; // Icons

// Dữ liệu thông báo giả lập
const mockNotifications = [
  { id: 1, type: 'promo', title: 'Khuyến mãi cực sốc!', text: 'Giảm giá 50% cho tất cả sách giáo trình. Chỉ trong hôm nay!', time: '15 phút trước', read: false, link: '/sale' },
  { id: 2, type: 'order', title: 'Đơn hàng cập nhật', text: 'Đơn hàng DH456 của bạn đã được giao thành công.', time: '2 giờ trước', read: false, link: '/dashboard/orders/DH456' },
  { id: 3, type: 'system', title: 'Điểm thưởng Green Credit', text: 'Bạn nhận được 5 Green Credit từ việc cho tặng sản phẩm Tai nghe.', time: '1 ngày trước', read: true, link: '/dashboard/rewards' },
  { id: 4, type: 'order', title: 'Đơn hàng cập nhật', text: 'Đơn hàng DH123 đang trên đường giao đến bạn.', time: '2 ngày trước', read: true, link: '/dashboard/orders/DH123' },
];

// Hàm trả về icon dựa trên type
const getIcon = (type) => {
  switch (type) {
    case 'promo': return <Tag className="text-orange-500" />;
    case 'order': return <Truck className="text-blue-500" />;
    case 'system': return <Gift className="text-green-500" />;
    default: return <BellRing className="text-gray-500" />;
  }
};

export default function NotificationsPage() {

  // Giả lập hàm đánh dấu đã đọc
  const handleMarkAsRead = (id) => {
     alert(`Đánh dấu thông báo ${id} là đã đọc! (Giả lập)`);
     // Sau này bạn sẽ cập nhật state hoặc gọi API
  };

  return (
    // Thêm div bao ngoài với padding
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Giới hạn chiều rộng nội dung */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Thông báo</h1>

        {mockNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Bạn chưa có thông báo nào.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockNotifications.map((noti) => (
              <Card key={noti.id} className={`overflow-hidden ${!noti.read ? 'border-primary border-l-4' : 'border-gray-200'}`}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="flex-shrink-0 pt-1">
                    {getIcon(noti.type)}
                  </div>
                  <div className="flex-grow">
                    <h3 className={`font-semibold ${!noti.read ? 'text-gray-900' : 'text-gray-600'}`}>{noti.title}</h3>
                    <p className={`text-sm ${!noti.read ? 'text-gray-700' : 'text-gray-500'}`}>{noti.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{noti.time}</p>
                    <div className="mt-2 flex gap-2">
                       {noti.link && (
                         <Link href={noti.link}>
                            <Button variant="link" size="sm" className="p-0 h-auto text-primary">Xem chi tiết</Button>
                         </Link>
                       )}
                       {!noti.read && (
                          <Button variant="ghost" size="sm" className="p-0 h-auto text-gray-500" onClick={() => handleMarkAsRead(noti.id)}>
                             Đánh dấu đã đọc
                          </Button>
                       )}
                    </div>
                  </div>
                  {/* Chấm xanh nhỏ báo chưa đọc */}
                  {!noti.read && (
                     <div className="flex-shrink-0 w-2.5 h-2.5 bg-primary rounded-full mt-1.5"></div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}