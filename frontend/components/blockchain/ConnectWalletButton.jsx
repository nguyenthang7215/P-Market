'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Wallet } from 'lucide-react';

export default function ConnectWalletButton({ requiredReputation }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userReputation = 85; // Dữ liệu giả

  const handleConnect = () => {
    setIsLoading(true);
    // Giả lập kết nối ví
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isConnected) {
    return (
      <div className="p-3 bg-green-100 border border-green-300 rounded-md text-green-800">
        <p className="font-semibold">Đã liên kết ví:</p>
        <p className="text-sm break-all">0x1a2b3c...9c8d</p>
      </div>
    );
  }

  if (userReputation < requiredReputation) {
    return (
      <Button variant="secondary" disabled={true} className="w-full">
        Cần {requiredReputation} điểm uy tín để liên kết ví
      </Button>
    );
  }

  return (
    <Button variant="secondary" onClick={handleConnect} disabled={isLoading} className="w-full">
      <Wallet size={18} className="mr-2" />
      {isLoading ? 'Đang kết nối...' : 'Liên kết ví điện tử'}
    </Button>
  );
}