'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';
import ConnectWalletButton from '../../../components/blockchain/ConnectWalletButton';
import { useWallet } from '../../../context/WalletContext';
import { Leaf, UploadCloud } from 'lucide-react';

export default function CreateProductPage() {
  const { isConnected } = useWallet();
  const [category, setCategory] = useState('books');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (category === 'free') {
      setPrice('0');
    }
  }, [category]);

  const handleSubmit = (e) => { e.preventDefault(); alert('Đăng bài thành công! (Giả lập)'); };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader><CardTitle className="text-2xl">Đăng bán sản phẩm / Cho tặng</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div><label htmlFor="title" className="block text-sm font-medium">Tên sản phẩm</label><Input id="title" placeholder="Ví dụ: Sách Giải tích 1" className="mt-1" required /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label htmlFor="category" className="block text-sm font-medium">Danh mục</label><Select id="category" className="mt-1" value={category} onChange={(e) => setCategory(e.target.value)}><option value="books">Sách vở</option><option value="electronics">Đồ điện tử</option><option value="housing">Phòng trọ</option><option value="fashion">Thời trang</option><option value="free">Cho tặng (Nhận Green Credit)</option></Select></div>
                <div><label htmlFor="condition" className="block text-sm font-medium">Tình trạng</label><Select id="condition" className="mt-1"><option>Mới</option><option>Như mới</option><option>Tốt</option><option>Có lỗi nhỏ</option></Select></div>
              </div>
              {category === 'free' && (<div className="p-3 bg-green-50 border-green-200 rounded-md flex items-center gap-3 text-green-800"><Leaf size={20} /><p className="text-sm font-medium">Bạn sẽ được cộng <strong>5 Green Credit</strong> khi đăng bài này.</p></div>)}
              <div><label htmlFor="description" className="block text-sm font-medium">Mô tả chi tiết</label><Textarea id="description" placeholder="Mô tả chi tiết tình trạng, ngoại hình, lỗi (nếu có)..." className="mt-1" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label htmlFor="price" className="block text-sm font-medium">Giá (VNĐ)</label><Input id="price" type="number" placeholder="0" className="mt-1" value={price} onChange={(e) => setPrice(e.target.value)} readOnly={category === 'free'} required /></div>
                <div><label htmlFor="quantity" className="block text-sm font-medium">Số lượng</label><Input id="quantity" type="number" defaultValue="1" className="mt-1" required /></div>
              </div>
              <div><label htmlFor="image" className="block text-sm font-medium">Đăng hình ảnh</label><div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"><div className="space-y-1 text-center"><UploadCloud className="mx-auto h-12 w-12 text-gray-400" /><div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none"><span>Tải lên một file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" multiple /></label><p className="pl-1">hoặc kéo và thả</p></div><p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p></div></div></div>
            </div>
            <hr />
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Bước cuối: Xác thực</h3>
              <p className="text-sm text-gray-600">Bạn cần đạt <strong>85 điểm uy tín</strong> và <strong>liên kết ví</strong> để đăng bài.</p>
              <ConnectWalletButton requiredReputation={85} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" size="lg" disabled={!isConnected}>{isConnected ? 'Hoàn tất & Đăng bài' : 'Đăng bài (Cần liên kết ví)'}</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}