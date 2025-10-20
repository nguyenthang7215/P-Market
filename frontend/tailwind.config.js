/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Định nghĩa màu sắc thương hiệu của bạn ở đây
        // Lấy cảm hứng từ logo PTIT và P-Market
        primary: {
          DEFAULT: '#CC0000', // Một màu đỏ đậm (giống PTIT)
          hover: '#A30000',   // Màu đỏ tối hơn khi hover
        },
        secondary: {
          DEFAULT: '#00529F', // Màu xanh (giống nút PTIT Office 365)
          hover: '#003E7A',
        },
        // Màu nền xám nhạt giống Shopee
        background: '#F5F5F5', 
      },
    },
  },
  plugins: [],
}