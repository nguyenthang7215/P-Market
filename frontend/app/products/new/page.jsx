'use client';
import { useState, useEffect } from 'react';
import { Container } from '../../../components/ui/Container'; // Assuming Container exists and is needed
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { Button } from '../../../components/ui/Button';
import ConnectWalletButton from '../../../components/blockchain/ConnectWalletButton';
import { useWallet } from '../../../context/WalletContext';
import { Leaf, UploadCloud, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function CreateProductPage() {
  const { isConnected } = useWallet();
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('books');
  const [condition, setCondition] = useState('Mới (Chưa sử dụng)');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { /* ... (set price to 0 if category is 'free') ... */ }, [category]);

  // --- Validation ---
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Tên sản phẩm không được để trống.';
    if (!price.trim()) newErrors.price = 'Giá không được để trống.';
    else if (isNaN(Number(price)) || Number(price) < 0) newErrors.price = 'Giá phải là số không âm.';
    if (!quantity.trim()) newErrors.quantity = 'Số lượng không được để trống.';
    else if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) newErrors.quantity = 'Số lượng phải là số nguyên dương.';
    if (description.trim().length > 0 && description.trim().length < 10) newErrors.description = 'Mô tả nên dài ít nhất 10 ký tự.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting post (simulated):', { title, category, condition, description, price, quantity });
      toast.success('Đăng bài thành công!');
      setIsSubmitting(false);
      router.push('/home'); // Redirect to home after success
    }, 1500); // 1.5 second delay
  };

  return (
    // Assuming you want Container here based on previous requests
    <Container className="py-8">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader><CardTitle>Đăng bán / Cho tặng</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title">Tên sản phẩm</label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={`mt-1 ${errors.title ? 'border-red-500' : ''}`} />
                {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
              </div>
              {/* Category & Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div><label htmlFor="category">Danh mục</label><Select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1">...</Select></div>
                 <div><label htmlFor="condition">Tình trạng</label><Select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} className="mt-1">...</Select></div>
              </div>
              {/* Green Credit Notice */}
              {category === 'free' && ( <div className="p-3 bg-green-50 ..."><Leaf size={20} />...</div> )}
              {/* Description */}
              <div>
                <label htmlFor="description">Mô tả</label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className={`mt-1 ${errors.description ? 'border-red-500' : ''}`} />
                 {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
              </div>
              {/* Price & Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="price">Giá (VNĐ)</label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} readOnly={category === 'free'} className={`mt-1 ${errors.price ? 'border-red-500' : ''}`} />
                    {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
                 </div>
                 <div>
                    <label htmlFor="quantity">Số lượng</label>
                    <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className={`mt-1 ${errors.quantity ? 'border-red-500' : ''}`} />
                     {errors.quantity && <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>}
                 </div>
              </div>
              {/* Image Upload */}
              <div> {/* ... (Image upload UI) ... */} </div>
            </div>
            <hr />
            {/* Wallet Connection */}
            <div className="space-y-4"> {/* ... (ConnectWalletButton) ... */} </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" size="lg" disabled={!isConnected || isSubmitting}>
               {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20}/> : null}
               {isSubmitting ? 'Đang đăng...' : (isConnected ? 'Hoàn tất & Đăng bài' : 'Đăng bài (Cần liên kết ví)')}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}