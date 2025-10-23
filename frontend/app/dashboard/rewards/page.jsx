'use client';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Shield, Gift, BadgeCheck, History } from 'lucide-react'; // Thêm icon History

// Giả lập điểm và hàm đổi
const currentGreenCredit = 20;
const handleRedeemReputation = () => alert("Đổi điểm uy tín thành công!");
const handleRedeemBadge = () => alert("Đổi huy hiệu thành công!");

export default function GreenCreditPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Green Credit</h1>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
          <History size={16}/> Lịch sử điểm
        </Button>
      </div>

      {/* Hiển thị điểm hiện có */}
      <Card>
        <CardContent className="p-6">
          <div className="p-6 bg-green-50 border border-green-200 rounded-lg flex items-center gap-4 justify-center">
            <Gift size={40} className="text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Green Credit hiện có</p>
              <p className="text-3xl font-bold">{currentGreenCredit}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phần đổi thưởng (Giống DashboardPage) */}
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
            <Button variant="primary" onClick={handleRedeemReputation} disabled={currentGreenCredit < 20}>
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
            <Button variant="primary" onClick={handleRedeemBadge} disabled={currentGreenCredit < 10}>
              Đổi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}