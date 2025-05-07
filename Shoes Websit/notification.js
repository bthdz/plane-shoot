/**
 * Hệ thống thông báo modal - Thay thế cho alert mặc định của trình duyệt
 */

// Thêm modal HTML vào body
document.addEventListener('DOMContentLoaded', function() {
    const modalHTML = `
        <div class="notification-modal" id="notificationModal">
            <div class="notification-content">
                <div id="notificationIcon" class="notification-icon"></div>
                <h2 id="notificationTitle" class="notification-title"></h2>
                <p id="notificationMessage" class="notification-message"></p>
                <button id="notificationButton" class="notification-button">OK</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Đóng modal khi click vào nút OK
    document.getElementById('notificationButton').addEventListener('click', function() {
        document.getElementById('notificationModal').style.display = 'none';
    });
    
    // Đóng modal khi click bên ngoài nội dung modal
    document.getElementById('notificationModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});

/**
 * Hiển thị thông báo dạng modal
 * @param {string} message - Nội dung thông báo
 * @param {string} title - Tiêu đề thông báo (tùy chọn)
 * @param {string} type - Loại thông báo: 'success', 'error', 'info', 'warning' (mặc định: 'info')
 * @param {Function} callback - Hàm callback được gọi sau khi nhấn OK (tùy chọn)
 */
function showNotification(message, title = '', type = 'info', callback = null) {
    const modal = document.getElementById('notificationModal');
    const iconElement = document.getElementById('notificationIcon');
    const titleElement = document.getElementById('notificationTitle');
    const messageElement = document.getElementById('notificationMessage');
    const button = document.getElementById('notificationButton');
    
    // Đặt lại các class của icon
    iconElement.className = 'notification-icon';
    
    // Thiết lập icon dựa trên type
    let iconClass = '';
    switch (type) {
        case 'success':
            iconClass = 'fa-solid fa-circle-check';
            iconElement.classList.add('success');
            break;
        case 'error':
            iconClass = 'fa-solid fa-circle-xmark';
            iconElement.classList.add('error');
            break;
        case 'warning':
            iconClass = 'fa-solid fa-triangle-exclamation';
            iconElement.classList.add('warning');
            break;
        case 'info':
        default:
            iconClass = 'fa-solid fa-circle-info';
            iconElement.classList.add('info');
            break;
    }
    
    iconElement.innerHTML = `<i class="${iconClass}"></i>`;
    
    // Thiết lập tiêu đề và nội dung
    titleElement.textContent = title;
    titleElement.style.display = title ? 'block' : 'none';
    messageElement.textContent = message;
    
    // Hiển thị modal
    modal.style.display = 'flex';
    
    // Thiết lập callback khi nhấn OK
    if (callback && typeof callback === 'function') {
        button.onclick = function() {
            modal.style.display = 'none';
            callback();
        };
    } else {
        button.onclick = function() {
            modal.style.display = 'none';
        };
    }
}