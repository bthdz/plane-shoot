// checkout.js - Xử lý logic trang thanh toán

document.addEventListener('DOMContentLoaded', function() {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItemsContainer = document.getElementById('checkout-items');
    
    // Hiển thị sản phẩm trong giỏ hàng
    displayCheckoutItems(cart, checkoutItemsContainer);
    
    // Cập nhật tổng tiền
    updateOrderTotals(cart);
    
    // Xử lý khi áp dụng mã giảm giá
    const applyButton = document.getElementById('apply-coupon');
    applyButton.addEventListener('click', function() {
        applyCoupon();
    });
    
    // Xử lý khi chọn phương thức thanh toán
    setupPaymentMethodsToggle();
    
    // Xử lý khi nhấn nút đặt hàng
    const placeOrderButton = document.getElementById('place-order');
    placeOrderButton.addEventListener('click', function(e) {
        placeOrder(e);
    });
    
    // Tạo ID đơn hàng ngẫu nhiên
    generateOrderId();
    
    // Xử lý khi chọn tỉnh/thành phố
    setupProvinceDistrictSelection();
});

/**
 * Hiển thị danh sách sản phẩm trong trang thanh toán
 * @param {Array} cart - Mảng các sản phẩm trong giỏ hàng
 * @param {HTMLElement} container - Phần tử HTML chứa danh sách sản phẩm
 */
