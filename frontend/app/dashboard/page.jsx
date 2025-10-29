'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { getUserDashboard } from '../../lib/api';
import { 
  Shield, Gift, BadgeCheck, UserCircle, MapPin, Phone, School, 
  Save, KeyRound, Loader2 
} from 'lucide-react';
import toast from 'react-hot-toast';

// Giả lập hành động đổi thưởng
const handleRedeemReputation = () => { alert("Đã đổi 20 Green Credit lấy 10 Điểm uy tín! (Giả lập)"); };
const handleRedeemBadge = () => { alert("Đã đổi 10 Green Credit lấy Huy hiệu xanh! (Giả lập)"); };

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // --- Thông tin hồ sơ ---
  const [profileData, setProfileData] = useState({
    name: "Nguyễn Hữu Niêm",
    studentId: "B23DCCE076",
    username: "nguyenhuuniem",
    class: "D23CQCE04-B", // Cố định
    phone: "0987654321",
    address: "XOCDIA.TV"
  });

  // --- Trạng thái đổi mật khẩu ---
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  // Hàm cập nhật thông tin hồ sơ
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Hàm cập nhật mật khẩu
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields(prev => ({ ...prev, [name]: value }));
  };

  // Lưu hồ sơ
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    console.log("Đang lưu thông tin profile (giả lập):", profileData);
    setTimeout(() => {
      toast.success("Cập nhật thông tin thành công!");
      setIsSavingProfile(false);
    }, 1000);
  };

  // Đổi mật khẩu
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError('');
    setIsChangingPassword(true);

    if (passwordFields.newPassword.length < 8) {
      setPasswordError("Mật khẩu mới phải có ít nhất 8 ký tự.");
      toast.error("Mật khẩu mới phải có ít nhất 8 ký tự.");
      setIsChangingPassword(false);
      return;
    }
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      setPasswordError("Mật khẩu mới không khớp.");
      toast.error("Mật khẩu mới không khớp.");
      setIsChangingPassword(false);
      return;
    }

    setTimeout(() => {
      if (passwordFields.currentPassword !== '123456') {
        setPasswordError('Mật khẩu cũ không chính xác.');
        toast.error('Mật khẩu cũ không chính xác.');
      } else {
        toast.success('Đổi mật khẩu thành công! (Giả lập)');
        setPasswordFields({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
      setIsChangingPassword(false);
    }, 1500);
  };

  // Giả lập tải dữ liệu Dashboard
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

  if (isLoading) {
    return <div className="text-center py-10"><p>Đang tải...</p></div>;
  }

  if (!data) {
    return <div className="text-center py-10 text-red-500"><p>Lỗi tải dữ liệu.</p></div>;
  }

  return (
    <div className="space-y-6">

      {/* --- CARD PROFILE --- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCircle size={24} /> Profile
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSaveProfile}>
          <CardContent className="space-y-4 text-sm">
            {/* Họ tên và Mã SV */}
            <p><strong>Họ và Tên:</strong> {profileData.name}</p>
            <p className="flex items-center gap-2">
              <Shield size={16} /> <strong>Mã sinh viên:</strong> {profileData.studentId}
            </p>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-gray-500 mb-1">
                Username
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                value={profileData.username}
                onChange={handleProfileChange}
                className="text-sm"
              />
            </div>

            {/* Lớp (Cố định) */}
            <div>
              <label htmlFor="class" className="block text-xs font-medium text-gray-500 mb-1">
                <School size={16} className="inline mr-1" /> Lớp
              </label>
              <Input
                type="text"
                id="class"
                name="class"
                value={profileData.class}
                readOnly
                disabled
                className="text-sm bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-gray-500 mb-1">
                <Phone size={16} className="inline mr-1" /> Số điện thoại
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                className="text-sm"
              />
            </div>

            {/* Địa chỉ */}
            <div>
              <label htmlFor="address" className="block text-xs font-medium text-gray-500 mb-1">
                <MapPin size={16} className="inline mr-1" /> Địa chỉ
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                className="text-sm"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" size="sm" className="flex items-center gap-1" disabled={isSavingProfile}>
              {isSavingProfile ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {isSavingProfile ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {/* --- HẾT CARD PROFILE --- */}

      {/* --- CARD ĐỔI MẬT KHẨU --- */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound size={24} /> Đổi mật khẩu
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleChangePassword}>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Mật khẩu cũ
              </label>
              <Input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordFields.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordFields.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu mới
              </label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordFields.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {passwordError && (
              <p className="text-sm text-red-600 text-center">{passwordError}</p>
            )}
          </CardContent>

          <CardFooter>
            <Button type="submit" variant="secondary" disabled={isChangingPassword}>
              {isChangingPassword ? <Loader2 size={16} className="animate-spin mr-1" /> : null}
              {isChangingPassword ? 'Đang xử lý...' : 'Đổi mật khẩu'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {/* --- HẾT CARD ĐỔI MẬT KHẨU --- */}

      {/* --- CARD TỔNG QUAN --- */}
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

      {/* --- CARD MỜI BẠN BÈ --- */}
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

      {/* --- CARD ĐỔI GREEN CREDIT --- */}
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
