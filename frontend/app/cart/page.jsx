'use client';
import { Container } from '../../components/ui/Container';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input'; // Need Input for direct quantity edit (optional)
import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, itemCount, updateQuantity } = useCart(); // Get updateQuantity

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleCheckout = () => {
    alert(`Tiến hành đặt hàng với tổng tiền: ${totalPrice.toLocaleString('vi-VN')} ₫ (Giả lập)`);
  };

  // Handle direct quantity input change (optional)
  const handleQuantityChange = (itemId, event) => {
      const newQuantity = parseInt(event.target.value, 10);
      if (!isNaN(newQuantity)) {
          updateQuantity(itemId, newQuantity);
      }
  };


  return (
    // Use padding directly if Container was removed from layout
    <div className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Optional: Add max-width wrapper if needed */}
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn ({itemCount})</h1>

            {itemCount === 0 ? (
                <Card>
                    <CardContent className="p-10 text-center text-gray-600">
                         {/* ... (Empty cart SVG and message) ... */}
                        <p className="text-lg mb-4">Giỏ hàng của bạn đang trống.</p>
                        <Link href="/home">
                            <Button variant="primary">Tiếp tục mua sắm</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
                                    {/* Delete Button */}
                                    <Button
                                        variant="ghost" size="sm"
                                        className="absolute top-2 right-2 p-1 h-auto text-gray-400 hover:text-red-500 hover:bg-red-50"
                                        onClick={() => removeFromCart(item.id)} aria-label={`Xóa ${item.title}`}
                                    >
                                        <Trash2 size={16} />
                                    </Button>

                                    {/* Image */}
                                    <Image
                                        src={item.imageUrl || `https://placehold.co/100x100/eee/31343C?text=${item.title}`}
                                        alt={item.title} width={80} height={80}
                                        className="rounded-md object-cover flex-shrink-0 border" // Added border
                                    />

                                    {/* Product Info */}
                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-semibold truncate" title={item.title}>{item.title}</h3>
                                        <p className="font-bold text-primary mt-1">
                                            {Number(item.price) === 0 ? 'Miễn phí' : `${Number(item.price).toLocaleString('vi-VN')} ₫`}
                                        </p>
                                    </div>

                                    {/* --- Quantity Selector --- */}
                                    <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
                                        <Button variant="outline" size="sm" className="p-1 h-auto w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                                            <Minus size={14} />
                                        </Button>
                                        {/* Optional: Make quantity editable */}
                                        <Input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e)}
                                            className="text-sm font-medium w-12 h-8 text-center px-1"
                                        />
                                        {/* <span className="text-sm font-medium w-8 text-center">{item.quantity}</span> */}
                                        <Button variant="outline" size="sm" className="p-1 h-auto w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus size={14} />
                                        </Button>
                                    </div>
                                    {/* --- End Quantity Selector --- */}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 shadow-md">
                           {/* ... (Order Summary content) ... */}
                           <CardHeader><CardTitle>Tóm tắt đơn hàng</CardTitle></CardHeader>
                           <CardContent className="space-y-4">
                               <div className="flex justify-between text-gray-600"><span>Tạm tính ({itemCount} sản phẩm)</span><span className="font-medium">{totalPrice.toLocaleString('vi-VN')} ₫</span></div>
                               <hr/>
                               <div className="flex justify-between text-lg font-bold"><span>Tổng cộng</span><span>{totalPrice.toLocaleString('vi-VN')} ₫</span></div>
                               <Button size="lg" className="w-full" onClick={handleCheckout}>Tiến hành đặt hàng</Button>
                           </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}