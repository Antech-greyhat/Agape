// AGAPE FC - Main JavaScript

// Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Back to Top Button
const backToTop = document.createElement('div');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active Navigation Link
const currentLocation = location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
    }
});

// Match Highlights Carousel Auto-Play
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#matchHighlights');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    }
});

// Form Validation
const forms = document.querySelectorAll('.needs-validation');
forms.forEach(form => {
    form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
});

// Contact Form Submission
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (this.checkValidity()) {
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            this.classList.remove('was-validated');
        }
    });
}

// Newsletter Subscription
const newsletterForm = document.querySelector('#newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        }
    });
}

// Gallery Lightbox Effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // Create modal for image viewing
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        }
    });
});

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Item added to cart!');
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed';
    notification.style.cssText = 'top: 80px; right: 20px; z-index: 9999;';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add to Cart Buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = {
            id: this.dataset.id,
            name: this.dataset.name,
            price: parseFloat(this.dataset.price),
            image: this.dataset.image
        };
        addToCart(product);
    });
});

// Initialize cart display
updateCartDisplay();

// Ticket Quantity Selector
const quantityInputs = document.querySelectorAll('.quantity-input');
quantityInputs.forEach(input => {
    const minusBtn = input.previousElementSibling;
    const plusBtn = input.nextElementSibling;
    
    if (minusBtn) {
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
                updateTicketTotal();
            }
        });
    }
    
    if (plusBtn) {
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value);
            if (currentValue < 10) {
                input.value = currentValue + 1;
                updateTicketTotal();
            }
        });
    }
});

function updateTicketTotal() {
    const quantityInput = document.querySelector('.quantity-input');
    const priceElement = document.querySelector('.ticket-price');
    const totalElement = document.querySelector('.total-price');
    
    if (quantityInput && priceElement && totalElement) {
        const quantity = parseInt(quantityInput.value);
        const price = parseFloat(priceElement.dataset.price);
        const total = quantity * price;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

// Search Functionality
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

if (searchInput && searchButton) {
    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            // Implement search functionality
            console.log('Searching for:', query);
            alert(`Search results for: ${query}`);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Poll/Vote Functionality
const pollOptions = document.querySelectorAll('.poll-option');
pollOptions.forEach(option => {
    option.addEventListener('click', function() {
        if (!this.classList.contains('voted')) {
            pollOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            const voteButton = document.querySelector('.vote-button');
            if (voteButton) {
                voteButton.disabled = false;
            }
        }
    });
});

const voteButton = document.querySelector('.vote-button');
if (voteButton) {
    voteButton.addEventListener('click', function() {
        const selected = document.querySelector('.poll-option.selected');
        if (selected) {
            alert('Thank you for voting!');
            pollOptions.forEach(opt => opt.classList.add('voted'));
            this.disabled = true;
        }
    });
}

// Countdown Timer for Next Match
function updateCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (countdownElement) {
        const matchDate = new Date(countdownElement.dataset.date);
        const now = new Date();
        const diff = matchDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            countdownElement.innerHTML = `
                <div class="d-flex justify-content-center gap-3">
                    <div class="text-center">
                        <div class="display-4 fw-bold text-primary">${days}</div>
                        <div>Days</div>
                    </div>
                    <div class="text-center">
                        <div class="display-4 fw-bold text-primary">${hours}</div>
                        <div>Hours</div>
                    </div>
                    <div class="text-center">
                        <div class="display-4 fw-bold text-primary">${minutes}</div>
                        <div>Minutes</div>
                    </div>
                    <div class="text-center">
                        <div class="display-4 fw-bold text-primary">${seconds}</div>
                        <div>Seconds</div>
                    </div>
                </div>
            `;
        } else {
            countdownElement.innerHTML = '<p class="lead">Match is live now!</p>';
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Animation on Scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Mobile Menu Close on Link Click
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    const navItems = document.querySelectorAll('.navbar-nav .nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
}

console.log('AGAPE FC Website Loaded Successfully!');
