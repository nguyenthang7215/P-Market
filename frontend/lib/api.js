// Thư mục: frontend/lib
// Tên file: api.js
const API_URL = 'http://localhost:5001/api';

// Hàm lấy tất cả sản phẩm
export async function getAllProducts() {
  try {
    // Thêm option `cache: 'no-store'` để luôn lấy dữ liệu mới
    const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch products from API');
    }
    return res.json();
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
}

// Hàm lấy sản phẩm theo ID
export async function getProductById(id) {
  try {
    // Thêm option `cache: 'no-store'`
    const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch product with id: ${id}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error in getProductById:', error);
    return null; // Trả về null nếu có lỗi
  }
}