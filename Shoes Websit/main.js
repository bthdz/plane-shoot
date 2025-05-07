// Main page JavaScript to handle product navigation

document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page content is loaded
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800); // Show loading screen for at least 800ms
    }

    // Get all product cards
    const productCards = document.querySelectorAll('.products .card');
    
    // Add click event to each product card
    productCards.forEach((card, index) => {
        // Make the entire card clickable
        card.style.cursor = 'pointer';
        
        // Find the product ID from the View Details button's href
        const viewDetailsBtn = card.querySelector('.btn');
        let productId = index + 1; // Default fallback
        
        if (viewDetailsBtn && viewDetailsBtn.getAttribute('href')) {
            const hrefParts = viewDetailsBtn.getAttribute('href').split('=');
            if (hrefParts.length > 1) {
                productId = hrefParts[1];
            }
        }
        
        // Add click event listener to the card
        card.addEventListener('click', function(event) {
            // Don't navigate if clicked on view details button, heart icon or share icon
            if (event.target.classList.contains('btn') || 
                event.target.closest('.small_card') || 
                event.target.closest('.add-to-cart-btn')) {
                return;
            }
            
            // Navigate to product detail page with the product ID
            window.location.href = `product-detail.html?id=${productId}`;
        });

        // Get the "View Details" button in this card
        if (viewDetailsBtn) {
            // Keep the native link behavior for the View Details button
            // No need to prevent default or stop propagation
            // Just prevent the card click event from firing
            viewDetailsBtn.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }

        // Handle heart icon click (wishlist)
        const heartIcon = card.querySelector('.small_card i.fa-heart');
        if (heartIcon) {
            heartIcon.addEventListener('click', function(event) {
                event.stopPropagation();
                
                // Get product ID from card
                const productId = index + 1; // Since index is 0-based, but product IDs start at 1
                
                // Get current wishlist
                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                
                // Check if product is already in wishlist
                const isInWishlist = wishlist.includes(productId.toString());
                
                if (isInWishlist) {
                    // Remove from wishlist
                    wishlist = wishlist.filter(id => id != productId);
                    
                    // Update UI
                    this.classList.remove('active');
                    this.style.color = '';
                    
                    alert('Removed from wishlist!');
                } else {
                    // Add to wishlist
                    wishlist.push(productId.toString());
                    
                    // Update UI
                    this.classList.add('active');
                    this.style.color = '#c72092';
                    
                    alert('Added to wishlist!');
                }
                
                // Save updated wishlist
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                
                // Update wishlist count in navbar if function exists
                if (typeof window.updateWishlistCount === 'function') {
                    window.updateWishlistCount();
                }
            });
            
            // Set initial state of heart icon based on wishlist
            const productId = index + 1;
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            
            if (wishlist.includes(productId.toString())) {
                heartIcon.classList.add('active');
                heartIcon.style.color = '#c72092';
            }
        }

        // Handle share icon click
        const shareIcon = card.querySelector('.small_card i.fa-share');
        if (shareIcon) {
            shareIcon.addEventListener('click', function(event) {
                event.stopPropagation();
                alert('Share this product!');
            });
        }
        
        // Handle add to cart button click
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                
                // Call the addToCart function from cart.js if available
                if (typeof window.addToCart === 'function') {
                    window.addToCart(productId, 1);
                } else {
                    // Fallback if addToCart function is not available
                    const productName = card.querySelector('h1')?.textContent || 'Product';
                    alert(`${productName} has been added to your cart!`);
                }
            });
        }
    });

    // Add click event to "About" section shoe images
    const aboutImages = document.querySelectorAll('.about_small_image img');
    aboutImages.forEach((img) => {
        img.style.cursor = 'pointer';
    });

    // Make related products in the About section clickable too
    const shopNowBtn = document.querySelector('.about .about_btn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = 'product-detail.html?id=1';
        });
    }

    // Add event listener to enable profile navigation and link dropdown menu correctly
    const userDropdown = document.querySelector('.user-dropdown');
    
    // Add click listener to the My Profile link
    const profileLink = document.querySelector('.user-dropdown .dropdown-menu a[href="profile.html"]');
    
    if (profileLink) {
        profileLink.addEventListener('click', function(event) {
            window.location.href = 'profile.html';
        });
    }
    
    // Get all profile links in the user dropdown
    const dropdownLinks = document.querySelectorAll('.user-dropdown .dropdown-menu a');
    
    // Add click handlers for each dropdown link
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // If it's the login link, scroll to the login form
            if (link.classList.contains('login-link')) {
                event.preventDefault();
                const loginForm = document.querySelector('.login_form');
                if (loginForm) {
                    loginForm.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Handle cart icon click to navigate to cart page
    const cartIcon = document.querySelector('.icons i.fa-cart-shopping');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
    
    // Handle heart icon click to go to wishlist page
    const heartIcon = document.querySelector('.icons i.fa-heart');
    if (heartIcon && !heartIcon.classList.contains('active')) {
        heartIcon.addEventListener('click', function() {
            window.location.href = 'wishlist.html';
        });
    }

    // Update wishlist count in navbar
    function updateWishlistCount() {
        // Get the heart icon in the navbar
        const heartIcon = document.querySelector('.icons i.fa-heart');
        if (!heartIcon) return;
        
        // Get wishlist from localStorage
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
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

    // Make the function available globally
    window.updateWishlistCount = updateWishlistCount;

    // Update cart item count if cart.js is loaded
    if (typeof window.updateCartIconCount === 'function') {
        window.updateCartIconCount();
    }

    // Initialize wishlist badge when page loads
    updateWishlistCount();
});

// Add ability to create sample user data and cart
window.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (loggedInUserId && currentUser) {
        console.log('Logged in with ID:', loggedInUserId);
        
        // Create sample cart data if no cart exists
        const savedCart = localStorage.getItem('shoppingCart');
        if (!savedCart || JSON.parse(savedCart).length === 0 || Object.keys(JSON.parse(savedCart)).length === 0) {
            console.log('Creating sample cart for user');
            
            // Create sample cart based on user ID
            const sampleCarts = {
                '1': { // John Smith
                    '2': {
                        id: 2,
                        quantity: 1,
                        size: '42',
                        color: 'Black'
                    },
                    '7': {
                        id: 7,
                        quantity: 1,
                        size: '42',
                        color: 'White'
                    }
                },
                '2': { // Emma Johnson
                    '1': {
                        id: 1,
                        quantity: 1,
                        size: '38',
                        color: 'Purple'
                    },
                    '3': {
                        id: 3,
                        quantity: 2,
                        size: '39',
                        color: 'Blue'
                    }
                },
                '3': { // Michael Brown
                    '1': {
                        id: 1,
                        quantity: 1,
                        size: '43',
                        color: 'Purple'
                    },
                    '7': {
                        id: 7,
                        quantity: 2,
                        size: '44',
                        color: 'White'
                    }
                }
            };
            
            // Get the sample cart for current user
            const userCart = sampleCarts[loggedInUserId];
            if (userCart) {
                // Save cart to localStorage
                localStorage.setItem('shoppingCart', JSON.stringify(userCart));
                console.log('Created sample cart:', userCart);
                
                // If on cart page, reload to show new cart
                if (window.location.href.includes('cart.html')) {
                    console.log('Reloading cart page to display new data');
                    // To avoid infinite reload loop, set a flag
                    localStorage.setItem('cartLoaded', 'true');
                    setTimeout(() => {
                        if (localStorage.getItem('cartLoaded') === 'true') {
                            window.location.reload();
                        }
                    }, 1000);
                }
            }
        }
    }
});