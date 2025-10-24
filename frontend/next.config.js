/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cho phép tải ảnh từ tên miền này
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', 
        port: '',
        pathname: '/**',
      },
    ],
    // Cho phép hiển thị ảnh SVG từ các nguồn bên ngoài
    dangerouslyAllowSVG: true, 
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Thêm CSP để tăng bảo mật khi dùng SVG
    // Hoặc chỉ cho phép SVG từ domain cụ thể (an toàn hơn)
    // contentDispositionType: 'inline',
    // dangerouslyAllowSVG: true,
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'placehold.co',
    //     pathname: '/**',
    //   },
    // ],
  },
};

module.exports = nextConfig;