function displayCheckoutItems(cart, container) {
    if (!container) return;
    
    // Xóa nội dung hiện tại
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart-message">Giỏ hàng của bạn đang trống. <a href="products.html">Tiếp tục mua sắm</a></p>';
        return;
    }
    
    // Hiển thị từng sản phẩm trong giỏ hàng
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-variant">Size: ${item.size || 'Mặc định'}</div>
                <div class="cart-item-price">${formatCurrency(item.price)}đ</div>
            </div>
            <div class="cart-item-quantity">
                Số lượng: ${item.quantity}
            </div>
        `;
        
        container.appendChild(itemElement);
    });
}

/**
 * Cập nhật tổng tiền đơn hàng
 * @param {Array} cart - Mảng các sản phẩm trong giỏ hàng
 */
function updateOrderTotals(cart) {
    // Tính tổng tiền hàng
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Lấy giá trị giảm giá (nếu có)
    const discountAmount = localStorage.getItem('discountAmount') ? parseFloat(localStorage.getItem('discountAmount')) : 0;
    
    // Phí vận chuyển cố định
    const shippingFee = 30000;
    
    // Tổng thanh toán
    const grandTotal = subtotal - discountAmount + shippingFee;
    
    // Cập nhật UI
    document.getElementById('subtotal').textContent = formatCurrency(subtotal) + 'đ';
    document.getElementById('discount').textContent = '-' + formatCurrency(discountAmount) + 'đ';
    document.getElementById('shipping').textContent = formatCurrency(shippingFee) + 'đ';
    document.getElementById('grand-total').textContent = formatCurrency(grandTotal) + 'đ';
    
    // Lưu tổng tiền để sử dụng khi thanh toán
    localStorage.setItem('orderTotal', grandTotal);
}

/**
 * Áp dụng mã giảm giá
 */
function applyCoupon() {
    const couponInput = document.getElementById('coupon-code');
    const couponCode = couponInput.value.trim().toUpperCase();
    
    // Danh sách mã giảm giá hợp lệ (thông thường nên kiểm tra trên server)
    const validCoupons = {
        'WELCOME10': { type: 'percent', value: 10 },  // Giảm 10%
        'SALE20': { type: 'percent', value: 20 },     // Giảm 20%
        'FREESHIP': { type: 'fixed', value: 30000 }   // Miễn phí vận chuyển
    };
    
    if (!couponCode) {
        alert('Vui lòng nhập mã giảm giá');
        return;
    }
    
    if (validCoupons[couponCode]) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        let discountAmount = 0;
        
        if (validCoupons[couponCode].type === 'percent') {
            discountAmount = subtotal * (validCoupons[couponCode].value / 100);
        } else {
            discountAmount = validCoupons[couponCode].value;
        }
        
        // Lưu giá trị giảm giá
        localStorage.setItem('discountAmount', discountAmount);
        localStorage.setItem('appliedCoupon', couponCode);
        
        // Cập nhật UI
        updateOrderTotals(cart);
        
        alert(`Đã áp dụng mã giảm giá ${couponCode} thành công!`);
    } else {
        alert('Mã giảm giá không hợp lệ hoặc đã hết hạn');
    }
}

/**
 * Thiết lập hiệu ứng chọn phương thức thanh toán
 */
function setupPaymentMethodsToggle() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Ẩn tất cả các chi tiết thanh toán
            document.querySelectorAll('.payment-details').forEach(details => {
                details.style.display = 'none';
            });
            
            // Hiển thị chi tiết của phương thức được chọn
            const selectedMethodId = this.id;
            const detailsClass = selectedMethodId.replace('payment-', '') + '-details';
            const details = document.querySelector('.' + detailsClass);
            
            if (details) {
                details.style.display = 'block';
            }
        });
    });
}

/**
 * Xử lý khi đặt hàng
 * @param {Event} e - Sự kiện click
 */
function placeOrder(e) {
    e.preventDefault();
    
    // Kiểm tra điều kiện trước khi đặt hàng
    if (!validateOrderForm()) {
        return;
    }
    
    // Lấy thông tin đơn hàng
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderTotal = localStorage.getItem('orderTotal');
    const orderId = document.getElementById('order-id').textContent;
    
    // Lấy thông tin giao hàng
    const fullname = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const province = document.getElementById('province').value;
    const district = document.getElementById('district').value;
    const note = document.getElementById('note').value;
    
    // Lấy phương thức thanh toán
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    // Tạo đối tượng đơn hàng
    const order = {
        id: orderId,
        items: cart,
        total: parseFloat(orderTotal),
        customerInfo: {
            fullname,
            phone,
            email,
            address,
            province,
            district,
            note
        },
        paymentMethod,
        orderDate: new Date().toISOString(),
        status: 'pending'
    };
    
    // Lưu đơn hàng vào localStorage (trong thực tế sẽ gửi lên server)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Xóa giỏ hàng
    localStorage.removeItem('cart');
    localStorage.removeItem('discountAmount');
    localStorage.removeItem('appliedCoupon');
    
    // Chuyển hướng đến trang xác nhận đơn hàng
    alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại Shoes.');
    window.location.href = 'index.html';
}

/**
 * Kiểm tra thông tin đơn hàng
 * @returns {Boolean} - Kết quả kiểm tra
 */
function validateOrderForm() {
    // Kiểm tra giỏ hàng có sản phẩm không
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng.');
        return false;
    }
    
    // Kiểm tra thông tin giao hàng
    const requiredFields = [
        { id: 'fullname', name: 'Họ và tên' },
        { id: 'phone', name: 'Số điện thoại' },
        { id: 'email', name: 'Email' },
        { id: 'address', name: 'Địa chỉ' },
        { id: 'province', name: 'Tỉnh/Thành phố' },
        { id: 'district', name: 'Quận/Huyện' }
    ];
    
    for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        if (!element.value.trim()) {
            alert(`Vui lòng nhập ${field.name}`);
            element.focus();
            return false;
        }
    }
    
    // Kiểm tra email hợp lệ
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Vui lòng nhập email hợp lệ');
        document.getElementById('email').focus();
        return false;
    }
    
    // Kiểm tra số điện thoại hợp lệ
    const phone = document.getElementById('phone').value;
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        alert('Vui lòng nhập số điện thoại hợp lệ');
        document.getElementById('phone').focus();
        return false;
    }
    
    // Kiểm tra đồng ý điều khoản
    const termsAgreed = document.getElementById('terms-agree').checked;
    if (!termsAgreed) {
        alert('Vui lòng đồng ý với điều khoản dịch vụ');
        return false;
    }
    
    return true;
}

/**
 * Tạo ID đơn hàng ngẫu nhiên
 */
function generateOrderId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const orderId = `SH${timestamp.toString().slice(-6)}${random}`;
    document.getElementById('order-id').textContent = orderId;
}

/**
 * Thiết lập chọn tỉnh/thành phố và quận/huyện
 */
function setupProvinceDistrictSelection() {
    const provinceSelect = document.getElementById('province');
    const districtSelect = document.getElementById('district');
    
    // Danh sách quận/huyện theo tỉnh/thành phố
    const districts = {
        'hanoi': ['Hoàn Kiếm', 'Ba Đình', 'Đống Đa', 'Hai Bà Trưng', 'Thanh Xuân', 'Cầu Giấy', 'Hoàng Mai', 'Long Biên', 'Nam Từ Liêm', 'Bắc Từ Liêm', 'Tây Hồ', 'Hà Đông'],
        'hcm': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Quận Bình Thạnh', 'Quận Tân Bình', 'Quận Phú Nhuận'],
        'danang': ['Hải Châu', 'Thanh Khê', 'Liên Chiểu', 'Ngũ Hành Sơn', 'Sơn Trà', 'Cẩm Lệ']
    };
    
    provinceSelect.addEventListener('change', function() {
        // Xóa các option hiện tại
        districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        
        const selectedProvince = this.value;
        if (selectedProvince && districts[selectedProvince]) {
            // Thêm các quận/huyện tương ứng với tỉnh/thành phố đã chọn
            districts[selectedProvince].forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase().replace(/\s+/g, '-');
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });
}

/**
 * Định dạng số tiền
 * @param {Number} amount - Số tiền cần định dạng
 * @returns {String} - Chuỗi đã được định dạng
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount);
}