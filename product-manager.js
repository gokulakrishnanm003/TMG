// Product Management System for GENZO Admin Dashboard
// Manages products for multiple pages/categories

const productCategories = {
    'allliquid': {
        key: 'all_liquid_products_v4',
        label: 'All Liquid Products',
        defaults: [
            { name: "Surface Cleaner - 1L", price: 179, qty: 0, img: "img/home cleaner.jpeg", about: "Premium 1L surface cleaner for daily cleaning and hygiene. Powerful on stains, gentle on surfaces.", bestSeller: true, innovative: true },
            { name: "Surface Cleaner - 500ml", price: 90, qty: 0, img: "img/Home-wash-500ml.jpeg", about: "Effective 500ml surface cleaner solution for spotless surfaces and long-lasting freshness.", bestSeller: true, innovative: true },
            { name: "Surface Cleaner - 200ml", price: 41, qty: 0, img: "img/Home-wash-250ml.jpeg", about: "Compact 200ml surface cleaner, perfect for small cleaning tasks and travel convenience.", innovative: true },
            { name: "Liquid Detergent - 1L", price: 112, qty: 0, img: "img/detergent wash.jpeg", about: "Premium 1L liquid detergent formulated for deep cleaning and long-lasting fabric protection.", bestSeller: true, innovative: true },
            { name: "Liquid Detergent - 500ml", price: 67, qty: 0, img: "img/Detergent-liquid-500ml.png", about: "Powerful 500ml detergent liquid that removes tough stains without damaging fabric colors.", bestSeller: true, innovative: true },
            { name: "Dish Wash Liquid - 500ml", price: 79, qty: 0, img: "img/dish-wash-1.png", about: "Powerful grease-cutting formula with fresh orange extracts. Deep cleans like never before.", bestSeller: true, innovative: true },
            { name: "Dish Wash Liquid - 1L", price: 133, qty: 0, img: "img/dish wash.jpeg", about: "Gentle on hands, tough on grime. Our most advanced dishwashing liquid with lasting protection.", innovative: true },
            { name: "Toilet Cleaner - 1L", price: 119, qty: 0, img: "img/toilet cleaner.jpeg", about: "Premium 1L toilet cleaner for a sparkling clean and hygienic bathroom. Powerful stain removal.", bestSeller: true, innovative: true },
            { name: "Toilet Cleaner - 500ml", price: 69, qty: 0, img: "img/Toilet-wah-500ml.jpeg", about: "Powerful 500ml toilet wash that removes tough stains and leaves a fresh scent for hours.", bestSeller: true, innovative: true },
            { name: "Toilet Cleaner - 250ml", price: 39, qty: 0, img: "img/Toilet-wah-250ml.jpeg", about: "Convenient 250ml size toilet cleaner, perfect for specific cleaning needs and small bathrooms.", innovative: true }
        ]
    },
    'homewash': {
        key: 'homewash_v4_products',
        label: 'Surface Cleaner Products',
        defaults: [
            { name: "Surface Cleaner - 1L", price: 179, qty: 0, img: "img/home cleaner.jpeg", about: "Premium 1L surface cleaner for daily cleaning and hygiene. Powerful on stains, gentle on surfaces.", bestSeller: true, innovative: true },
            { name: "Surface Cleaner - 500ml", price: 90, qty: 0, img: "img/Home-wash-500ml.jpeg", about: "Effective 500ml surface cleaner solution for spotless surfaces and long-lasting freshness.", bestSeller: true, innovative: true },
            { name: "Surface Cleaner - 200ml", price: 41, qty: 0, img: "img/Home-wash-250ml.jpeg", about: "Compact 200ml surface cleaner, perfect for small cleaning tasks and travel convenience.", innovative: true }
        ]
    },
    'clothwash': {
        key: 'clothwash_v2_products',
        label: 'Liquid Detergent Products',
        defaults: [
            { name: "Liquid Detergent - 1L", price: 112, qty: 0, img: "img/detergent wash.jpeg", about: "Premium 1L liquid detergent formulated for deep cleaning and long-lasting fabric protection.", bestSeller: true, innovative: true },
            { name: "Liquid Detergent - 500ml", price: 67, qty: 0, img: "img/Detergent-liquid-500ml.png", about: "Powerful 500ml detergent liquid that removes tough stains without damaging fabric colors.", bestSeller: true, innovative: true }
        ]
    },
    'sopeoil': {
        key: 'dishwash_final_products_v3',
        label: 'Dish Wash Products',
        defaults: [
            { name: "Dish Wash Liquid - 500ml", price: 79, qty: 0, img: "img/dish-wash-1.png", about: "Powerful grease-cutting formula with fresh orange extracts. Deep cleans like never before.", bestSeller: true, innovative: true },
            { name: "Dish Wash Liquid - 1L", price: 133, qty: 0, img: "img/dish wash.jpeg", about: "Gentle on hands, tough on grime. Our most advanced dishwashing liquid with lasting protection.", innovative: true }
        ]
    },
    'bulkpro': {
        key: 'bulkpro_products',
        label: 'Bulk Pro Products',
        defaults: [
            { name: "Bulk Sope Oil - 100L", price: 2300, qty: 0, img: "img/bulk.jpg", about: "100‑litre commercial sope oil for industrial usage.", bestSeller: true },
            { name: "Bulk Cleaning Oil - 100L", price: 2100, qty: 0, img: "img/homegenzoman.jpg", about: "100‑litre industrial cleaning oil for facilities management." },
            { name: "Bulk Sanitizer - 50L", price: 4500, qty: 0, img: "img/sanitaizer1.jpg", about: "50-litre bulk sanitizer for large public areas.", bestSeller: true },
            { name: "Bulk Floor Washer - 100L", price: 3500, qty: 0, img: "img/chlorine1.jpg", about: "100‑litre industrial floor cleaning liquid." },
            { name: "Bulk Bleaching Liquid - 50L", price: 2800, qty: 0, img: "img/bleach1.png", about: "50-litre concentrated bleaching solution." },
            { name: "Bulk Dish Wash - 50L", price: 4000, qty: 0, img: "img/sanitaizer2.jpg", about: "50-litre wholesale dish washing liquid for restaurants." }
        ]
    },
    'bulk': {
        key: 'bulk_products',
        label: 'Bulk Market Products',
        defaults: [
            { name: "Sope Oil", price: 200, qty: 0, img: "https://via.placeholder.com/300x180?text=Sope+Oil", about: "Cost-effective sope oil for general purpose." },
            { name: "Cleaning Oil", price: 180, qty: 0, img: "https://via.placeholder.com/300x180?text=Cleaning+Oil", about: "Standard cleaning oil." },
            { name: "Bleaching Oil", price: 220, qty: 0, img: "https://via.placeholder.com/300x180?text=Bleaching+Oil", about: "Industrial bleaching agent." },
            { name: "Sanitizer", price: 150, qty: 0, img: "https://via.placeholder.com/300x180?text=Sanitizer", about: "Hand and surface sanitizer." },
            { name: "Rose Water", price: 120, qty: 0, img: "https://via.placeholder.com/300x180?text=Rose+Water", about: "Fragrant rose water." },
            { name: "Organic Fertilizer", price: 200, qty: 0, img: "https://via.placeholder.com/300x180?text=Organic+Fertilizer", about: "Chemical-free fertilizer." },
            { name: "Wheat Seeds", price: 150, qty: 0, img: "https://via.placeholder.com/300x180?text=Wheat+Seeds", about: "High-yield wheat seeds." },
            { name: "Corn Seeds", price: 180, qty: 0, img: "https://via.placeholder.com/300x180?text=Corn+Seeds", about: "Premium corn seeds." },
            { name: "Rice Seeds", price: 170, qty: 0, img: "https://via.placeholder.com/300x180?text=Rice+Seeds", about: "Quality rice seeds." },
            { name: "Tomato Seeds", price: 120, qty: 0, img: "https://via.placeholder.com/300x180?text=Tomato+Seeds", about: "Hybrid tomato seeds." },
            { name: "Potato Seeds", price: 130, qty: 0, img: "https://via.placeholder.com/300x180?text=Potato+Seeds", about: "Disease-resistant potato seeds." },
            { name: "Sunflower Oil", price: 200, qty: 0, img: "https://via.placeholder.com/300x180?text=Sunflower+Oil", about: "Pure sunflower cooking oil." },
            { name: "Mustard Oil", price: 190, qty: 0, img: "https://via.placeholder.com/300x180?text=Mustard+Oil", about: "Cold-pressed mustard oil." },
            { name: "Coconut Oil", price: 210, qty: 0, img: "https://via.placeholder.com/300x180?text=Coconut+Oil", about: "Virgin coconut oil." },
            { name: "Castor Oil", price: 220, qty: 0, img: "https://via.placeholder.com/300x180?text=Castor+Oil", about: "Industrial grade castor oil." }
        ]
    },
    'bleching': {
        key: 'toilet_cleaner_v3_products',
        label: 'Toilet Cleaner Products',
        defaults: [
            { name: "Toilet Cleaner - 1L", price: 119, qty: 0, img: "img/toilet cleaner.jpeg", about: "Premium 1L toilet cleaner for a sparkling clean and hygienic bathroom. Powerful stain removal.", bestSeller: true, innovative: true },
            { name: "Toilet Cleaner - 500ml", price: 69, qty: 0, img: "img/Toilet-wah-500ml.jpeg", about: "Powerful 500ml toilet wash that removes tough stains and leaves a fresh scent for hours.", bestSeller: true, innovative: true },
            { name: "Toilet Cleaner - 250ml", price: 39, qty: 0, img: "img/Toilet-wah-250ml.jpeg", about: "Convenient 250ml size toilet cleaner, perfect for specific cleaning needs and small bathrooms.", innovative: true }
        ]
    }
};

