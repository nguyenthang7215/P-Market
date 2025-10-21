'use client'; // <-- BƯỚC 1: Chuyển thành Client Component

import { useState, useEffect } from 'react'; // <-- BƯỚC 2: Import hooks
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { getUserDashboard } from '../../lib/api';
import { Shield, Gift, BadgeCheck } from 'lucide-react';

// Các hàm này giờ đã nằm trong Client Component nên hợp lệ
const handleRedeemReputation = () => {
  alert("Đã đổi 20 Green Credit lấy 10 Điểm uy tín! (Giả lập)");
};
const handleRedeemBadge = () => {
  alert("Đã đổi 10 Green Credit lấy Huy hiệu xanh! (Giả lập)");
};

export default function DashboardPage() {
  // BƯỚC 3: Dùng state để lưu dữ liệu và trạng thái tải
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // BƯỚC 4: Dùng useEffect để fetch dữ liệu khi component được render
  useEffect(() => {
    async function loadData() {
      const dashboardData = await getUserDashboard();
      setData(dashboardData);
      setIsLoading(false);
    }
    loadData();
  }, []); // Mảng rỗng [] đảm bảo hàm này chỉ chạy 1 lần duy nhất

  // BƯỚC 5: Xử lý trạng thái đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="text-center text-gray-500">
        <p>Đang tải dữ liệu trang cá nhân...</p>
      </div>
    );
  }
  
  // BƯỚC 6: Xử lý nếu không có dữ liệu
  if (!data) {
    return (
      <div className="text-center text-red-500">
        <p>Không thể tải được dữ liệu. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  // BƯỚC 7: Trả về giao diện khi đã có dữ liệu.
  // Code JSX này giữ nguyên, nhưng bây giờ nó đã an toàn vì nằm trong Client Component.
  return (
    <div className="space-y-6">
      
      {/* Card 1: Tổng quan */}
      <Card>
        <CardHeader>
          <CardTitle>Tổng quan</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-4">
            <Shield size={40} className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Điểm uy tín của bạn</p>
              <p className="text-3xl font-bold">{data.reputation}</p>
            </div>
          </div>
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg flex items-center gap-4">
            <Gift size={40} className="text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Green Credit</p>
              <p className="text-3xl font-bold">{data.greenCredit}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Thưởng mời bạn bè */}
      <Card>
        <CardHeader>
          <CardTitle>Thưởng điểm mời bạn bè</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>Mã mời của bạn:</p>
          <Input type="text" value="HUU-NIEM-123" readOnly className="font-mono" />
          <Button variant="secondary">Sao chép mã</Button>
          <p className="text-xs text-gray-600">
            Cả bạn và người được mời đều được cộng 5 điểm uy tín khi họ xác thực mã sinh viên.
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Đổi Green Credit */}
      <Card>
        <CardHeader>
          <CardTitle>Đổi thưởng Green Credit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Lựa chọn 1: Đổi điểm uy tín */}
          <div className="p-4 border rounded-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield size={32} className="text-blue-500" />
              <div>
                <h4 className="font-semibold">Đổi điểm uy tín</h4>
                <p className="text-sm text-gray-600">
                  <strong className="text-green-600">20 Green Credit</strong> = <strong className="text-blue-600">10 Điểm Uy tín</strong>
                </p>
              </div>
            </div>
            {/* Các nút này bây giờ đã hợp lệ */}
            <Button onClick={handleRedeemReputation} disabled={data.greenCredit < 20}>
              Đổi
            </Button>
          </div>

          {/* Lựa chọn 2: Đổi huy hiệu xanh */}
          <div className="p-4 border rounded-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BadgeCheck size={32} className="text-green-500" />
              <div>
                <h4 className="font-semibold">Đổi huy hiệu xanh</h4>
                <p className="text-sm text-gray-600">
                  <strong className="text-green-600">10 Green Credit</strong> = Huy hiệu (1 tuần)
                </p>
              </div>
            </div>
            <Button onClick={handleRedeemBadge} disabled={data.greenCredit < 10}>
              Đổi
            </Button>
          </div>
          
        </CardContent>
      </Card>
      
    </div>
  );
}

