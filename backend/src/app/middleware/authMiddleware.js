import ApiError from '../../utils/classes/api-error.js';
// Import các model cần thiết để kiểm tra quyền sở hữu hoặc trạng thái
import sequelize from '../../configs/mysql.js';
import { Product, OrderProduct, Review } from '../../models/index.js';

/**
 * Middleware: Kiểm tra xem người dùng đã đăng nhập có vai trò 'admin' hay không.
 * Yêu cầu: req.user tồn tại (do requireAuthentication cung cấp) và có thuộc tính 'role'.
 * @example Cách dùng: userRouter.get('/all', requireAuthentication, isAdmin, userController.handleFindAllUsers);
 */
export function isAdmin(req, res, next) {
    // Đảm bảo req.user được cung cấp bởi requireAuthentication
    if (!req.user || !req.user.role) {
        // Lỗi này không nên xảy ra nếu requireAuthentication chạy trước, nhưng kiểm tra cho chắc chắn
        return next(ApiError.internal('Thông tin người dùng không đầy đủ để kiểm tra quyền.'));
    }

    if (req.user.role === 'admin') {
        return next(); // Là admin, cho phép tiếp tục
    }

    // Không phải admin
    return next(ApiError.forbidden('Truy cập bị từ chối. Yêu cầu quyền Admin.'));
}

/**
 * Middleware: Kiểm tra xem người dùng đã đăng nhập có phải là người bán hay không.
 * (Giả sử bạn có trường isSeller hoặc role trong model User)
 * @example Cách dùng: productRouter.post('/', requireAuthentication, isSeller, productController.createProduct);
 */
export function isSeller(req, res, next) {
    if (!req.user) {
        return next(ApiError.internal('Không xác định được người dùng hiện tại.'));
    }
    // Kiểm tra dựa trên trường isGreenSeller hoặc role (chọn 1 hoặc cả 2 tùy logic của bạn)
    if (req.user.isGreenSeller === true /* || req.user.role === 'seller' */) {
        return next(); // Là người bán, cho phép tiếp tục
    }
    return next(ApiError.forbidden('Truy cập bị từ chối. Chỉ người bán mới có thể thực hiện hành động này.'));
}


/**
 * Middleware: Kiểm tra xem người dùng đã đăng nhập có phải là chủ sở hữu sản phẩm không.
 * Yêu cầu: ID sản phẩm nằm trong req.params.id. req.user tồn tại.
 * @example Cách dùng: productRouter.put('/:id', requireAuthentication, isProductOwner, productController.handleUpdateProduct);
 */
export async function isProductOwner(req, res, next) {
    try {
        const productId = req.params.id; // Lấy ID sản phẩm từ URL
        const userId = req.user.id;    // Lấy ID người dùng đang đăng nhập

        if (!productId) {
            return next(ApiError.badRequest('Thiếu ID sản phẩm trong yêu cầu.'));
        }
        if (!userId) {
            return next(ApiError.internal('Không xác định được người dùng hiện tại.'));
        }

        // Tìm sản phẩm và chỉ lấy sellerId để kiểm tra
        const product = await Product.findByPk(productId, {
            attributes: ['sellerId']
        });

        if (!product) {
            return next(ApiError.notFound('Không tìm thấy sản phẩm.'));
        }

        // So sánh sellerId của sản phẩm với ID của người dùng đang đăng nhập
        if (product.sellerId === userId) {
            return next(); // Đúng chủ sở hữu, cho phép tiếp tục
        } else {
            return next(ApiError.forbidden('Truy cập bị từ chối. Bạn không phải chủ sở hữu sản phẩm này.'));
        }
    } catch (error) {
        // Xử lý lỗi database nếu có
        return next(error);
    }
}

/**
 * Middleware: Kiểm tra xem người dùng đã đăng nhập có phải là người mua HOẶC người bán của đơn hàng không.
 * Yêu cầu: ID đơn hàng nằm trong req.params.id. req.user tồn tại.
 * @example Cách dùng: orderRouter.get('/:id', requireAuthentication, isOrderParticipant, orderController.getOrderDetails);
 * @example Cách dùng: chatRouter.get('/order/:id', requireAuthentication, isOrderParticipant, chatController.getChatForOrder);
 */
export async function isOrderParticipant(req, res, next) {
     try {
        const orderId = req.params.id; // Hoặc req.params.orderId tùy vào route của bạn
        const userId = req.user.id;

        if (!orderId) {
            return next(ApiError.badRequest('Thiếu ID đơn hàng trong yêu cầu.'));
        }
         if (!userId) {
            return next(ApiError.internal('Không xác định được người dùng hiện tại.'));
        }

        // Tìm đơn hàng và lấy cả buyerId và sellerId
        const order = await OrderProduct.findByPk(orderId, {
            attributes: ['buyerId', 'sellerId']
        });

        if (!order) {
            return next(ApiError.notFound('Không tìm thấy đơn hàng.'));
        }

        // Kiểm tra xem người dùng có phải là người mua HOẶC người bán không
        if (order.buyerId === userId || order.sellerId === userId) {
            return next(); // Là người tham gia, cho phép tiếp tục
        } else {
            return next(ApiError.forbidden('Truy cập bị từ chối. Bạn không tham gia vào đơn hàng này.'));
        }
    } catch (error) {
        return next(error);
    }
}

/**
 * Middleware: Kiểm tra xem người dùng có được phép đánh giá đơn hàng không.
 * Điều kiện: Phải là người mua, đơn hàng phải ở trạng thái 'Completed', và chưa đánh giá trước đó.
 * Yêu cầu: ID đơn hàng nằm trong req.params.id. req.user tồn tại.
 * @example Cách dùng: reviewRouter.post('/order/:id', requireAuthentication, canReviewOrder, reviewController.createReview);
 */
export async function canReviewOrder(req, res, next) {
    try {
        const orderId = req.params.id; // Hoặc req.params.orderId
        const userId = req.user.id;

        if (!orderId) return next(ApiError.badRequest('Thiếu ID đơn hàng.'));
        if (!userId) return next(ApiError.internal('Không xác định người dùng.'));

        // 1. Kiểm tra xem người dùng có phải là người mua và đơn hàng đã hoàn thành không
        const order = await OrderProduct.findOne({
            where: {
                id: orderId,
                buyerId: userId,
                orderStatus: 'Completed' // Chỉ cho phép đánh giá đơn hàng đã hoàn thành
            },
            attributes: ['id'] // Chỉ cần biết nó tồn tại
        });

        if (!order) {
            return next(ApiError.forbidden('Bạn không thể đánh giá đơn hàng này (không phải người mua, chưa hoàn thành, hoặc không tồn tại).'));
        }

        // 2. Kiểm tra xem người dùng đã đánh giá đơn hàng này chưa
        const existingReview = await Review.findOne({
            where: {
                orderId: orderId,
                reviewerId: userId
            },
            attributes: ['id']
        });

        if (existingReview) {
            return next(ApiError.conflict('Bạn đã đánh giá đơn hàng này rồi.')); // Lỗi 409 Conflict
        }

        // Nếu tất cả điều kiện đều ổn
        return next();

    } catch (error) {
        return next(error);
    }
}

// --- Thêm các middleware kiểm tra quyền hạn khác khi cần ---
// Ví dụ: isWalletOwner, canAccessChat, hasPermission(permissionName), etc.