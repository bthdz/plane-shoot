// Products page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page content is loaded
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800); // Show loading screen for at least 800ms
    }

    // All products data (expanded from the existing catalog)
    const allProducts = [
        {
            id: 1,
            name: 'Nike Air Max',
            price: 199.99,
            image: 'image/shoes1.png',
            category: 'running',
            color: 'purple',
            rating: 4.8,
            reviewCount: 124,
            isNew: true,
            releaseDate: '2023-04-15'
        },
        {
            id: 2,
            name: 'Nike Revolution',
            price: 149.99,
            image: 'image/shoes2.png',
            category: 'running',
            color: 'black',
            rating: 4.5,
            reviewCount: 98,
            isNew: false,
            releaseDate: '2022-12-10'
        },
        {
            id: 3,
            name: 'Nike Free Run',
            price: 179.99,
            image: 'image/shoes3.png',
            category: 'running',
            color: 'blue',
            rating: 4.6,
            reviewCount: 87,
            isNew: true,
            releaseDate: '2023-03-21'
        },
        {
            id: 4,
            name: 'Nike Air Zoom',
            price: 159.99,
            image: 'image/shoes4.png',
            category: 'training',
            color: 'gray',
            rating: 4.7,
            reviewCount: 105,
            isNew: false,
            releaseDate: '2022-11-05'
        },
        {
            id: 5,
            name: 'Nike Blazer',
            price: 189.99,
            image: 'image/shoes5.png',
            category: 'casual',
            color: 'white',
            rating: 4.9,
            reviewCount: 156,
            isNew: false,
            releaseDate: '2022-10-15'
        },
        {
            id: 6,
            name: 'Nike Free Force',
            price: 169.99,
            image: 'image/shoes6.png',
            category: 'training',
            color: 'red',
            rating: 4.4,
            reviewCount: 78,
            isNew: true,
            releaseDate: '2023-05-01'
        },
        {
            id: 7,
            name: 'Nike Classic',
            price: 139.99,
            image: 'image/shoes7.png',
            category: 'casual',
            color: 'white',
            rating: 4.2,
            reviewCount: 64,
            isNew: false,
            releaseDate: '2022-08-20'
        },
        {
            id: 8,
            name: 'Nike Air Jordan',
            price: 229.99,
            image: 'image/shoes8.png',
            category: 'basketball',
            color: 'red',
            rating: 4.9,
            reviewCount: 210,
            isNew: true,
            releaseDate: '2023-01-23'
        },
        // Extended product list
        {
            id: 9,
            name: 'Nike Metcon',
            price: 149.99,
            image: 'image/shoes2.png',
            category: 'training',
            color: 'black',
            rating: 4.7,
            reviewCount: 89,
            isNew: false,
            releaseDate: '2022-09-12'
        },
        {
            id: 10,
            name: 'Nike SB Dunk',
            price: 179.99,
            image: 'image/shoes3.png',
            category: 'casual',
            color: 'blue',
            rating: 4.8,
            reviewCount: 132,
            isNew: true,
            releaseDate: '2023-02-08'
        },
        {
            id: 11,
            name: 'Nike Pegasus',
            price: 129.99,
            image: 'image/shoes5.png',
            category: 'running',
            color: 'white',
            rating: 4.6,
            reviewCount: 95,
            isNew: false,
            releaseDate: '2022-07-15'
        },
        {
            id: 12,
            name: 'Nike LeBron',
            price: 219.99,
            image: 'image/shoes8.png',
            category: 'basketball',
            color: 'red',
            rating: 4.7,
            reviewCount: 117,
            isNew: true,
            releaseDate: '2023-04-28'
        },
        {
            id: 13,
            name: 'Nike Phantom',
            price: 159.99,
            image: 'image/shoes1.png',
            category: 'training',
            color: 'purple',
            rating: 4.5,
            reviewCount: 72,
            isNew: false,
            releaseDate: '2022-11-30'
        },
        {
            id: 14,
            name: 'Nike Cortez',
            price: 99.99,
            image: 'image/shoes7.png',
            category: 'casual',
            color: 'white',
            rating: 4.3,
            reviewCount: 58,
            isNew: false,
            releaseDate: '2022-06-24'
        },
        {
            id: 15,
            name: 'Nike Kyrie',
            price: 189.99,
            image: 'image/shoes4.png',
            category: 'basketball',
            color: 'gray',
            rating: 4.6,
            reviewCount: 103,
            isNew: true,
            releaseDate: '2023-03-12'
        },
        {
            id: 16,
            name: 'Nike React',
            price: 149.99,
            image: 'image/shoes6.png',
            category: 'running',
            color: 'red',
            rating: 4.4,
            reviewCount: 91,
            isNew: false,
            releaseDate: '2022-10-05'
        }
    ];

    // DOM elements
    const productsContainer = document.getElementById('products-container');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const colorFilter = document.getElementById('color-filter');
    const sortBy = document.getElementById('sort-by');
    const filterTags = document.getElementById('filter-tags');
    const noResults = document.getElementById('no-results');
    const resetFiltersBtn = document.getElementById('reset-filters');
    const loadMoreBtn = document.getElementById('load-more-btn');

    // Filter state
    let filterState = {
        searchQuery: '',
        category: 'all',
        price: 'all',
        color: 'all',
        sortBy: 'popularity',
        currentPage: 1,
        itemsPerPage: 8
    };

    // Initialize products page
    loadProducts();

    // Add event listeners
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            filterState.searchQuery = searchInput.value.trim().toLowerCase();
            filterState.currentPage = 1; // Reset to first page
            loadProducts();
            updateFilterTags();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                filterState.searchQuery = searchInput.value.trim().toLowerCase();
                filterState.currentPage = 1; // Reset to first page
                loadProducts();
                updateFilterTags();
            }
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterState.category = this.value;
            filterState.currentPage = 1; // Reset to first page
            loadProducts();
            updateFilterTags();
        });
    }

    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            filterState.price = this.value;
            filterState.currentPage = 1; // Reset to first page
            loadProducts();
            updateFilterTags();
        });
    }

    if (colorFilter) {
        colorFilter.addEventListener('change', function() {
            filterState.color = this.value;
            filterState.currentPage = 1; // Reset to first page
            loadProducts();
            updateFilterTags();
        });
    }

    if (sortBy) {
        sortBy.addEventListener('change', function() {
            filterState.sortBy = this.value;
            loadProducts();
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', resetFilters);
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            filterState.currentPage++;
            loadMoreProducts();
        });
    }

    // Functions
    function loadProducts() {
        // Apply filters
        let filteredProducts = filterProducts();
        
        // Sort products
        sortProducts(filteredProducts);
        
        // Get current page of products
        const startIndex = 0;
        const endIndex = filterState.currentPage * filterState.itemsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        // Clear container
        productsContainer.innerHTML = '';
        
        // Check if no products match filters
        if (filteredProducts.length === 0) {
            noResults.style.display = 'block';
            loadMoreBtn.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            
            // Render products
            paginatedProducts.forEach(product => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
            });
            
            // Show/hide load more button
            if (endIndex >= filteredProducts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    }
    
    function loadMoreProducts() {
        // Apply filters
        let filteredProducts = filterProducts();
        
        // Sort products
        sortProducts(filteredProducts);
        
        // Get next page of products
        const startIndex = (filterState.currentPage - 1) * filterState.itemsPerPage;
        const endIndex = filterState.currentPage * filterState.itemsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        
        // Render additional products
        paginatedProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
        
        // Show/hide load more button
        if (endIndex >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    function filterProducts() {
        return allProducts.filter(product => {
            // Search query
            if (filterState.searchQuery && 
                !product.name.toLowerCase().includes(filterState.searchQuery) && 
                !product.category.toLowerCase().includes(filterState.searchQuery)) {
                return false;
            }
            
            // Category filter
            if (filterState.category !== 'all' && product.category !== filterState.category) {
                return false;
            }
            
            // Price filter
            if (filterState.price !== 'all') {
                if (filterState.price === 'under-100' && product.price >= 100) {
                    return false;
                } else if (filterState.price === '100-150' && (product.price < 100 || product.price > 150)) {
                    return false;
                } else if (filterState.price === '150-200' && (product.price < 150 || product.price > 200)) {
                    return false;
                } else if (filterState.price === 'over-200' && product.price <= 200) {
                    return false;
                }
            }
            
            // Color filter
            if (filterState.color !== 'all' && product.color !== filterState.color) {
                return false;
            }
            
            return true;
        });
    }
    
    function sortProducts(products) {
        switch (filterState.sortBy) {
            case 'price-low-high':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                products.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
            case 'popularity':
            default:
                products.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
        }
    }
    
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;
        
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
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-icons">
                    <div class="product-icon heart-icon">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="product-icon share-icon">
                        <i class="fa-solid fa-share"></i>
                    </div>
                </div>
                ${product.isNew ? '<span class="product-badge new-badge">New</span>' : ''}
            </div>
            <div class="product-details">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    ${starsHtml}
                    <span>(${product.reviewCount})</span>
                </div>
                <div class="product-actions">
                    <a href="product-detail.html?id=${product.id}" class="view-btn">Xem chi tiết</a>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners for card actions
        const heartIcon = card.querySelector('.heart-icon');
        if (heartIcon) {
            heartIcon.addEventListener('click', function(event) {
                event.stopPropagation();
                
                // Get product ID from data attribute
                const productId = this.closest('.product-card').dataset.id;
                const heartIconElement = this.querySelector('i');
                
                // Get current wishlist
                let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                
                // Check if product is already in wishlist
                const isInWishlist = wishlist.includes(productId);
                
                if (isInWishlist) {
                    // Remove from wishlist
                    wishlist = wishlist.filter(id => id != productId);
                    
                    // Update UI
                    heartIconElement.classList.remove('fa-solid');
                    heartIconElement.classList.add('fa-regular');
                    heartIconElement.style.color = '';
                    
                    alert('Đã xóa khỏi danh sách yêu thích!');
                } else {
                    // Add to wishlist
                    wishlist.push(productId);
                    
                    // Update UI
                    heartIconElement.classList.remove('fa-regular');
                    heartIconElement.classList.add('fa-solid');
                    heartIconElement.style.color = '#c72092';
                    
                    alert('Đã thêm vào danh sách yêu thích!');
                }
                
                // Save updated wishlist
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                
                // Update wishlist count in navbar if function exists
                if (typeof window.updateWishlistCount === 'function') {
                    window.updateWishlistCount();
                }
            });
            
            // Set initial state of heart icon based on wishlist
            const productId = card.dataset.id;
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            
            if (wishlist.includes(productId)) {
                const heartIconElement = heartIcon.querySelector('i');
                heartIconElement.classList.remove('fa-regular');
                heartIconElement.classList.add('fa-solid');
                heartIconElement.style.color = '#c72092';
            }
        }
        
        const shareIcon = card.querySelector('.share-icon');
        if (shareIcon) {
            shareIcon.addEventListener('click', function(event) {
                event.stopPropagation();
                alert('Chia sẻ sản phẩm này!');
            });
        }
        
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                const productId = this.dataset.id;
                
                // Use the addToCart function from cart.js if available
                if (typeof window.addToCart === 'function') {
                    window.addToCart(productId, 1);
                } else {
                    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
                }
            });
        }
        
        // Make entire card clickable to go to product detail
        card.addEventListener('click', function(event) {
            if (!event.target.closest('.product-icon') && !event.target.closest('.add-to-cart-btn')) {
                window.location.href = `product-detail.html?id=${product.id}`;
            }
        });
        
        return card;
    }
    
    function updateFilterTags() {
        filterTags.innerHTML = '';
        
        // Add search query tag
        if (filterState.searchQuery) {
            addFilterTag('Tìm kiếm', filterState.searchQuery, () => {
                filterState.searchQuery = '';
                if (searchInput) searchInput.value = '';
                loadProducts();
                updateFilterTags();
            });
        }
        
        // Add category tag
        if (filterState.category !== 'all') {
            const categoryMap = {
                'running': 'Running',
                'basketball': 'Basketball',
                'casual': 'Casual',
                'training': 'Training'
            };
            
            addFilterTag('Danh mục', categoryMap[filterState.category], () => {
                filterState.category = 'all';
                if (categoryFilter) categoryFilter.value = 'all';
                loadProducts();
                updateFilterTags();
            });
        }
        
        // Add price tag
        if (filterState.price !== 'all') {
            const priceMap = {
                'under-100': 'Dưới $100',
                '100-150': '$100 - $150',
                '150-200': '$150 - $200',
                'over-200': 'Trên $200'
            };
            
            addFilterTag('Giá', priceMap[filterState.price], () => {
                filterState.price = 'all';
                if (priceFilter) priceFilter.value = 'all';
                loadProducts();
                updateFilterTags();
            });
        }
        
        // Add color tag
        if (filterState.color !== 'all') {
            const colorMap = {
                'black': 'Đen',
                'white': 'Trắng',
                'red': 'Đỏ',
                'blue': 'Xanh dương',
                'purple': 'Tím',
                'gray': 'Xám'
            };
            
            addFilterTag('Màu sắc', colorMap[filterState.color], () => {
                filterState.color = 'all';
                if (colorFilter) colorFilter.value = 'all';
                loadProducts();
                updateFilterTags();
            });
        }
    }
    
    function addFilterTag(type, value, removeCallback) {
        const tag = document.createElement('div');
        tag.className = 'filter-tag';
        tag.innerHTML = `${type}: ${value} <i class="fa-solid fa-times"></i>`;
        
        tag.querySelector('i').addEventListener('click', removeCallback);
        
        filterTags.appendChild(tag);
    }
    
    function resetFilters() {
        // Reset all filters to default
        filterState = {
            searchQuery: '',
            category: 'all',
            price: 'all',
            color: 'all',
            sortBy: 'popularity',
            currentPage: 1,
            itemsPerPage: 8
        };
        
        // Reset DOM elements
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = 'all';
        if (priceFilter) priceFilter.value = 'all';
        if (colorFilter) colorFilter.value = 'all';
        if (sortBy) sortBy.value = 'popularity';
        
        // Reload products and update filter tags
        loadProducts();
        updateFilterTags();
    }
});