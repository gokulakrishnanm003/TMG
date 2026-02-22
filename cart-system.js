/**
 * Cart System for CLEANZOD
 * Manages shopping cart state and UI across product pages
 */

const CartSystem = {
    items: [],

    // Initialize cart from localStorage
    init() {
        const stored = localStorage.getItem('cleanzod_cart');
        this.items = stored ? JSON.parse(stored) : [];
        this.refreshUI();
    },

    // Save cart to localStorage
    save() {
        localStorage.setItem('cleanzod_cart', JSON.stringify(this.items));
    },

    // Add item to cart
    addItem(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                category: product.category,
                qty: 1
            });
        }
        this.save();
        this.refreshUI();

        // Show the cart drawer
        const drawer = document.getElementById('cartDrawer');
        if (drawer) {
            drawer.classList.add('active');
            const backdrop = document.getElementById('drawerBackdrop');
            if (backdrop) {
                backdrop.style.display = 'block';
                setTimeout(() => backdrop.style.opacity = '1', 10);
            }
        }
    },

    // Buy Now - clear cart and add one item
    buyNow(product) {
        this.items = [{
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            category: product.category,
            qty: 1
        }];
        this.save();
        this.refreshUI();
    },

    // Change quantity of an item
    changeQty(id, delta) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                this.items = this.items.filter(i => i.id !== id);
            }
        }
        this.save();
        this.refreshUI();
    },

    // Clear all items
    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.items = [];
            this.save();
            this.refreshUI();
        }
    },

    // Get all items
    getItems() {
        return this.items;
    },

    // Get total number of items
    getTotalCount() {
        return this.items.reduce((sum, item) => sum + item.qty, 0);
    },

    // Get total price
    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    // Refresh the UI components (counters, drawer)
    refreshUI() {
        const count = this.getTotalCount();
        const total = this.getTotalPrice();

        // Update count badges
        const countElems = document.querySelectorAll('#cartCount');
        countElems.forEach(el => el.textContent = count);

        // Update total display
        const totalElem = document.getElementById('total');
        if (totalElem) totalElem.textContent = `₹${total}`;

        // Update cart body
        const cartBody = document.getElementById('cartBody');
        const emptyMessage = document.getElementById('emptyCartMessage');

        if (cartBody) {
            // Keep the empty message element if it exists
            const msgHtml = emptyMessage ? emptyMessage.outerHTML : '';

            // Rebuild the items list
            // Note: We avoid clearing total innerHTML to keep the message element functional
            // We'll manually manage the item rows

            // Remove existing items (divs with class cart-item)
            const existingItems = cartBody.querySelectorAll('.cart-item');
            existingItems.forEach(el => el.remove());

            if (this.items.length === 0) {
                const msg = document.getElementById('emptyCartMessage');
                if (msg) msg.style.display = 'block';
            } else {
                const msg = document.getElementById('emptyCartMessage');
                if (msg) msg.style.display = 'none';

                this.items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'cart-item';
                    itemDiv.innerHTML = `
                        <img src="${item.img}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        <div class="flex-grow-1">
                            <h6 class="fw-bold mb-0 small">${item.name}</h6>
                            <small class="text-muted">₹${item.price} × ${item.qty}</small>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                             <button class="btn btn-sm btn-outline-primary rounded-circle" onclick="changeQty('${item.id}', -1)" style="width: 30px; height: 30px; padding: 0; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-minus small"></i>
                             </button>
                             <span class="fw-bold">${item.qty}</span>
                             <button class="btn btn-sm btn-outline-primary rounded-circle" onclick="changeQty('${item.id}', 1)" style="width: 30px; height: 30px; padding: 0; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-plus small"></i>
                             </button>
                        </div>
                    `;
                    cartBody.appendChild(itemDiv);
                });
            }
        }
    },

    // Alias for init to match page calls
    initDrawer() {
        this.init();
    }
};

// Map global changeQty to CartSystem for inline onclicks
window.changeQty = (id, delta) => CartSystem.changeQty(id, delta);
