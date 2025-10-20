'use client';
import { useState } from 'react';
import { Container } from '../../../components/ui/Container';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea'; // <-- Dùng component mới
import { Button } from '../../../components/ui/Button';
import ConnectWalletButton from '../../../components/blockchain/ConnectWalletButton'; // <-- Dùng component Blockchain

export default function CreateProductPage() {
  const [isWalletLinked, setIsWalletLinked] = useState(false); // Giả lập trạng thái ví

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic khi nhấn Đăng bài (Flow: Trả phí, Ghi hash...)
    alert('Đăng bài thành công! (Giả lập)');
  };

  return (
    <Container className="py-8">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Đăng bán sản phẩm / Cho tặng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Phần 1: Điền thông tin (theo Flow) */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">Tên sản phẩm</label>
                <Input id="title" placeholder="Ví dụ: Sách Giải tích 1" className="mt-1" required />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium">Danh mục</label>
                <Select id="category" className="mt-1">
                  <option>Sách vở</option>
                  <option>Đồ điện tử</option>
                  <option>Phòng trọ</option>
                  <option>Thời trang</option>
                  <option value="free">Cho tặng (Nhận Green Credit)</option>
                </Select>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium">Mô tả</label>
                <Textarea id="description" placeholder="Mô tả chi tiết tình trạng,..." className="mt-1" />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium">Giá (VNĐ) (Ghi 0 nếu cho tặng)</label>
                <Input id="price" type="number" placeholder="0" className="mt-1" required />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium">Ảnh sản phẩm</label>
                <Input id="image" type="file" className="mt-1" />
              </div>
            </div>

            <hr />

            {/* Phần 2: Xác thực (theo Flow) */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Bước cuối: Xác thực</h3>
              <p className="text-sm text-gray-600">
                Bạn cần đạt <strong>85 điểm uy tín</strong> và <strong>liên kết ví</strong> để đăng bài.
              </p>
              
              {/* Component này tự xử lý logic kiểm tra điểm và ví */}
              <ConnectWalletButton requiredReputation={85} />
            </div>

          </CardContent>
          <CardFooter>
            {/* Nút "Đăng bài" sẽ bị vô hiệu hóa nếu chưa liên kết ví
              (Chúng ta sẽ thêm logic isWalletLinked sau, giờ cứ để 'false') 
            */}
            <Button type="submit" className="w-full" size="lg" disabled={!isWalletLinked}>
              {isWalletLinked ? 'Đăng bài & Trả phí' : 'Vui lòng liên kết ví'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}