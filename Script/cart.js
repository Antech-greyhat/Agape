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

    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    if (cartItemsContainer && cartTotalElement) {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-muted mt-4">Your cart is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const itemElement = document.createElement('div');
                itemElement.className = 'd-flex align-items-center mb-3 pb-3 border-bottom';
                itemElement.innerHTML = `
                    <div class="flex-grow-1">
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">Ksh ${item.price.toFixed(2)} x ${item.quantity}</small>
                    </div>
                    <div class="ms-2 text-end">
                        <div class="fw-bold mb-1">Ksh ${itemTotal.toFixed(2)}</div>
                        <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    removeFromCart(index);
                });
            });
        }
        cartTotalElement.textContent = `Ksh ${total.toFixed(2)}`;
    }
}

function showConfirmModal(message, onConfirm) {
    let modalElement = document.getElementById('cartConfirmModal');
    if (!modalElement) {
        modalElement = document.createElement('div');
        modalElement.className = 'modal fade';
        modalElement.id = 'cartConfirmModal';
        modalElement.tabIndex = -1;
        modalElement.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title"><i class="fas fa-exclamation-triangle me-2"></i>Confirm Action</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body fs-5" id="cartConfirmModalBody"></div>
                    <div class="modal-footer pb-0 bg-light border-0">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" id="cartConfirmModalBtn">Confirm</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalElement);
    }
    
    document.getElementById('cartConfirmModalBody').textContent = message;
    
    // Clean up old event listeners on the confirm button by replacing it
    const oldBtn = document.getElementById('cartConfirmModalBtn');
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);
    
    const modalInstance = new bootstrap.Modal(modalElement);
    
    newBtn.addEventListener('click', () => {
        modalInstance.hide();
        onConfirm();
    });
    
    modalInstance.show();
}

function removeFromCart(index) {
    if (index > -1 && index < cart.length) {
        const removedItem = cart[index];
        showConfirmModal(`Are you sure you want to remove "${removedItem.name}" from your cart?`, () => {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            showNotification(`${removedItem.name} removed from cart.`);
        });
    }
}

function clearCart() {
    if (cart.length > 0) {
        showConfirmModal('Are you sure you want to completely clear your cart?', () => {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            showNotification('Cart has been cleared.');
        });
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

// Shop Filtering
function filterShop(category) {
    console.log('Filtering by:', category);
    document.querySelectorAll('.btn-group button').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });
    event.target.classList.remove('btn-outline-primary');
    event.target.classList.add('btn-primary');
}

function initCart() {
    // Add to Cart Buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image
            };
            addToCart(product);
        });
    });

    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                alert('Proceeding to checkout...');
            } else {
                alert('Your cart is empty!');
            }
        });
    }

    // Initialize cart display
    updateCartDisplay();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
} else {
    initCart();
}