let currentCategory = 'homewash';

// Initialize products for a specific category
function initializeCategory(category = 'homewash') {
    const config = productCategories[category];
    if (!config) return [];

    const stored = localStorage.getItem(config.key);
    if (!stored) {
        localStorage.setItem(config.key, JSON.stringify(config.defaults));
        return config.defaults;
    }
    return JSON.parse(stored);
}

// Get all products for the current category
function getAllProducts(category = currentCategory) {
    return initializeCategory(category);
}

// Save products to localStorage
function saveProductsToStorage(products, category = currentCategory) {
    const config = productCategories[category];
    localStorage.setItem(config.key, JSON.stringify(products));
}


// Switch Category in Admin Panel
function switchCategory(category) {
    currentCategory = category;

    // Update tabs UI
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active', 'bg-primary', 'text-white');
        tab.classList.add('bg-light', 'text-dark');
        if (tab.dataset.category === category) {
            tab.classList.remove('bg-light', 'text-dark');
            tab.classList.add('active', 'bg-primary', 'text-white');
        }
    });

    // Update Header
    const config = productCategories[category];
    const headerTitle = document.getElementById('productsHeaderTitle') || document.getElementById('productSectionTitle');
    if (headerTitle) headerTitle.textContent = config.label;

    renderProductsTable();
}

