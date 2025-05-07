// Product Detail Page JavaScript

// Image Gallery Functionality
function changeImage(element) {
    document.getElementById('main-product-image').src = element.src;
    
    // Add active class to selected thumbnail
    let thumbnails = document.querySelectorAll('.small-img');
    thumbnails.forEach(img => img.classList.remove('active'));
    element.classList.add('active');
}

// Get URL parameters to load product data
function getProductFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // In a real implementation, you would fetch product data from a server
        // For now, we'll just simulate different products based on ID
        const products = {
            '1': {
                id: 1,
                name: 'Nike Air Max',
                price: 199.99,
                image: 'image/shoes1.png',
                shortDesc: 'Experience ultimate comfort and style with the Nike Air Max. Perfect for both athletic activities and casual wear.',
                detailDesc: `<p>The Nike Air Max represents the pinnacle of athletic footwear innovation. Designed with both form and function in mind, these shoes deliver exceptional performance without sacrificing style.</p>
                <p>The upper portion features premium materials that provide durability while allowing your feet to breathe during intense activities. The midsole contains Nike's proprietary Air cushioning system, which offers responsive support and impact absorption.</p>
                <p>The outsole is crafted from high-quality rubber with a specialized traction pattern, ensuring superior grip on various surfaces. Whether you're an athlete seeking performance benefits or a fashion enthusiast looking for iconic style, the Nike Air Max delivers on all fronts.</p>`,
                quantity: 150,
                sold: 85,
                factory: 'Nike Inc., USA',
                target: 'Athletes, Casual Wearers, Fashion Enthusiasts'
            },
            '2': {
                id: 2,
                name: 'Nike Revolution',
                price: 149.99,
                image: 'image/shoes2.png',
                shortDesc: 'The Nike Revolution offers exceptional durability and performance for everyday runners.',
                detailDesc: `<p>Nike Revolution is engineered for the everyday runner who demands reliable performance and comfort. These shoes feature a lightweight mesh upper that enhances breathability during your run.</p>
                <p>The soft foam midsole delivers a smooth, stable ride while the textured outer wall reduces weight and adds durability. Strategic rubber placement on the outsole provides excellent traction and longevity.</p>
                <p>Whether you're training for your first 5K or maintaining your daily fitness routine, the Nike Revolution provides the perfect balance of cushioning, support, and durability that keeps you coming back for more.</p>`,
                quantity: 200,
                sold: 120,
                factory: 'Nike Manufacturing, Vietnam',
                target: 'Beginner Runners, Fitness Enthusiasts'
            },
            '3': {
                id: 3,
                name: 'Nike Free Run',
                price: 179.99,
                image: 'image/shoes3.png',
                shortDesc: 'Feel the freedom with Nike Free Run, designed for natural movement and flexibility.',
                detailDesc: `<p>The Nike Free Run is built to provide a barefoot-like feeling while still offering protection and cushioning. The revolutionary flexible sole moves with your foot, mimicking its natural motion.</p>
                <p>The lightweight upper uses engineered mesh that expands and contracts with your foot while maintaining support. The low-profile midsole delivers excellent ground feel without sacrificing comfort.</p>
                <p>Ideal for runners looking to strengthen their feet and leg muscles, the Nike Free Run promotes a more natural stride that can help improve your overall running form and efficiency. The minimalist design also makes these shoes perfect for casual wear.</p>`,
                quantity: 175,
                sold: 95,
                factory: 'Nike Manufacturing, Indonesia',
                target: 'Natural Runners, Minimalist Enthusiasts'
            },
            '4': {
                id: 4,
                name: 'Nike Air Zoom',
                price: 159.99,
                image: 'image/shoes4.png',
                shortDesc: 'Nike Air Zoom provides responsive cushioning for high-intensity activities and speed training.',
                detailDesc: `<p>The Nike Air Zoom is crafted for athletes who value responsiveness and speed. The Zoom Air unit in the forefoot delivers a propulsive sensation with each step, helping you move faster and more efficiently.</p>
                <p>The sleek, lightweight design features a breathable mesh upper with strategic overlays that provide targeted support exactly where you need it. The dynamic fit system adapts to your foot for a secure, comfortable fit throughout your workout.</p>
                <p>With exceptional energy return and cushioning, the Nike Air Zoom is ideal for speed training, race day, and high-intensity interval training. The durable rubber outsole features a multidirectional traction pattern that helps you maintain grip when changing direction quickly.</p>`,
                quantity: 120,
                sold: 75,
                factory: 'Nike Sports Inc., China',
                target: 'Speed Trainers, Competitive Athletes'
            },
            '5': {
                id: 5,
                name: 'Nike Blazer',
                price: 189.99,
                image: 'image/shoes5.png',
                shortDesc: 'The classic Nike Blazer combines vintage style with modern comfort for iconic street fashion.',
                detailDesc: `<p>The Nike Blazer is a timeless silhouette that has transitioned from the basketball court to the streets with effortless style. Originally released in 1972, this shoe continues to capture the essence of classic sportswear with modern upgrades.</p>
                <p>The premium leather upper ages beautifully and provides durability while the padded collar offers comfort around the ankle. The vintage treatment on the midsole gives these shoes their characteristic retro look that pairs with everything from jeans to chinos.</p>
                <p>While honoring its heritage design, today's Blazer includes modern cushioning for all-day comfort. The rubber sole with herringbone pattern provides excellent traction and durability, making this not just a fashion statement but a functional everyday sneaker.</p>`,
                quantity: 135,
                sold: 90,
                factory: 'Nike Heritage, USA',
                target: 'Fashion Enthusiasts, Vintage Style Lovers'
            },
            '6': {
                id: 6,
                name: 'Nike Free Force',
                price: 169.99,
                image: 'image/shoes6.png',
                shortDesc: 'Nike Free Force delivers exceptional support and flexibility for cross-training and gym workouts.',
                detailDesc: `<p>The Nike Free Force is designed specifically for cross-training and versatile gym workouts. These shoes provide the perfect combination of stability for lifting and flexibility for dynamic movements.</p>
                <p>The flat, wide heel creates a stable platform for weightlifting while the flexible forefoot allows natural movement during agility exercises. The breathable mesh upper is reinforced with lightweight overlays to provide support during lateral movements.</p>
                <p>A zero-drop profile encourages proper form and alignment, making these ideal for functional fitness training. The multidirectional traction pattern on the outsole gives you confidence to move in any direction, whether you're doing box jumps, burpees, or heavy squats.</p>`,
                quantity: 100,
                sold: 55,
                factory: 'Nike Fitness, Thailand',
                target: 'CrossFit Athletes, Gym Enthusiasts'
            },
            '7': {
                id: 7,
                name: 'Nike Classic',
                price: 139.99,
                image: 'image/shoes7.png',
                shortDesc: 'The timeless Nike Classic offers simple elegance and all-day comfort for casual wear.',
                detailDesc: `<p>The Nike Classic embodies simplicity and timeless design, making it a versatile addition to any wardrobe. The clean lines and minimal branding create an understated look that never goes out of style.</p>
                <p>Constructed with premium materials, including soft leather and durable canvas options, these shoes mold to your feet over time for a personalized fit. The cushioned insole and padded collar ensure comfort for all-day wear.</p>
                <p>Whether paired with jeans, shorts, or even business casual attire, the Nike Classic provides a refined finish to any outfit. The rubber cupsole construction delivers durability and traction that stands up to daily wear while maintaining its classic profile.</p>`,
                quantity: 220,
                sold: 150,
                factory: 'Nike Originals, Malaysia',
                target: 'Casual Wearers, Style-Conscious Consumers'
            },
            '8': {
                id: 8,
                name: 'Nike Air Jordan',
                price: 229.99,
                image: 'image/shoes8.png',
                shortDesc: 'The iconic Nike Air Jordan combines style, performance, and heritage with unmatched basketball legacy.',
                detailDesc: `<p>The Nike Air Jordan represents the pinnacle of basketball sneaker culture, carrying the legacy of Michael Jordan's unparalleled impact on the sport and fashion. Each pair is crafted with premium materials and attention to detail that honors its historic lineage.</p>
                <p>Featuring Nike's revolutionary Air cushioning technology, these shoes provide exceptional impact protection and comfort on and off the court. The high-top design offers ankle support while the premium leather upper provides durability and a luxury feel.</p>
                <p>Beyond performance features, the Air Jordan's distinctive silhouette and iconic Jumpman logo have transcended basketball to become a global cultural phenomenon. Wearing Air Jordans isn't just about comfort and performance—it's about connecting to a legacy of greatness.</p>`,
                quantity: 80,
                sold: 65,
                factory: 'Nike Jordan Brand, USA',
                target: 'Basketball Players, Collectors, Sneakerheads'
            }
        };
        
        const product = products[productId];
        if (product) {
            // Update product details
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
            document.getElementById('main-product-image').src = product.image;
            
            // Update short and full descriptions
            if (document.getElementById('product-short-desc')) {
                document.getElementById('product-short-desc').textContent = product.shortDesc;
            }
            
            // Update the full description in the tabs section
            if (document.getElementById('full-description-content')) {
                document.getElementById('full-description-content').innerHTML = product.detailDesc;
            }
            
            // Update additional product details if they exist
            if (document.getElementById('product-quantity')) {
                document.getElementById('product-quantity').textContent = product.quantity;
            }
            if (document.getElementById('product-sold')) {
                document.getElementById('product-sold').textContent = product.sold;
            }
            if (document.getElementById('product-factory')) {
                document.getElementById('product-factory').textContent = product.factory;
            }
        }
    }
}

