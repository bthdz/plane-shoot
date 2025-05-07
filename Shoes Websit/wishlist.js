// Wishlist functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page content is loaded
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800); // Show loading screen for at least 800ms
    }

    // Product data (same as in products.js and cart.js)
    const products = {
        '1': {
            id: 1,
            name: 'Nike Air Max',
            price: 199.99,
            image: 'image/shoes1.png',
            rating: 4.8,
            reviewCount: 124,
            description: 'Experience ultimate comfort and style with the Nike Air Max. Perfect for both athletic activities and casual wear.',
            color: 'Purple',
            size: '42'
        },
        '2': {
            id: 2,
            name: 'Nike Revolution',
            price: 149.99,
            image: 'image/shoes2.png',
            rating: 4.5,
            reviewCount: 98,
            description: 'The Nike Revolution offers exceptional durability and performance for everyday runners.',
            color: 'Black',
            size: '42'
        },
        '3': {
            id: 3,
            name: 'Nike Free Run',
            price: 179.99,
            image: 'image/shoes3.png',
            rating: 4.6,
            reviewCount: 87,
            description: 'Feel the freedom with Nike Free Run, designed for natural movement and flexibility.',
            color: 'Blue',
            size: '42'
        },
        '4': {
            id: 4,
            name: 'Nike Air Zoom',
            price: 159.99,
            image: 'image/shoes4.png',
            rating: 4.7,
            reviewCount: 105,
            description: 'Nike Air Zoom provides responsive cushioning for high-intensity activities and speed training.',
            color: 'Gray',
            size: '42'
        },
        '5': {
            id: 5,
            name: 'Nike Blazer',
            price: 189.99,
            image: 'image/shoes5.png',
            rating: 4.9,
            reviewCount: 156,
            description: 'The classic Nike Blazer combines vintage style with modern comfort for iconic street fashion.',
            color: 'White',
            size: '42'
        },
        '6': {
            id: 6,
            name: 'Nike Free Force',
            price: 169.99,
            image: 'image/shoes6.png',
            rating: 4.4,
            reviewCount: 78,
            description: 'Nike Free Force delivers exceptional support and flexibility for cross-training and gym workouts.',
            color: 'Red',
            size: '42'
        },
        '7': {
            id: 7,
            name: 'Nike Classic',
            price: 139.99,
            image: 'image/shoes7.png',
            rating: 4.2,
            reviewCount: 64,
            description: 'The timeless Nike Classic offers simple elegance and all-day comfort for casual wear.',
            color: 'White',
            size: '42'
        },
        '8': {
            id: 8,
            name: 'Nike Air Jordan',
            price: 229.99,
            image: 'image/shoes8.png',
            rating: 4.9,
            reviewCount: 210,
            description: 'The iconic Nike Air Jordan combines style, performance, and heritage with unmatched basketball legacy.',
            color: 'Red',
            size: '42'
        }
    };

    // DOM elements
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const emptyWishlistMessage = document.getElementById('empty-wishlist');
    const relatedProductsContainer = document.querySelector('.related-products-container');
    
    // Get wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Add a sample product if wishlist is empty (for demonstration purposes)
    if (wishlist.length === 0) {
        wishlist.push('1'); // Add Nike Air Max as a sample product
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    
    // Initialize page
    renderWishlist();
    displayRelatedProducts();
    updateWishlistCount();
    
    // Function to render wishlist items
    function renderWishlist() {
        if (!wishlistItemsContainer) return;
        
        // Clear container
        wishlistItemsContainer.innerHTML = '';
        
        // Check if wishlist is empty
        if (wishlist.length === 0) {
            emptyWishlistMessage.style.display = 'block';
            return;
        }
        
        // Hide empty message
        emptyWishlistMessage.style.display = 'none';
        
        // Create grid container
        const wishlistGrid = document.createElement('div');
        wishlistGrid.className = 'wishlist-grid';
        
        // Add wishlist items
        wishlist.forEach(productId => {
            const product = products[productId];
            if (product) {
                const wishlistItem = createWishlistItem(product);
                wishlistGrid.appendChild(wishlistItem);
            }
        });
        
        wishlistItemsContainer.appendChild(wishlistGrid);
    }
    
    // Function to create a single wishlist item element
    function createWishlistItem(product) {
        const item = document.createElement('div');
        item.className = 'wishlist-item';
        item.dataset.id = product.id;
        
        // Generate star rating HTML
        let starsHtml = '';
        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHtml += '<i class="fa-solid fa-star"></i>';
            } else if (i === fullStars && halfStar) {
                starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star"></i>';
            }
        }
        
        item.innerHTML = `
            <button class="remove-from-wishlist-btn" data-id="${product.id}">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="wishlist-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="wishlist-item-details">
                <div class="wishlist-item-name">${product.name}</div>
                <div class="wishlist-item-price">$${product.price.toFixed(2)}</div>
                <div class="wishlist-item-rating">
                    ${starsHtml}
                    <span>(${product.reviewCount})</span>
                </div>
                <div class="wishlist-item-actions">
                    <button class="view-details-btn" data-id="${product.id}">Chi tiết</button>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        const removeBtn = item.querySelector('.remove-from-wishlist-btn');
        removeBtn.addEventListener('click', function() {
            removeFromWishlist(product.id);
        });
        
        const viewDetailsBtn = item.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', function() {
            window.location.href = `product-detail.html?id=${product.id}`;
        });
        
        const addToCartBtn = item.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', function() {
            addToCart(product.id);
        });
        
        return item;
    }
    
    // Function to add to cart
    function addToCart(productId) {
        // This function should ideally use the same cart system as in cart.js
        if (typeof window.addToCart === 'function') {
            window.addToCart(productId, 1);
            alert(`Đã thêm ${products[productId].name} vào giỏ hàng!`);
        } else {
            // Fallback if addToCart function from cart.js is not available
            let cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};
            
            if (cart[productId]) {
                cart[productId].quantity += 1;
            } else {
                cart[productId] = {
                    id: productId,
                    quantity: 1
                };
            }
            
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
            alert(`Đã thêm ${products[productId].name} vào giỏ hàng!`);
            
            // Update cart count in the UI
            updateCartCount();
        }
    }
    
    // Function to remove from wishlist
    function removeFromWishlist(productId) {
        // Remove the product ID from the wishlist array
        wishlist = wishlist.filter(id => id != productId);
        
        // Save updated wishlist to localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        // Re-render the wishlist
        renderWishlist();
        
        // Update wishlist count in the UI
        updateWishlistCount();
        
        // Show message
        alert(`Đã xóa ${products[productId].name} khỏi danh sách yêu thích!`);
    }
    
    // Function to display related products
    function displayRelatedProducts() {
        if (!relatedProductsContainer) return;
        
        // Clear container
        relatedProductsContainer.innerHTML = '';
        
        // Get all product IDs excluding wishlist items
        const availableProductIds = Object.keys(products).filter(id => !wishlist.includes(id));
        
        // If all products are already in wishlist, show some random products
        let productsToShow = availableProductIds.length >= 4 ? availableProductIds : Object.keys(products);
        
        // Shuffle array and take first 4 items
        productsToShow = shuffleArray(productsToShow).slice(0, 4);
        
        // Add related products
        productsToShow.forEach(productId => {
            const product = products[productId];
            if (product) {
                const relatedProductCard = createRelatedProductCard(product);
                relatedProductsContainer.appendChild(relatedProductCard);
            }
        });
    }
    
    // Function to create a related product card
    function createRelatedProductCard(product) {
        const card = document.createElement('div');
        card.className = 'related-product-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <span class="price">$${product.price.toFixed(2)}</span>
            <a href="product-detail.html?id=${product.id}" class="view-btn">Xem chi tiết</a>
        `;
        
        return card;
    }
    
    // Function to update wishlist count in navbar
    function updateWishlistCount() {
        // Get the heart icon in the navbar
        const heartIcon = document.querySelector('.icons i.fa-heart');
        if (!heartIcon) return;
        
        // Remove existing badge if any
        const existingBadge = heartIcon.querySelector('.wishlist-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // Only add badge if wishlist has items
        if (wishlist.length > 0) {
            const badge = document.createElement('span');
            badge.className = 'wishlist-badge';
            badge.textContent = wishlist.length > 99 ? '99+' : wishlist.length;
            badge.style.position = 'absolute';
            badge.style.top = '-8px';
            badge.style.right = '-8px';
            badge.style.backgroundColor = '#c72092';
            badge.style.color = 'white';
            badge.style.borderRadius = '50%';
            badge.style.fontSize = '12px';
            badge.style.padding = '2px 6px';
            badge.style.fontWeight = 'bold';
            
            // Make sure the heart icon has position relative
            heartIcon.style.position = 'relative';
            
            heartIcon.appendChild(badge);
        }
    }
    
    // Function to update cart count in navbar (simplified version)
    function updateCartCount() {
        // Get cart data
        const cart = JSON.parse(localStorage.getItem('shoppingCart')) || {};
        
        // Calculate total items
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        
        // Get the cart icon
        const cartIcon = document.querySelector('.icons i.fa-cart-shopping');
        if (!cartIcon) return;
        
        // Remove existing badge
        const existingBadge = cartIcon.querySelector('.cart-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // Add new badge if there are items
        if (totalItems > 0) {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.textContent = totalItems > 99 ? '99+' : totalItems;
            badge.style.position = 'absolute';
            badge.style.top = '-8px';
            badge.style.right = '-8px';
            badge.style.backgroundColor = '#c72092';
            badge.style.color = 'white';
            badge.style.borderRadius = '50%';
            badge.style.fontSize = '12px';
            badge.style.padding = '2px 6px';
            badge.style.fontWeight = 'bold';
            
            // Make sure the cart icon has position relative
            cartIcon.style.position = 'relative';
            
            cartIcon.appendChild(badge);
        }
    }
    
    // Utility function to shuffle an array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Make the heart icon in the navbar open the wishlist page
    const heartIcon = document.querySelector('.icons i.fa-heart');
    if (heartIcon && !heartIcon.classList.contains('active')) {
        heartIcon.addEventListener('click', function() {
            window.location.href = 'wishlist.html';
        });
    }

    // Add a global function to add to wishlist
    window.addToWishlist = function(productId) {
        // Check if the product is already in the wishlist
        if (wishlist.includes(productId)) {
            alert(`${products[productId].name} đã có trong danh sách yêu thích!`);
            return false;
        }
        
        // Add to wishlist
        wishlist.push(productId);
        
        // Save to localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        // Update wishlist count in the UI
        updateWishlistCount();
        
        // Show message
        alert(`Đã thêm ${products[productId].name} vào danh sách yêu thích!`);
        return true;
    };

    // Make window.updateWishlistCount available globally
    window.updateWishlistCount = updateWishlistCount;
});