'use client';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Wallet, Loader2 } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import toast from 'react-hot-toast'; // Import toast

export default function ConnectWalletButton({ requiredReputation }) {
  const { isConnected, connectWallet, walletAddress } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const userReputation = 85;

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connectWallet();
      toast.success('Kết nối ví thành công!'); // Success toast
    } catch (error) {
       console.error("Wallet connection error:", error);
       toast.error('Kết nối ví thất bại.'); // Error toast
    } finally {
       setIsLoading(false);
    }
  };

  if (userReputation < requiredReputation) { /* ... (Reputation check) ... */ }
  if (isConnected) { /* ... (Display connected state) ... */ }

  return (
    <Button variant="secondary" onClick={handleConnect} disabled={isLoading} className="w-full">
      {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Wallet size={18} className="mr-2" />}
      {isLoading ? 'Đang kết nối...' : 'Liên kết ví điện tử'}
    </Button>
  );
}