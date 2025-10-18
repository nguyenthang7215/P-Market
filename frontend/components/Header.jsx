// Thư mục: frontend/components
// Tên file: Header.jsx
export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-indigo-600">
          P-MARKET
        </a>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Kết nối Ví
        </button>
      </nav>
    </header>
  );
}