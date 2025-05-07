// Login authentication and UI update functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page content is loaded
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 800); // Show loading screen for at least 800ms
    }
    
    // Hardcoded user data for testing (simulating data from users.json)
    const usersData = {
        "users": [
            {
                "id": 1,
                "username": "john_smith",
                "email": "john.smith@example.com",
                "password": "hashed_password_1",
                "firstName": "John",
                "lastName": "Smith",
                "profileImage": "image/man_dp1.jpg"
            },
            {
                "id": 2,
                "username": "emma_johnson",
                "email": "emma.johnson@example.com",
                "password": "hashed_password_2",
                "firstName": "Emma",
                "lastName": "Johnson",
                "profileImage": "image/girl_dp1.jpg"
            },
            {
                "id": 3,
                "username": "michael_brown",
                "email": "michael.brown@example.com",
                "password": "hashed_password_3",
                "firstName": "Michael",
                "lastName": "Brown",
                "profileImage": "image/man_dp2.jpg"
            }
        ]
    };
    
    // Handle login form submission
    const loginForm = document.querySelector('.login_form form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form inputs
            const emailInput = document.querySelector('.login_form input[name="email"]');
            const passwordInput = document.querySelector('.login_form input[name="password"]');
            
            if (!emailInput || !passwordInput) return;
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            // Validate input
            if (!email || !password) {
                showNotification('Please enter both email and password', 'Login Failed', 'error');
                return;
            }
            
            // Find user with matching email from our hardcoded data
            const user = usersData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
            
            if (user && user.password === password) { // In real app, use proper password hashing
                // Login successful
                const userData = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profileImage: user.profileImage
                };
                
                // Save user data to localStorage
                localStorage.setItem('currentUser', JSON.stringify(userData));
                // Also save the user ID separately for cart functionality
                localStorage.setItem('loggedInUserId', user.id);
                
                // Reset form
                loginForm.reset();
                
                // Show success message
                showNotification(`Welcome back, ${user.firstName}!`, 'Login Successful', 'success');
                
                // Update UI to show logged-in state
                updateUIForLoggedInUser(userData);
                
                // Scroll to top of page
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Login failed
                showNotification('Incorrect email or password. Please try again.', 'Login Failed', 'error');
            }
        });
    }
    
    // Check if user is already logged in on page load
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    }
    
    // Function to update UI for logged-in user
    function updateUIForLoggedInUser(user) {
        // Update user dropdown
        const userDropdown = document.querySelector('.user-dropdown');
        if (userDropdown) {
            // Change user icon to have a logged-in indicator
            const userIcon = userDropdown.querySelector('i.fa-user');
            if (userIcon) {
                userIcon.className = 'fa-solid fa-user-check';
                userIcon.style.color = '#c72092';
            }
            
            // Update dropdown menu
            const dropdownMenu = userDropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                // Clear existing dropdown items
                dropdownMenu.innerHTML = `
                    <div class="user-welcome">
                        <img src="${user.profileImage}" alt="${user.firstName}" class="mini-avatar">
                        <div>
                            <p>Hello,</p>
                            <strong>${user.firstName} ${user.lastName}</strong>
                        </div>
                    </div>
                    <a href="profile.html"><i class="fa-solid fa-user-pen"></i> My Profile</a>
                    <a href="#"><i class="fa-solid fa-box"></i> My Orders</a>
                    <a href="#"><i class="fa-solid fa-heart"></i> Wishlist</a>
                    <a href="#"><i class="fa-solid fa-gear"></i> Settings</a>
                    <a href="#" class="logout-btn"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
                `;
                
                // Add logout handler
                const logoutBtn = dropdownMenu.querySelector('.logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Clear user data from localStorage
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('loggedInUserId');
                        
                        // Reset UI
                        resetUIForLoggedOutUser();
                        
                        // Show message
                        alert('You have successfully logged out.');
                    });
                }
            }
        }
        
        // Hide login form section if user is logged in
        const loginFormSection = document.querySelector('.login_form');
        if (loginFormSection) {
            loginFormSection.style.display = 'none';
        }
    }
    
    // Function to reset UI for logged-out user
    function resetUIForLoggedOutUser() {
        const userDropdown = document.querySelector('.user-dropdown');
        if (userDropdown) {
            // Reset user icon
            const userIcon = userDropdown.querySelector('i.fa-user-check');
            if (userIcon) {
                userIcon.className = 'fa-solid fa-user';
                userIcon.style.color = '';
            }
            
            // Reset dropdown menu to default
            const dropdownMenu = userDropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.innerHTML = `
                    <a href="profile.html"><i class="fa-solid fa-user-pen"></i> My Profile</a>
                    <a href="#"><i class="fa-solid fa-box"></i> My Orders</a>
                    <a href="#"><i class="fa-solid fa-heart"></i> Wishlist</a>
                    <a href="#"><i class="fa-solid fa-gear"></i> Settings</a>
                    <a href="#" class="login-link"><i class="fa-solid fa-right-to-bracket"></i> Login</a>
                    <a href="register.html"><i class="fa-solid fa-user-plus"></i> Register</a>
                `;
                
                // Re-add login link handler
                const loginLink = dropdownMenu.querySelector('.login-link');
                if (loginLink) {
                    loginLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        const loginForm = document.querySelector('.login_form');
                        if (loginForm) {
                            loginForm.scrollIntoView({ behavior: 'smooth' });
                        }
                    });
                }
            }
        }
        
        // Show login form section if user is logged out
        const loginFormSection = document.querySelector('.login_form');
        if (loginFormSection) {
            loginFormSection.style.display = 'flex';
        }
    }
});