// Toggle product form visibility
function toggleProductForm() {
    const form = document.getElementById('productForm');
    if (form.style.display === 'none') {
        form.style.display = 'block';
        // Clear form
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productAbout').value = '';
        document.getElementById('productImg').value = '';
        document.getElementById('productBestSeller').value = 'false';
    } else {
        form.style.display = 'none';
    }
}

// Save new product
function saveProduct() {
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const about = document.getElementById('productAbout').value.trim();
    const fileInput = document.getElementById('productImg');
    const bestSeller = document.getElementById('productBestSeller').value === 'true';

    // Validation
    if (!name || !price || !about) {
        alert('Please fill in all text fields!');
        return;
    }

    if (price <= 0) {
        alert('Price must be greater than 0!');
        return;
    }

    if (fileInput.files.length === 0) {
        alert('Please select an image file!');
        return;
    }

    const file = fileInput.files[0];

    // Check file size (limit to ~500KB to be safe with localStorage)
    if (file.size > 500 * 1024) {
        alert('Image file is too large! Please upload an image smaller than 500KB.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const imgBase64 = e.target.result;

        // Get existing products
        const products = getAllProducts();

        // Add new product
        products.push({
            name: name,
            price: price,
            img: imgBase64,
            about: about,
            qty: 0,
            bestSeller: bestSeller
        });

        // Save to localStorage
        saveProductsToStorage(products);

        // Refresh display
        renderProductsTable();

        // Hide form
        toggleProductForm();

        // Show success message
        alert('Product added successfully!');
    };

    reader.onerror = function () {
        alert('Error reading file!');
    };

    reader.readAsDataURL(file);
}

// Delete product
function deleteProduct(index) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }

    const products = getAllProducts();
    products.splice(index, 1);
    saveProductsToStorage(products);
    renderProductsTable();

    alert('Product deleted successfully!');
}

