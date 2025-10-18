// --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Sách Lập trình JavaScript",
    description: "Một cuốn sách tuyệt vời cho người mới bắt đầu học JavaScript. Bao gồm các khái niệm cơ bản đến nâng cao.",
    price: "150000.00",
    imageUrl: "https://placehold.co/600x400/e9d5ff/31343C?text=JS+Book"
  },
  {
    id: 2,
    title: "Bàn phím cơ",
    description: "Bàn phím cơ Blue switch, gõ siêu êm, có LED RGB.",
    price: "750000.00",
    imageUrl: "https://placehold.co/600x400/bbf7d0/31343C?text=Keyboard"
  },
  {
    id: 3,
    title: "Chuột không dây",
    description: "Chuột quang không dây, kết nối Bluetooth, pin dùng 6 tháng.",
    price: "220000.00",
    imageUrl: "https://placehold.co/600x400/fecaca/31343C?text=Mouse"
  },
  {
    id: 4,
    title: "Tai nghe Bluetooth (Ảnh trống)",
    description: "Tai nghe nhét tai, chống ồn chủ động, pin 8 tiếng.",
    price: "990000.00",
    imageUrl: "" // Để trống để kiểm tra ảnh fallback
  }
];

// 1. Giả lập hàm getAllProducts
export async function getAllProducts() {
  console.log("--- CHẠY MOCK API: getAllProducts ---");
  // Giả lập độ trễ mạng (500ms)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS);
    }, 500);
  });
}

// 2. Giả lập hàm getProductById
export async function getProductById(id) {
  console.log(`--- CHẠY MOCK API: getProductById(${id}) ---`);
  const product = MOCK_PRODUCTS.find(p => p.id.toString() === id.toString());
  
  // Giả lập độ trễ mạng (500ms)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(product || null); // Trả về sản phẩm hoặc null nếu không tìm thấy
    }, 500);
  });
}