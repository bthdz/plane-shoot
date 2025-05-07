// Cart functionality for Shoes Website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart.js loaded, initializing cart functionality');
    
    // Hide loading screen after page content is loaded
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800); // Show loading screen for at least 800ms
    }

    // Product data (normally this would come from a database)
    const products = {
        '1': {
            id: 1,
            name: 'Nike Air Max',
            price: 199.99,
            image: 'image/shoes1.png',
            color: 'Purple',
            size: '42'
        },
        '2': {
            id: 2,
            name: 'Nike Revolution',
            price: 149.99,
            image: 'image/shoes2.png',
            color: 'Black',
            size: '42'
        },
        '3': {
            id: 3,
            name: 'Nike Free Run',
            price: 179.99,
            image: 'image/shoes3.png',
            color: 'Blue',
            size: '42'
        },
        '4': {
            id: 4,
            name: 'Nike Air Zoom',
            price: 159.99,
            image: 'image/shoes4.png',
            color: 'Gray',
            size: '42'
        },
        '5': {
            id: 5,
            name: 'Nike Blazer',
            price: 189.99,
            image: 'image/shoes5.png',
            color: 'White',
            size: '42'
        },
        '6': {
            id: 6,
            name: 'Nike Free Force',
            price: 169.99,
            image: 'image/shoes6.png',
            color: 'Red',
            size: '42'
        },
        '7': {
            id: 7,
            name: 'Nike Classic',
            price: 139.99,
            image: 'image/shoes7.png',
            color: 'White',
            size: '42'
        },
        '8': {
            id: 8,
            name: 'Nike Air Jordan',
            price: 229.99,
            image: 'image/shoes8.png',
            color: 'Red',
            size: '42'
        }
    };

    // Promo codes
    const promoCodes = {
        'NIKE10': 0.1,  // 10% off
        'SHOES20': 0.2, // 20% off
        'SUMMER25': 0.25 // 25% off
    };

    // Shopping cart - load from users.json instead of localStorage
    let cart = {};
    let currentUser = null;
    let discountAmount = 0;
    let discountCode = '';
    
    // Load user and cart data from users.json
    loadUserData().then(() => {
        // Initial render after data is loaded
        renderCart();
        updateCartSummary();
        displayRelatedProducts();
        updateCartIconCount();
    });
    
    // Function to load user data from users.json
    async function loadUserData() {
        try {
            // Get logged in user ID from localStorage
            const loggedInUserId = localStorage.getItem('loggedInUserId');
            
            // Log to check ID
            console.log('Looking for user ID:', loggedInUserId);
            
            if (!loggedInUserId) {
                console.error('No user ID saved in localStorage');
                return;
            }
            
            // ===== IMPORTANT CHANGE: Try loading users.json from multiple possible paths =====
            let userData = null;
            const possiblePaths = [
                './users.json',
                '../users.json',
                '/users.json',
                'users.json'
            ];
            
            // Try each path until successful
            for (const path of possiblePaths) {
                try {
                    console.log(`Trying to load data from: ${path}`);
                    const response = await fetch(path);
                    if (!response.ok) throw new Error(`Response not OK: ${response.status}`);
                    userData = await response.json();
                    console.log(`Data loaded successfully from: ${path}`);
                    break; // Exit loop if loading successful
                } catch (err) {
                    console.log(`Cannot load from ${path}: ${err.message}`);
                }
            }
            
            // If unable to load from any path, use hardcoded data
            if (!userData) {
                console.warn('Could not load users.json from any path. Using sample data.');
                userData = {
                    users: [
                        {
                            id: 1,
                            username: "john_smith",
                            email: "john.smith@example.com",
                            cart: [
                                {
                                    productId: 2,
                                    name: "Nike Revolution",
                                    price: 149.99,
                                    size: "42",
                                    color: "Black",
                                    quantity: 1,
                                    image: "image/shoes2.png"
                                },
                                {
                                    productId: 7,
                                    name: "Nike Classic",
                                    price: 139.99,
                                    size: "42",
                                    color: "White", 
                                    quantity: 1,
                                    image: "image/shoes7.png"
                                }
                            ]
                        },
                        {
                            id: 2,
                            username: "emma_johnson",
                            email: "emma.johnson@example.com",
                            cart: [
                                {
                                    productId: 1,
                                    name: "Nike Air Max",
                                    price: 199.99,
                                    size: "38",
                                    color: "Purple",
                                    quantity: 1,
                                    image: "image/shoes1.png"
                                },
                                {
                                    productId: 3,
                                    name: "Nike Free Run",
                                    price: 179.99,
                                    size: "39",
                                    color: "Blue",
                                    quantity: 2,
                                    image: "image/shoes3.png"
                                }
                            ]
                        },
                        {
                            id: 3,
                            username: "michael_brown",
                            email: "michael.brown@example.com",
                            cart: [
                                {
                                    productId: 1,
                                    name: "Nike Air Max",
                                    price: 199.99,
                                    size: "43",
                                    color: "Purple",
                                    quantity: 1,
                                    image: "image/shoes1.png"
                                }
                            ]
                        }
                    ]
                };
            }
            
            if (userData && userData.users && userData.users.length > 0) {
                // Find user by ID - convert loggedInUserId to number for exact comparison
                const userIdNum = parseInt(loggedInUserId);
                console.log('Searching for user with ID (number):', userIdNum);
                
                const user = userData.users.find(u => u.id === userIdNum);
                
                if (user) {
                    console.log('Found user:', user.username);
                    currentUser = user;
                    
                    // Add cart products to cart array
                    if (currentUser.cart && currentUser.cart.length > 0) {
                        console.log('User cart found with', currentUser.cart.length, 'items');
                        
                        // Reset cart before adding new products from user data
                        cart = {};
                        
                        currentUser.cart.forEach(item => {
                            console.log('Adding item to cart:', item.productId, item.name);
                            cart[item.productId] = {
                                id: item.productId,
                                quantity: item.quantity || 1,
                                size: item.size || products[item.productId]?.size || '42',
                                color: item.color || products[item.productId]?.color || 'Black'
                            };
                        });
                        
                        // Save cart to localStorage to ensure it is saved
                        localStorage.setItem('shoppingCart', JSON.stringify(cart));
                        
                        console.log('Cart after loading:', cart);
                    } else {
                        console.log('User cart is empty in users.json');
                        // Try loading cart data from localStorage
                        try {
                            const savedCart = localStorage.getItem('shoppingCart');
                            if (savedCart) {
                                cart = JSON.parse(savedCart);
                                console.log('Loaded cart from localStorage instead:', cart);
                            }
                        } catch (e) {
                            console.error('Error loading cart from localStorage:', e);
                        }
                    }
                } else {
                    console.error('User with ID', loggedInUserId, 'not found in users data');
                }
            } else {
                console.error('Invalid or empty users data');
            }
        } catch (error) {
            console.error('Error in loadUserData:', error);
        }
    }
    
    // Check if there's a saved discount
    if (localStorage.getItem('discountCode')) {
        discountCode = localStorage.getItem('discountCode');
        const discountRate = promoCodes[discountCode];
        if (discountRate) {
            const subtotal = calculateSubtotal();
            discountAmount = subtotal * discountRate;
        }
    }

    // DOM elements
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const promoInput = document.getElementById('promo-input');
    const applyPromoBtn = document.getElementById('apply-promo');
    const relatedProductsContainer = document.querySelector('.related-products-container');
    
    // Add event listeners
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
    
    // Functions
    function renderCart() {
        if (cartItemsContainer) {
            // Clear the container
            cartItemsContainer.innerHTML = '';
            
            const cartItems = Object.values(cart);
            
            if (cartItems.length === 0) {
                // Show empty cart message
                const emptyCartMessage = document.createElement('div');
                emptyCartMessage.className = 'empty-cart-message';
                emptyCartMessage.innerHTML = `
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>Your cart is empty</p>
                    <a href="index.html#Products" class="continue-shopping-btn">Continue Shopping</a>
                `;
                cartItemsContainer.appendChild(emptyCartMessage);
            } else {
                // Render each cart item
                cartItems.forEach(item => {
                    const productInfo = products[item.id];
                    if (productInfo) {
                        const cartItem = document.createElement('div');
                        cartItem.className = 'cart-item';
                        cartItem.innerHTML = `
                            <div class="item-details">
                                <img src="${productInfo.image}" alt="${productInfo.name}" class="item-image">
                                <div class="item-info">
                                    <h3>${productInfo.name}</h3>
                                    <p>Size: ${item.size || productInfo.size} | Color: ${item.color || productInfo.color}</p>
                                </div>
                            </div>
                            <div class="item-price">$${productInfo.price.toFixed(2)}</div>
                            <div class="item-quantity">
                                <div class="quantity-selector">
                                    <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                    <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                                </div>
                            </div>
                            <div class="item-total">$${(productInfo.price * item.quantity).toFixed(2)}</div>
                            <div>
                                <button class="remove-item" data-id="${item.id}">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        `;
                        cartItemsContainer.appendChild(cartItem);
                    }
                });
                
                // Add event listeners to buttons
                document.querySelectorAll('.decrease-btn').forEach(btn => {
                    btn.addEventListener('click', decreaseQuantity);
                });
                
                document.querySelectorAll('.increase-btn').forEach(btn => {
                    btn.addEventListener('click', increaseQuantity);
                });
                
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', removeItem);
                });
            }
        }
    }
    
    function updateCartSummary() {
        const subtotal = calculateSubtotal();
        const shipping = subtotal > 0 ? 10 : 0; // Free shipping for orders over $100
        const total = subtotal - discountAmount + shipping;
        
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (discountElement) discountElement.textContent = `-$${discountAmount.toFixed(2)}`;
        if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    function calculateSubtotal() {
        let subtotal = 0;
        for (const itemId in cart) {
            const item = cart[itemId];
            const product = products[item.id];
            if (product) {
                subtotal += product.price * item.quantity;
            }
        }
        return subtotal;
    }
    
    function decreaseQuantity(e) {
        const id = e.target.dataset.id;
        if (cart[id] && cart[id].quantity > 1) {
            cart[id].quantity--;
            saveCart();
            renderCart();
            updateCartSummary();
        }
    }
    
    function increaseQuantity(e) {
        const id = e.target.dataset.id;
        if (cart[id]) {
            cart[id].quantity++;
            saveCart();
            renderCart();
            updateCartSummary();
        }
    }
    
    function removeItem(e) {
        const id = e.target.closest('.remove-item').dataset.id;
        if (cart[id]) {
            delete cart[id];
            saveCart();
            renderCart();
            updateCartSummary();
            // Update cart icon count
            updateCartIconCount();
        }
    }
    
    function applyPromoCode() {
        const code = promoInput.value.trim().toUpperCase();
        if (promoCodes[code]) {
            const subtotal = calculateSubtotal();
            discountAmount = subtotal * promoCodes[code];
            discountCode = code;
            localStorage.setItem('discountCode', code);
            updateCartSummary();
            alert(`Promo code "${code}" has been successfully applied!`);
        } else {
            alert('Invalid or expired promo code.');
        }
    }
    
    function checkout() {
        if (calculateSubtotal() === 0) {
            alert('Your cart is empty.');
            return;
        }
        
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    }
    
    function saveCart() {
        // In a real app, we would save the cart to the server
        // For now, we'll still use localStorage for changes made on the client
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateCartIconCount();
    }
    
    function updateCartIconCount() {
        // Get the total number of items in cart
        const cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        
        // Create or update the cart badge
        let cartIcon = document.querySelector('.icons i.fa-cart-shopping');
        if (cartIcon) {
            // Remove existing badge if any
            const existingBadge = cartIcon.querySelector('.cart-badge');
            if (existingBadge) {
                existingBadge.remove();
            }
            
            // Only add badge if cart is not empty
            if (cartCount > 0) {
                const badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.textContent = cartCount > 99 ? '99+' : cartCount;
                cartIcon.style.position = 'relative';
                badge.style.position = 'absolute';
                badge.style.top = '-8px';
                badge.style.right = '-8px';
                badge.style.backgroundColor = '#c72092';
                badge.style.color = 'white';
                badge.style.borderRadius = '50%';
                badge.style.fontSize = '12px';
                badge.style.padding = '2px 6px';
                badge.style.fontWeight = 'bold';
                cartIcon.appendChild(badge);
            }
        }
    }
    
    function displayRelatedProducts() {
        if (relatedProductsContainer) {
            // Get random products for related section (excluding ones in cart)
            const cartItemIds = Object.keys(cart);
            const availableProductIds = Object.keys(products).filter(id => !cartItemIds.includes(id));
            
            // If cart is full or nearly full, show any products
            let productsToShow = availableProductIds.length >= 4 ? availableProductIds : Object.keys(products);
            
            // Randomly shuffle the array
            productsToShow = shuffleArray(productsToShow).slice(0, 4);
            
            // Generate HTML for each related product
            productsToShow.forEach(productId => {
                const product = products[productId];
                const productCard = document.createElement('div');
                productCard.className = 'related-product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <a href="product-detail.html?id=${product.id}" class="view-btn">View Details</a>
                `;
                relatedProductsContainer.appendChild(productCard);
            });
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
    
    // Handle add to cart functionality on product pages
    window.addToCart = function(productId, quantity = 1, size, color) {
        const product = products[productId];
        if (!product) return false;
        
        // If item already exists in cart, update quantity
        if (cart[productId]) {
            cart[productId].quantity += quantity;
        } else {
            // Otherwise add new item
            cart[productId] = {
                id: productId,
                quantity: quantity,
                size: size || product.size,
                color: color || product.color
            };
        }
        
        saveCart();
        alert(`${product.name} has been added to your cart!`);
        return true;
    };
    
    // Handle cart icon click to go to cart page
    const cartIcon = document.querySelector('.icons i.fa-cart-shopping');
    if (cartIcon && !cartIcon.classList.contains('active')) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
    
    // Make updateCartIconCount available globally
    window.updateCartIconCount = updateCartIconCount;
});