// Render products table
function renderProductsTable() {
    const products = getAllProducts();
    const tbody = document.getElementById('productsBody');
    const noProducts = document.getElementById('noProducts');

    if (!tbody) return; // Guard clause if running on non-admin pages

    if (products.length === 0) {
        tbody.innerHTML = '';
        if (noProducts) noProducts.style.display = 'block';
        return;
    }

    if (noProducts) noProducts.style.display = 'none';

    tbody.innerHTML = products.map((product, index) => `
        <tr>
            <td>
                <img src="${product.img}" alt="${product.name}" 
                     style="width: 60px; height: 60px; object-fit: cover; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            </td>
            <td class="fw-semibold">${product.name}</td>
            <td class="fw-bold" style="color: var(--primary);">₹${product.price}</td>
            <td style="max-width: 300px;">
                <small class="text-muted">${product.about ? product.about.substring(0, 80) : ''}${product.about && product.about.length > 80 ? '...' : ''}</small>
            </td>
            <td>
                ${product.bestSeller ?
            '<span class="status-badge" style="background: #ecfdf5; color: #065f46;">Yes</span>' :
            '<span class="status-badge status-pending">No</span>'}
            </td>
            <td class="text-end">
                <button class="action-icon btn-delete" onclick="deleteProduct(${index})" title="Delete Product">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Show/Hide page sections (Dashboard, Products)
function showSection(section) {
    const ordersSection = document.getElementById('ordersSection');
    const productsSection = document.getElementById('productsSection');

    // Update sidebar active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    if (section === 'orders') {
        ordersSection.style.display = 'block';
        productsSection.style.display = 'none';
        document.querySelector('[onclick*="orders"]').classList.add('active');
    } else if (section === 'products') {
        ordersSection.style.display = 'none';
        productsSection.style.display = 'block';
        document.querySelector('[onclick*="products"]').classList.add('active');

        // Render initial category
        renderProductsTable();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Determine which page we are on to initialize the correct products
    // For admin dashboard, we might want to initialize all or wait for tab selection
    // For product pages, we initialize specifically their category

    const path = window.location.pathname;

    if (path.includes('all-liquid.html')) {
        initializeCategory('allliquid');
    } else if (path.includes('home-wash.html')) {
        initializeCategory('homewash');
    } else if (path.includes('detergent-liquid.html')) {
        initializeCategory('clothwash');
    } else if (path.includes('dish-wash.html')) {
        initializeCategory('sopeoil');
    } else if (path.includes('bulkpro.html')) {
        initializeCategory('bulkpro');
    } else if (path.includes('bulk.html')) {
        initializeCategory('bulk');
    } else if (path.includes('toilet-cleaner.html')) {
        initializeCategory('bleching');
    } else {
        // Admin dashboard or index, initialize all just in case
        Object.keys(productCategories).forEach(cat => initializeCategory(cat));
    }
});

// ===== HOMEPAGE INTEGRATION =====
// Function to get distinct 'Best Seller' products across ALL categories
function getGlobalBestSellers() {
    let bestSellers = [];
    const categories = Object.keys(productCategories);

    categories.forEach(cat => {
        const products = initializeCategory(cat);
        const topProducts = products.filter(p => p.bestSeller);
        // Add category key to product for link redirection
        topProducts.forEach(p => p.categoryKey = cat);
        bestSellers = bestSellers.concat(topProducts);
    });

    // Shuffle and pick top 3 (Fisher-Yates shuffle)
    for (let i = bestSellers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bestSellers[i], bestSellers[j]] = [bestSellers[j], bestSellers[i]];
    }

    return bestSellers.slice(0, 3);
}

// Render Featured Products on Index Page
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products-container');
    if (!container) return;

    const featuredProducts = getGlobalBestSellers();

    // Clear static content
    container.innerHTML = '';

    if (featuredProducts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">New premium products coming soon!</p></div>';
        return;
    }

    // Pick 3 random
    const displayProducts = featuredProducts.slice(0, 3);

    displayProducts.forEach(p => {
        let link = 'sopeoil.html';
        let categoryLabel = 'Multi-Purpose';

        if (p.categoryKey === 'homewash') { link = 'home-wash.html'; categoryLabel = 'Floor & Bath'; }
        else if (p.categoryKey === 'clothwash') { link = 'detergent-liquid.html'; categoryLabel = 'Cloth Care'; }
        else if (p.categoryKey === 'sopeoil') { link = 'dish-wash.html'; categoryLabel = 'Vehicle & Home'; }
        else if (p.categoryKey === 'bulkpro') { link = 'bulkpro.html'; categoryLabel = 'Industrial Pro'; }
        else if (p.categoryKey === 'bulk') { link = 'bulk.html'; categoryLabel = 'Wholesale Bulk'; }
        else if (p.categoryKey === 'bleching') { link = 'toilet-cleaner.html'; categoryLabel = 'Disinfection'; }

        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 slide-up';
        col.innerHTML = `
            <div class="product-card-modern">
                <div class="product-card-img">
                    <img src="${p.img}" alt="${p.name}">
                    <span class="product-badge">Best Seller</span>
                    <div class="product-img-overlay">
                        <a href="${link}" class="product-quick-view"><i class="fas fa-eye"></i></a>
                    </div>
                </div>
                <div class="product-card-body">
                    <span class="product-category">${categoryLabel}</span>
                    <h4 class="product-name">${p.name}</h4>
                    <p class="product-desc">${p.about.substring(0, 100)}${p.about.length > 100 ? '...' : ''}</p>
                    <a href="${link}" class="product-cta">VIEW OPTIONS <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        container.appendChild(col);

        // Connect to the global scroll observer for on-scroll animations
        if (window.scrollObserver) {
            window.scrollObserver.observe(col);
        }
    });
}

// Auto-run on index page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('featured-products-container')) {
        renderFeaturedProducts();
    }
});
