/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // (Thêm dòng này cũng tốt)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // <-- Dòng quan trọng
        port: '', // <-- Để trống ''
        pathname: '/**', // <-- Dùng /**
      },
      // Nếu bạn dùng ảnh từ nguồn khác, thêm vào đây
      // Ví dụ:
       {
         protocol: 'https',
         hostname: 'img.example.com',
         port: '',
         pathname: '/user-uploads/**',
       },
    ],
    // Bạn cũng có thể thêm domains (cách cũ hơn, nhưng vẫn hoạt động)
     domains: ['placehold.co'], // Thêm dòng này để thử
  },
};

module.exports = nextConfig;