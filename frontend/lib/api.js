// --- DỮ LIỆU SẢN PHẨM GIẢ LẬP ---
const MOCK_PRODUCTS = [
  { id: 1, title: "Sách Lập trình JavaScript", description: "Sách JavaScript cơ bản...", price: "150000.00", imageUrl: "https://placehold.co/600x400/e9d5ff/31343C?text=JS+Book", seller: { name: "Nguyễn Văn A", avatar: "/avatar.png", reputation: 95 } },
  { id: 2, title: "Bàn phím cơ", description: "Bàn phím cơ Blue switch...", price: "750000.00", imageUrl: "https://placehold.co/600x400/bbf7d0/31343C?text=Keyboard", seller: { name: "Trần Thị B", avatar: "/avatar.png", reputation: 88 } },
  { id: 3, title: "Chuột không dây", description: "Chuột quang không dây...", price: "220000.00", imageUrl: "https://placehold.co/600x400/fecaca/31343C?text=Mouse", seller: { name: "Lê Văn C", avatar: "/avatar.png", reputation: 105 } },
  { id: 4, title: "Tai nghe Bluetooth (Cho tặng)", description: "Tai nghe cho tặng, còn dùng tốt", price: "0.00", imageUrl: "https://placehold.co/600x400/ccc/31343C?text=Free", seller: { name: "Phạm Hữu D", avatar: "/avatar.png", reputation: 120 } }
];

// --- DỮ LIỆU ĐÁNH GIÁ GIẢ LẬP ---
const MOCK_REVIEWS = [
  { id: 1, author: "Người mua X", rating: 5, comment: "Hài lòng, người bán thân thiện!", isVerified: true },
  { id: 2, author: "Người mua Y", rating: 4, comment: "Sản phẩm đúng mô tả.", isVerified: true },
  { id: 3, author: "Người mua Z", rating: 1, comment: "Sản phẩm không đúng mô tả.", isVerified: false, reason: "Nhận xét không đúng sự thật" }
];

// --- Giả lập API ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllProducts() {
  await sleep(500);
  return MOCK_PRODUCTS;
}

export async function getProductById(id) {
  await sleep(500);
  return MOCK_PRODUCTS.find(p => p.id.toString() === id.toString()) || null;
}

export async function getReviewsByProductId(id) {
  await sleep(500);
  return MOCK_REVIEWS;
}

// Giả lập thông tin user
export async function getUserDashboard() {
  await sleep(500);
  return {
    reputation: 85,
    greenCredit: 20
  };
}