// Call getProductFromUrl() when the page loads to show the correct product
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page content is loaded
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800); // Show loading screen for at least 800ms
    }
    
    // Load the product data from the URL
    getProductFromUrl();
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Smooth scroll for "Read more" link
    const readMoreLink = document.querySelector('.read-more-link');
    if (readMoreLink) {
        readMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Activate the description tab if it's not already active
                const descriptionTab = document.querySelector('.tab-btn[data-tab="description"]');
                if (descriptionTab && !descriptionTab.classList.contains('active')) {
                    descriptionTab.click();
                }
                
                // Scroll to the description section
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Size selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Color selection
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            colorButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Quantity selector
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    
    decreaseBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            // Get product ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            
            if (productId) {
                // Get selected quantity
                const quantity = parseInt(document.getElementById('quantity').value) || 1;
                
                // Get selected size
                let selectedSize = "42"; // Default size
                const activeSizeBtn = document.querySelector('.size-btn.active');
                if (activeSizeBtn) {
                    selectedSize = activeSizeBtn.textContent.trim();
                }
                
                // Get selected color - using background color of active button
                let selectedColor = "Default"; // Default color name
                const activeColorBtn = document.querySelector('.color-btn.active');
                if (activeColorBtn) {
                    // We could get the actual color, but for simplicity we'll use predefined values
                    const colorMap = {
                        "#6c14d0": "Purple",
                        "#c72092": "Pink",
                        "#000": "Black", 
                        "#4b77be": "Blue"
                    };
                    
                    const bgColor = activeColorBtn.style.background;
                    // Try to find color in map, otherwise use a default
                    for (const [colorCode, colorName] of Object.entries(colorMap)) {
                        if (bgColor.includes(colorCode)) {
                            selectedColor = colorName;
                            break;
                        }
                    }
                }
                
                // Call the addToCart function from cart.js
                if (typeof window.addToCart === 'function') {
                    const success = window.addToCart(productId, quantity, selectedSize, selectedColor);
                    
                    if (success) {
                        // Optional: Ask user if they want to go to cart
                        if (confirm('Sản phẩm đã được thêm vào giỏ hàng. Bạn có muốn đến trang giỏ hàng không?')) {
                            window.location.href = 'cart.html';
                        }
                    }
                } else {
                    // Fallback if addToCart function is not available
                    const productName = document.getElementById('product-name').textContent;
                    alert(`Đã thêm ${quantity} sản phẩm ${productName} vào giỏ hàng!`);
                }
            }
        });
    }
    
    // Buy now button
    const buyNowBtn = document.querySelector('.buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            // Get product ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            
            if (productId) {
                // Get selected quantity
                const quantity = parseInt(document.getElementById('quantity').value) || 1;
                
                // Get selected size
                let selectedSize = "42"; // Default size
                const activeSizeBtn = document.querySelector('.size-btn.active');
                if (activeSizeBtn) {
                    selectedSize = activeSizeBtn.textContent.trim();
                }
                
                // Get selected color
                let selectedColor = "Default"; // Default color name
                const activeColorBtn = document.querySelector('.color-btn.active');
                if (activeColorBtn) {
                    const colorMap = {
                        "#6c14d0": "Purple",
                        "#c72092": "Pink",
                        "#000": "Black", 
                        "#4b77be": "Blue"
                    };
                    
                    const bgColor = activeColorBtn.style.background;
                    for (const [colorCode, colorName] of Object.entries(colorMap)) {
                        if (bgColor.includes(colorCode)) {
                            selectedColor = colorName;
                            break;
                        }
                    }
                }
                
                // Add to cart then go to cart page
                if (typeof window.addToCart === 'function') {
                    window.addToCart(productId, quantity, selectedSize, selectedColor);
                    window.location.href = 'cart.html';
                } else {
                    // Fallback
                    alert('Đang chuyển đến trang thanh toán...');
                }
            }
        });
    }
    
    // Wishlist button
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            // Get product ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            
            if (productId) {
                // Check if product is already in wishlist
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                const isInWishlist = wishlist.includes(productId);
                
                if (isInWishlist) {
                    // Remove from wishlist
                    const newWishlist = wishlist.filter(id => id != productId);
                    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
                    
                    // Update UI
                    wishlistBtn.classList.remove('active');
                    alert('Đã xóa khỏi danh sách yêu thích!');
                } else {
                    // Add to wishlist
                    wishlist.push(productId);
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    
                    // Update UI
                    wishlistBtn.classList.add('active');
                    alert('Đã thêm vào danh sách yêu thích!');
                }
                
                // Update wishlist count in navbar if function is available
                if (typeof window.updateWishlistCount === 'function') {
                    window.updateWishlistCount();
                }
            }
        });
        
        // Set initial state of wishlist button
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            if (wishlist.includes(productId)) {
                wishlistBtn.classList.add('active');
            }
        }
    }
    
    // Related products view buttons
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Get the product ID from the button's data attribute or calculate it
            const productId = button.getAttribute('data-product-id') || (index + 2); // Default to index+2 if no attribute
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
    
    // Handle cart icon click
    const cartIcon = document.querySelector('.icons i.fa-cart-shopping');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
});