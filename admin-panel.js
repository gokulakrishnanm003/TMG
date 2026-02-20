// ===== AUTHENTICATION =====
function checkAdminSession() {
    const adminSession = localStorage.getItem('adminSession');
    const sessionTime = localStorage.getItem('adminSessionTime');

    if (!adminSession || !sessionTime) {
        window.location.href = 'admin-login.html';
        return false;
    }

    // Check if session is still valid (24 hours)
    const currentTime = new Date().getTime();
    const sessionAge = currentTime - parseInt(sessionTime);
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (sessionAge >= twentyFourHours) {
        localStorage.removeItem('adminSession');
        localStorage.removeItem('adminSessionTime');
        window.location.href = 'admin-login.html';
        return false;
    }

    return true;
}

function logout() {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminSessionTime');
    localStorage.removeItem('adminUsername');
    window.location.href = 'admin-login.html';
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAdminSession()) return;

    // Display admin name
    const adminUsername = localStorage.getItem('adminUsername');
    const adminNameElement = document.getElementById('adminName');
    if (adminNameElement) {
        adminNameElement.textContent = adminUsername;
    }

    // Load and display orders
    loadOrders();
    updateStats();
});

// ===== ORDER MANAGEMENT =====
function getOrders() {
    const orders = localStorage.getItem('allOrders');
    return orders ? JSON.parse(orders) : [];
}

function saveOrders(orders) {
    localStorage.setItem('allOrders', JSON.stringify(orders));
}

function loadOrders() {
    const orders = getOrders();
    displayOrders(orders);
}

