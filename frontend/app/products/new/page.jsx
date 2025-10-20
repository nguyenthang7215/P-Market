import { Container } from '../../../components/ui/Container';
import { Card, CardHeader, CardContent, CardTitle } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import ConnectWalletButton from '../../../components/blockchain/ConnectWalletButton';

export default function CreateProductPage() {
  return (
    <Container className="py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng bán sản phẩm / Cho tặng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">Tên sản phẩm</label>
              <Input id="title" placeholder="Ví dụ: Sách Giải tích 1" className="mt-1" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium">Danh mục</label>
              <Select id="category" className="mt-1">
                <option>Sách vở</option>
                <option>Đồ điện tử</option>
                <option>Phòng trọ</option>
                <option>Thời trang</option>
                <option>Cho tặng (Green Credit)</option>
              </Select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium">Mô tả</label>
              <textarea id="description" rows={4} className="w-full mt-1 p-2 border rounded-md" placeholder="Mô tả chi tiết..."></textarea>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium">Giá (VNĐ)</label>
              <Input id="price" type="number" placeholder="0" className="mt-1" />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium">Ảnh sản phẩm</label>
              <Input id="image" type="file" className="mt-1" />
            </div>
          </form>

          <div className="space-y-4">
            <h3 className="font-semibold">Bước cuối: Xác thực</h3>
            <p className="text-sm text-gray-600">
              Bạn cần đạt <strong>85 điểm uy tín</strong> và <strong>liên kết ví điện tử</strong> để đăng bài.
            </p>
            {/* Component này sẽ tự kiểm tra điểm và hiển thị logic */}
            <ConnectWalletButton requiredReputation={85} />
          </div>

          <Button className="w-full" size="lg" disabled>
            Đăng bài (Cần liên kết ví)
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}