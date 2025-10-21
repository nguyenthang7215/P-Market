'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Wallet } from 'lucide-react';
import { useWallet } from '../../context/WalletContext'; // <-- Import

export default function ConnectWalletButton({ requiredReputation }) {
  const { isConnected, connectWallet, walletAddress } = useWallet(); // <-- Lấy từ context
  const [isLoading, setIsLoading] = useState(false);
  const userReputation = 85;

  const handleConnect = async () => {
    setIsLoading(true);
    await connectWallet(); // <-- Gọi hàm từ context
    setIsLoading(false);
  };

  if (userReputation < requiredReputation) {
    return (
      <Button variant="secondary" disabled={true} className="w-full">
        Cần {requiredReputation} điểm uy tín để liên kết ví
      </Button>
    );
  }

  if (isConnected) {
    return (
      <div className="p-3 bg-green-100 border border-green-300 rounded-md text-green-800">
        <p className="font-semibold">Đã liên kết ví:</p>
        <p className="text-sm break-all">{walletAddress}</p>
      </div>
    );
  }

  return (
    <Button variant="secondary" onClick={handleConnect} disabled={isLoading} className="w-full">
      <Wallet size={18} className="mr-2" />
      {isLoading ? 'Đang kết nối...' : 'Liên kết ví điện tử'}
    </Button>
  );
}