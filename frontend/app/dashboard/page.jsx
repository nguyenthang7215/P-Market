'use client'; 

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { getUserDashboard } from '../../lib/api';
import { Shield, Gift, BadgeCheck, UserCircle, MapPin, Phone, School, Save } from 'lucide-react';

const handleRedeemReputation = () => { alert("Đã đổi 20 Green Credit lấy 10 Điểm uy tín! (Giả lập)"); };
const handleRedeemBadge = () => { alert("Đã đổi 10 Green Credit lấy Huy hiệu xanh! (Giả lập)"); };

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- State cho thông tin Profile ---
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Hữu Niêm",
    studentId: "B23DCCE076",
    class: "D23CQCN01-B", // Lớp cố định
    phone: "0987654321", // Có thể sửa
    address: "KTX Khu 2, PTIT HCM" // Có thể sửa
  });

  // Hàm cập nhật state khi người dùng gõ
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý khi nhấn nút Lưu
  const handleSaveProfile = (e) => {
     e.preventDefault(); 
     console.log("Đang lưu thông tin profile (giả lập):", profileData);
     alert("Lưu thông tin thành công! (Giả lập)");
     // (Sau này gọi API backend)
  };
  // ---

  useEffect(() => {
    async function loadData() {
      try { 
        const dashboardData = await getUserDashboard();
        setData(dashboardData);
      } catch (error) {
        console.error("Lỗi tải dữ liệu dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) { return <div className="text-center py-10"><p>Đang tải...</p></div>; }
  if (!data) { return <div className="text-center py-10 text-red-500"><p>Lỗi tải dữ liệu.</p></div>; }

  return (
    <div className="space-y-6">

      {/* --- CARD PROFILE ĐÃ SỬA --- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
             <UserCircle size={24} /> Profile
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSaveProfile}>
          <CardContent className="space-y-4 text-sm">
            {/* Tên (Hiển thị) */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Họ và Tên</label>
              <p className="font-semibold text-base">{profileData.name}</p> 
            </div>
            
            {/* Mã sinh viên (Hiển thị) */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Mã sinh viên</label>
              <p className="flex items-center gap-2 text-base">
                <Shield size={16} className="text-gray-500"/>
                {profileData.studentId}
              </p>
            </div>

            {/* --- LỚP (HIỂN THỊ CỐ ĐỊNH) --- */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Lớp</label>
              <p className="flex items-center gap-2 text-base">
                 <School size={16} className="text-gray-500"/>
                 {profileData.class} 
              </p>
            </div>
            {/* --- HẾT PHẦN LỚP --- */}

            {/* Số điện thoại (Input) */}
             <div>
              <label htmlFor="phone" className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                 <Phone size={16} /> Số điện thoại
              </label>
              <Input
                type="tel" 
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                placeholder="Nhập số điện thoại"
                className="text-sm"
              />
            </div>

            {/* Địa chỉ (Input) */}
            <div>
              <label htmlFor="address" className="block text-xs font-medium text-gray-500 mb-1 flex items-center gap-1">
                 <MapPin size={16} /> Địa chỉ
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                placeholder="Nhập địa chỉ của bạn"
                className="text-sm"
              />
            </div>
          </CardContent>
          {/* Nút Lưu thay đổi */}
          <CardFooter>
             <Button type="submit" size="sm" className="flex items-center gap-1">
               <Save size={16} /> Lưu thay đổi
             </Button>
          </CardFooter>
        </form>
      </Card>
      {/* --- HẾT CARD PROFILE --- */}
      
      {/* Card 1: Tổng quan (Giữ nguyên) */}
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

      {/* Card 2: Thưởng mời bạn bè (Giữ nguyên) */}
      <Card>
         <CardHeader>
           <CardTitle>Thưởng điểm mời bạn bè</CardTitle>
         </CardHeader>
         <CardContent className="space-y-3">
           <p>Mã mời của bạn:</p>
           <Input type="text" value="HUU-NIEM-123" readOnly className="font-mono bg-gray-100" />
           <Button variant="secondary">Sao chép mã</Button>
           <p className="text-xs text-gray-600">
             Cả bạn và người được mời đều được cộng 5 điểm uy tín khi họ xác thực mã sinh viên.
           </p>
         </CardContent>
      </Card>

      {/* Card 3: Đổi Green Credit (Giữ nguyên) */}
      <Card>
         <CardHeader>
           <CardTitle>Đổi thưởng Green Credit</CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
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
             <Button variant="primary" onClick={handleRedeemReputation} disabled={data.greenCredit < 20}>Đổi</Button>
           </div>
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
             <Button variant="primary" onClick={handleRedeemBadge} disabled={data.greenCredit < 10}>Đổi</Button>
           </div>
         </CardContent>
      </Card>
      
    </div>
  );
}