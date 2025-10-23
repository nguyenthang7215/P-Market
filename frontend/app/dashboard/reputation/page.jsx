'use client';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Shield, History, Info } from 'lucide-react';

// Giả lập điểm
const currentReputation = 85;

export default function ReputationPage() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Điểm Uy Tín</h1>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
          <History size={16}/> Lịch sử điểm
        </Button>
      </div>

       {/* Hiển thị điểm hiện có */}
      <Card>
        <CardContent className="p-6">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-4 justify-center">
            <Shield size={40} className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Điểm uy tín hiện tại</p>
              <p className="text-3xl font-bold">{currentReputation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Giải thích về điểm uy tín */}
      <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2"><Info size={20}/> Cách tính điểm uy tín</CardTitle>
         </CardHeader>
         <CardContent className="space-y-2 text-sm text-gray-700">
            <p>✅ <strong>+5 điểm:</strong> Mời bạn bè thành công (cả 2).</p>
            <p>✅ <strong>+5 điểm:</strong> Nhận đánh giá "Hài lòng" từ người mua.</p>
            <p>❌ <strong>-10 điểm:</strong> Nhận đánh giá "Không hài lòng" (Sản phẩm không đúng mô tả).</p>
            <p>❌ <strong>-10 điểm:</strong> Đưa ra nhận xét không đúng sự thật.</p>
            <p className="mt-4 font-semibold">⚠️ Cần tối thiểu 85 điểm để đăng bài!</p>
         </CardContent>
      </Card>
    </div>
  );
}