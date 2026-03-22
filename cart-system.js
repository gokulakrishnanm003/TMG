/**
 * Cart System for GENZO
 * Manages shopping cart state and UI across product pages
 */

const CartSystem = {
    items: [],

    // Initialize cart from localStorage
    init() {
        const stored = localStorage.getItem('genzo_cart');
        this.items = stored ? JSON.parse(stored) : [];
        this.refreshUI();
    },

    // Save cart to localStorage
    save() {
        localStorage.setItem('genzo_cart', JSON.stringify(this.items));
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

        // Show a small notification instead of the drawer
        this.showToast(product.name);
    },

    // Show a floating toast notification
    showToast(name) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #11998e;
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
            font-size: 0.85rem;
            transform: translateX(120%);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: none;
        `;
        toast.innerHTML = `<i class="fa fa-check-circle fs-5"></i> <span>"${name}" Added to Cart</span>`;
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => toast.style.transform = 'translateX(0)', 10);

        // Animate out and remove
        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => toast.remove(), 400);
        }, 3000);
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
            // Remove existing items (divs with class cart-item)
            const existingItems = cartBody.querySelectorAll('.cart-item');
            existingItems.forEach(el => el.remove());

            if (this.items.length === 0) {
                if (emptyMessage) emptyMessage.style.display = 'block';
            } else {
                if (emptyMessage) emptyMessage.style.display = 'none';

                this.items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'cart-item slide-up visible';
                    itemDiv.innerHTML = `
                        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-info flex-grow-1">
                            <h6 class="mb-1">${item.name}</h6>
                            <small>₹${item.price} per unit</small>
                        </div>
                        <div class="qty-control">
                             <button class="qty-btn" onclick="changeQty('${item.id}', -1)">
                                <i class="fas fa-minus"></i>
                             </button>
                             <span class="fw-bold small">${item.qty}</span>
                             <button class="qty-btn" onclick="changeQty('${item.id}', 1)">
                                <i class="fas fa-plus"></i>
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
