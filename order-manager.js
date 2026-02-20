// ===== ORDER MANAGEMENT UTILITY =====
// This file handles saving orders to localStorage instead of sending to WhatsApp

class OrderManager {
    constructor() {
        this.ordersKey = 'allOrders';
        this.initializeOrders();
    }

    // Initialize orders storage if it doesn't exist
    initializeOrders() {
        if (!localStorage.getItem(this.ordersKey)) {
            localStorage.setItem(this.ordersKey, JSON.stringify([]));
        }
    }

    // Add a new order to the system
    addOrder(orderData) {
        try {
            const orders = this.getOrders();
            
            // Create order object with all required fields
            const newOrder = {
                id: 'ORD-' + Date.now(),
                customerName: orderData.customerName || 'N/A',
                email: orderData.email || 'N/A',
                phone: orderData.phone || 'N/A',
                address: orderData.address || '',
                items: orderData.items || [],
                totalAmount: orderData.totalAmount || 0,
                paymentMethod: orderData.paymentMethod || 'Not specified',
                notes: orderData.notes || '',
                status: 'pending',
                orderDate: new Date().toISOString(),
                createdAt: new Date().toISOString()
            };
            
            orders.push(newOrder);
            localStorage.setItem(this.ordersKey, JSON.stringify(orders));
            
            return newOrder;
        } catch (error) {
            console.error('Error adding order:', error);
            return null;
        }
    }

    // Get all orders
    getOrders() {
        try {
            const orders = localStorage.getItem(this.ordersKey);
            return orders ? JSON.parse(orders) : [];
        } catch (error) {
            console.error('Error getting orders:', error);
            return [];
        }
    }

    // Update an order
    updateOrder(index, updatedData) {
        try {
            const orders = this.getOrders();
            if (index >= 0 && index < orders.length) {
                orders[index] = { ...orders[index], ...updatedData };
                localStorage.setItem(this.ordersKey, JSON.stringify(orders));
                return orders[index];
            }
            return null;
        } catch (error) {
            console.error('Error updating order:', error);
            return null;
        }
    }

    // Delete an order
    deleteOrder(index) {
        try {
            const orders = this.getOrders();
            if (index >= 0 && index < orders.length) {
                orders.splice(index, 1);
                localStorage.setItem(this.ordersKey, JSON.stringify(orders));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error deleting order:', error);
            return false;
        }
    }

    // Get order by ID
    getOrderById(orderId) {
        try {
            const orders = this.getOrders();
            return orders.find(o => o.id === orderId);
        } catch (error) {
            console.error('Error getting order by ID:', error);
            return null;
        }
    }

    // Get orders by customer email
    getOrdersByEmail(email) {
        try {
            const orders = this.getOrders();
            return orders.filter(o => o.email === email);
        } catch (error) {
            console.error('Error getting orders by email:', error);
            return [];
        }
    }

    // Get orders by status
    getOrdersByStatus(status) {
        try {
            const orders = this.getOrders();
            return orders.filter(o => o.status === status);
        } catch (error) {
            console.error('Error getting orders by status:', error);
            return [];
        }
    }

    // Calculate total revenue
    getTotalRevenue() {
        try {
            const orders = this.getOrders();
            return orders.reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0);
        } catch (error) {
            console.error('Error calculating revenue:', error);
            return 0;
        }
    }

    // Get order statistics
    getStatistics() {
        try {
            const orders = this.getOrders();
            return {
                totalOrders: orders.length,
                pendingOrders: orders.filter(o => o.status === 'pending').length,
                completedOrders: orders.filter(o => o.status === 'completed').length,
                cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
                totalRevenue: this.getTotalRevenue(),
                averageOrderValue: orders.length > 0 ? this.getTotalRevenue() / orders.length : 0
            };
        } catch (error) {
            console.error('Error getting statistics:', error);
            return {};
        }
    }

    // Clear all orders (use with caution)
    clearAllOrders() {
        if (confirm('Are you sure you want to delete all orders? This action cannot be undone.')) {
            localStorage.setItem(this.ordersKey, JSON.stringify([]));
            return true;
        }
        return false;
    }

    // Export orders as JSON
    exportAsJSON() {
        try {
            const orders = this.getOrders();
            const dataStr = JSON.stringify(orders, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `orders_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return true;
        } catch (error) {
            console.error('Error exporting orders:', error);
            return false;
        }
    }

    // Import orders from JSON
    importFromJSON(jsonData) {
        try {
            const orders = JSON.parse(jsonData);
            if (Array.isArray(orders)) {
                localStorage.setItem(this.ordersKey, JSON.stringify(orders));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing orders:', error);
            return false;
        }
    }

    // Send notification to admin about new order
    notifyNewOrder(order) {
        // This can be extended to send email notifications, SMS, etc.
        console.log('New Order Notification:', order);
        
        // You can add custom notification logic here
        // For example: send email to admin, trigger webhook, etc.
        return true;
    }

    // Validate order data
    validateOrderData(orderData) {
        const errors = [];
        
        if (!orderData.customerName || orderData.customerName.trim() === '') {
            errors.push('Customer name is required');
        }
        
        if (!orderData.email || orderData.email.trim() === '') {
            errors.push('Email is required');
        }
        
        if (!orderData.phone || orderData.phone.trim() === '') {
            errors.push('Phone number is required');
        }
        
        if (!orderData.items || orderData.items.length === 0) {
            errors.push('At least one item is required');
        }
        
        if (!orderData.totalAmount || parseFloat(orderData.totalAmount) <= 0) {
            errors.push('Total amount must be greater than 0');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}

// Create a global instance
const orderManager = new OrderManager();
