// Thư mục: frontend/lib
// Tên file: api.js
const API_URL = 'http://localhost:5001/api';

export async function getAllProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) { throw new Error('Failed to fetch data'); }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProductById(id) {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) { throw new Error('Failed to fetch data'); }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}