import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input'; // <-- Dòng import đã được thêm vào
import { getUserDashboard } from '../../lib/api';
import { Shield, Gift } from 'lucide-react'; // Đảm bảo bạn đã cài 'lucide-react'

export default async function DashboardPage() {
  // Lấy dữ liệu giả lập từ lib/api.js
  const data = await getUserDashboard();

  return (
    <div className="space-y-6">
      
      {/* Card 1: Tổng quan (Điểm uy tín & Green Credit) */}
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

      {/* Card 2: Thưởng mời bạn bè (Flow #5) */}
      <Card>
        <CardHeader>
          <CardTitle>Thưởng điểm mời bạn bè</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>Mã mời của bạn:</p>
          {/* Component Input bây giờ đã được định nghĩa */}
          <Input type="text" value="HUU-NIEM-123" readOnly className="font-mono" />
          <Button variant="secondary">Sao chép mã</Button>
          <p className="text-xs text-gray-600">
            Cả bạn và người được mời đều được cộng 5 điểm uy tín khi họ xác thực mã sinh viên.
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Đổi Green Credit (Flow #4) */}
      <Card>
        <CardHeader>
          <CardTitle>Đổi Green Credit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Đổi 20 Green Credit</h4>
              <p className="text-sm">Lấy <strong className="text-blue-600">10 Điểm Uy tín</strong></p>
            </div>
            <Button>Đổi ngay</Button>
          </div>
          <div className="p-4 border rounded-md flex justify-between items-center">
            <div>
              <h4 className="font-semibold">Đổi 10 Green Credit</h4>
              <p className="text-sm">Lấy 1 lượt Đổi huy hiệu xanh</p>
            </div>
            <Button>Đổi ngay</Button>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}