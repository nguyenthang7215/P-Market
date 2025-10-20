'use client';
import { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Avatar } from '../../components/ui/Avatar';
import { Send } from 'lucide-react';

export default function ChatPage() {
  // Giả lập tin nhắn và người bán
  const sellerName = "Trần Thị B"; // Lấy từ sản phẩm Bàn phím cơ
  const [messages, setMessages] = useState([
    { id: 1, sender: sellerName, text: "Chào bạn, bạn quan tâm Bàn phím cơ ạ?" },
    { id: 2, sender: "Bạn", text: "Vâng, cho mình hỏi còn hàng không?" },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    setMessages([...messages, { id: Date.now(), sender: "Bạn", text: newMessage }]);
    setNewMessage('');
    // Giả lập người bán trả lời sau 1 giây
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: sellerName, text: "Còn bạn nhé!" }]);
    }, 1000);
  };

  return (
    <Container className="py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-3 border-b">
          <Avatar src="/avatar.png" alt={sellerName} />
          <CardTitle>Trò chuyện với {sellerName}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 h-96 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'Bạn' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-lg max-w-[70%] ${msg.sender === 'Bạn' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" size="sm">
              <Send size={18} />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </Container>
  );
}