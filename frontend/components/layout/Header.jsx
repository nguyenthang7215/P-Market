'use client';
import Link from 'next/link';
import Image from 'next/image';

// Icons
const GridIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25A2.25 2.25 0 018.25 10.5H6A2.25 2.25 0 013.75 8.25V6zM3.75 13.5A2.25 2.25 0 016 11.25h2.25A2.25 2.25 0 0110.5 13.5v2.25A2.25 2.25 0 018.25 18H6a2.25 2.25 0 01-2.25-2.25v-2.25zM13.5 6A2.25 2.25 0 0115.75 3.75h2.25A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 13.5A2.25 2.25 0 0115.75 11.25h2.25A2.25 2.25 0 0120.25 13.5v2.25A2.25 2.25 0 0118 18h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /> </svg> );
const BellIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /> </svg> );
const WalletIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"> <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6.248c0 1.02-1.006 1.86-2.218 1.86h-1.564a2.25 2.25 0 01-2.218-1.86V12m18 0a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6.248c0 1.02-1.006 1.86-2.218 1.86h-1.564a2.25 2.25 0 01-2.218-1.86V12" /> </svg> );

export default function Header() {
  const isWalletConnected = true;
  const walletAddress = "0x1a2b...9c8d";
  const userName = "Nguyễn Hữu Niêm";
  const userAvatarUrl = "/avatar.png"; // <-- BẠN CẦN TẠO THƯ MỤC /frontend/public/ và đặt file avatar.png vào đó
  const notificationCount = 99;

  return (
    <header className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-3xl font-extrabold text-white tracking-wide">
              P-Market
            </Link>
          </div>
          <div className="flex items-center space-x-3 md:space-x-5">
            {isWalletConnected ? (
              <div className="hidden sm:flex items-center bg-red-700 p-2 rounded-full shadow-inner">
                <WalletIcon />
                <span className="text-sm font-medium">{walletAddress}</span>
              </div>
            ) : (
              <button className="hidden sm:block bg-white text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Kết nối ví
              </button>
            )}
            <button className="p-2 rounded-full text-white hover:bg-red-700 focus:outline-none"><GridIcon /></button>
            <button className="relative p-2 rounded-full text-white hover:bg-red-700 focus:outline-none">
              <BellIcon />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-white text-red-600 text-xs font-bold flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-red-700">
              <Image className="h-8 w-8 rounded-full" src={userAvatarUrl} alt="User avatar" width={32} height={32} />
              <span className="hidden md:block text-sm font-medium">{userName}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}