function displayOrders(orders) {
    const tbody = document.getElementById('ordersBody');
    const noOrders = document.getElementById('noOrders');

    if (!tbody) return;
    tbody.innerHTML = '';

    if (orders.length === 0) {
        if (noOrders) noOrders.style.display = 'block';
        return;
    }

    if (noOrders) noOrders.style.display = 'none';

    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        const formattedDate = new Date(order.orderDate).toLocaleDateString('en-IN');
        const statusClass = `status-${order.status}`;

        row.innerHTML = `
            <td><span class="order-id-badge">#${String(index + 1).padStart(5, '0')}</span></td>
            <td><div class="fw-bold text-dark">${order.customerName}</div></td>
            <td>
                <div class="small fw-medium">${order.email}</div>
                <div class="small text-muted">${order.phone}</div>
            </td>
            <td><div class="fw-bold text-primary">₹${parseFloat(order.totalAmount).toFixed(2)}</div></td>
            <td><span class="status-badge ${statusClass}">${order.status.toUpperCase()}</span></td>
            <td><div class="small text-muted">${formattedDate}</div></td>
            <td class="text-end">
                <div class="d-flex justify-content-end gap-2">
                    <button class="action-btn btn-view" title="View Details" onclick="viewOrder(${index})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn btn-delete" title="Delete Order" onclick="confirmDelete(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function viewOrder(index) {
    const orders = getOrders();
    const order = orders[index];
    const modalBody = document.getElementById('orderModalBody');
    const statusSelect = document.getElementById('statusSelect');

    // Store current order index for updates
    window.currentOrderIndex = index;

    // Calculate total items
    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);

    // Build product list HTML
    let productHTML = '';
    order.items.forEach(item => {
        productHTML += `
            <div class="product-item">
                <div>
                    <strong>${item.name}</strong>
                    <br>
                    <small>Qty: ${item.quantity}</small>
                </div>
                <div>
                    <strong>₹${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            </div>
        `;
    });

    const addressHTML = order.address ? `
        <div class="order-detail">
            <div class="detail-label">Delivery Address</div>
            <div class="detail-value">${order.address}</div>
        </div>
    ` : '';

    const notesHTML = order.notes ? `
        <div class="order-detail">
            <div class="detail-label">Special Notes</div>
            <div class="detail-value">${order.notes}</div>
        </div>
    ` : '';

    modalBody.innerHTML = `
        <div class="order-detail">
            <div class="detail-label">Order ID</div>
            <div class="detail-value">#${String(index + 1).padStart(5, '0')}</div>
        </div>
        
        <div class="order-detail">
            <div class="detail-label">Customer Name</div>
            <div class="detail-value">${order.customerName}</div>
        </div>
        
        <div class="order-detail">
            <div class="detail-label">Email</div>
            <div class="detail-value">${order.email}</div>
        </div>
        
        <div class="order-detail">
            <div class="detail-label">Phone Number</div>
            <div class="detail-value">${order.phone}</div>
        </div>
        
        ${addressHTML}
        
        ${notesHTML}
        
        <div class="order-detail">
            <div class="detail-label">Order Date</div>
            <div class="detail-value">${new Date(order.orderDate).toLocaleString('en-IN')}</div>
        </div>
        
        <div class="order-detail">
            <div class="detail-label">Items Ordered (${totalItems} items)</div>
            <div class="product-list">
                ${productHTML}
            </div>
        </div>
        
        <div class="order-detail">
            <div class="detail-label">Total Amount</div>
            <div class="detail-value" style="color: #5EB09F; font-size: 1.5rem;">₹${parseFloat(order.totalAmount).toFixed(2)}</div>
        </div>
        
        <div class="order-detail">
            <div class="detail-label">Payment Method</div>
            <div class="detail-value">${order.paymentMethod || 'Not specified'}</div>
        </div>
    `;

    // Set current status
    statusSelect.value = order.status;

    // Show modal
    document.getElementById('orderModal').style.display = 'block';
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    window.currentOrderIndex = null;
}

function updateOrderStatus(event) {
    const newStatus = event.target.value;
    const orders = getOrders();

    if (window.currentOrderIndex !== null) {
        orders[window.currentOrderIndex].status = newStatus;
        saveOrders(orders);
        loadOrders();
        updateStats();

        // Show success message
        alert(`Order status updated to ${newStatus.toUpperCase()}`);
    }
}

function confirmDelete(index) {
    if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
        deleteOrderByIndex(index);
    }
}

function deleteOrderByIndex(index) {
    const orders = getOrders();
    orders.splice(index, 1);
    saveOrders(orders);
    loadOrders();
    updateStats();
    closeOrderModal();
    alert('Order deleted successfully!');
}

function deleteOrder() {
    if (window.currentOrderIndex !== null) {
        confirmDelete(window.currentOrderIndex);
    }
}

// ===== STATISTICS =====
function updateStats() {
    const orders = getOrders();

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.totalAmount || 0), 0);

    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('pendingOrders').textContent = pendingOrders;
    document.getElementById('completedOrders').textContent = completedOrders;
    document.getElementById('totalRevenue').textContent = '₹' + totalRevenue.toFixed(2);
}

// ===== SEARCH & FILTER =====
function applyFilters() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    const statusFilter = document.getElementById('statusFilter').value;

    let orders = getOrders();

    // Filter by status
    if (statusFilter) {
        orders = orders.filter(o => o.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
        orders = orders.filter(o => {
            const orderIndex = getOrders().indexOf(o);
            const orderID = String(orderIndex + 1).padStart(5, '0');
            return orderID.includes(searchQuery) ||
                o.customerName.toLowerCase().includes(searchQuery) ||
                o.email.toLowerCase().includes(searchQuery) ||
                o.phone.includes(searchQuery);
        });
    }

    displayOrders(orders);
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('statusFilter').value = '';
    loadOrders();
}

function clearAllData() {
    if (confirm('⚠️ CAUTION: Are you sure you want to permanently DELETE ALL customer orders? This action cannot be reversed.')) {
        localStorage.removeItem('allOrders');
        loadOrders();
        updateStats();
        alert('All order records have been purged.');
    }
}

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    }
});

// ===== EXPORT TO CSV =====
function exportToCSV() {
    const orders = getOrders();

    if (orders.length === 0) {
        alert('No orders to export');
        return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';

    // Add headers
    const headers = ['Order ID', 'Customer Name', 'Email', 'Phone', 'Amount', 'Status', 'Date', 'Items', 'Address', 'Notes'];
    csvContent += headers.join(',') + '\n';

    // Add rows
    orders.forEach((order, index) => {
        const orderID = String(index + 1).padStart(5, '0');
        const date = new Date(order.orderDate).toLocaleDateString('en-IN');
        const items = order.items.map(i => `${i.name} (x${i.quantity})`).join('; ');
        const address = (order.address || '').replace(/,/g, ';');
        const notes = (order.notes || '').replace(/,/g, ';');

        const row = [
            `#${orderID}`,
            order.customerName,
            order.email,
            order.phone,
            `₹${parseFloat(order.totalAmount).toFixed(2)}`,
            order.status,
            date,
            `"${items}"`,
            `"${address}"`,
            `"${notes}"`
        ];

        csvContent += row.join(',') + '\n';
    });

    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== MODAL CLOSE ON OVERLAY CLICK =====
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeOrderModal();
            }
        });
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeOrderModal();
    }
});
