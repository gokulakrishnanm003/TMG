# Admin Panel Setup Guide - TMG TMG Shri Bahavan Groups

## Overview
This admin panel system allows you to manage all customer orders in one centralized location instead of relying on WhatsApp. All orders are stored securely in the browser's localStorage and can be viewed, filtered, searched, and exported.

---

## Admin Login Credentials

**Username:** `Muthukumar T`  
**Password:** `Muthu@8110`

---

## Files Included

### 1. **admin-login.html**
- Secure login page for admin access
- Username and password validation
- Session management with 24-hour expiration
- Responsive design with animations

### 2. **admin-dashboard.html**
- Main admin dashboard for managing orders
- View all customer orders
- Real-time statistics (Total Orders, Pending, Completed, Revenue)
- Search and filter functionality
- Export orders to CSV format

### 3. **admin-panel.js**
- Core JavaScript logic for the admin panel
- Order management functions
- Statistics calculation
- Search and filter operations
- CSV export functionality

### 4. **order-manager.js**
- Order management utility class
- Can be used across any page to save orders
- Methods for adding, updating, deleting orders
- Statistics and revenue calculations
- Data validation and import/export

### 5. **checkout.html**
- Customer checkout form
- Order placement interface
- Automatically saves orders to admin panel
- Supports customer details and special instructions

---

## How to Use

### For Customers - Placing an Order

1. Navigate to the checkout page or any product page with ordering capability
2. Fill in the order form with:
   - Full Name (Required)
   - Email (Required)
   - Phone Number (Required)
   - Payment Method (Required)
   - Delivery Address (Required)
   - Special Instructions (Optional)
3. Click "Place Order"
4. Order is automatically saved in the admin panel
5. Customer receives a confirmation message

### For Admin - Accessing the Dashboard

1. Go to **admin-login.html**
2. Enter credentials:
   - Username: `Muthukumar T`
   - Password: `Muthu@8110`
3. Click "Login"
4. You're now in the admin dashboard

### Admin Dashboard Features

#### **Dashboard Overview**
- **Total Orders:** Shows count of all orders
- **Pending Orders:** Shows orders awaiting completion
- **Completed Orders:** Shows fulfilled orders
- **Total Revenue:** Shows sum of all order amounts

#### **Search & Filter Orders**
1. Enter search query (Order ID, Customer Name, Email, or Phone)
2. Select status filter (All, Pending, Completed, Cancelled)
3. Click "Search" or press Enter
4. Click "Clear" to reset filters

#### **View Order Details**
1. Click "View" button on any order
2. Modal popup shows:
   - Order ID
   - Customer information
   - Items ordered
   - Order date and time
   - Total amount
   - Payment method
3. Change order status using dropdown (Pending → Completed → Cancelled)
4. Delete order if needed

#### **Export Orders**
1. Click "Export CSV" button
2. All orders are downloaded as CSV file
3. Can be opened in Excel or Google Sheets

#### **Logout**
1. Click "Logout" button in top-right corner
2. You'll be returned to the login page
3. Session expires after 24 hours of inactivity

---

## Integration with Your Website

### To Add Order Form to Any Page

1. **Include the order manager script:**
```html
<script src="order-manager.js"></script>
```

2. **Create an order form and handle submission:**
```javascript
const orderData = {
    customerName: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Main Street, City",
    items: [
        { name: "Cloth Wash", quantity: 2, price: 100 },
        { name: "Bleaching", quantity: 1, price: 150 }
    ],
    totalAmount: "350",
    paymentMethod: "cash",
    notes: "Handle with care"
};

// Add the order
const newOrder = orderManager.addOrder(orderData);
if (newOrder) {
    console.log("Order saved successfully!");
}
```

### To Display Orders in Customer Account (Optional)

```javascript
// Get all orders by customer email
const customerOrders = orderManager.getOrdersByEmail("john@example.com");

// Display order status
customerOrders.forEach(order => {
    console.log(`Order ${order.id}: ${order.status}`);
});
```

---

## Order Data Structure

Each order is stored with the following structure:

```json
{
    "id": "ORD-1704067200000",
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "123 Main Street, City",
    "items": [
        {
            "name": "Cloth Wash",
            "quantity": 2,
            "price": 100
        }
    ],
    "totalAmount": "200",
    "paymentMethod": "cash",
    "notes": "Special handling required",
    "status": "pending",
    "orderDate": "2024-01-01T10:30:00.000Z",
    "createdAt": "2024-01-01T10:30:00.000Z"
}
```

---

## Order Status Values

- **pending:** New order, awaiting processing
- **completed:** Order has been fulfilled
- **cancelled:** Order has been cancelled

---

## Security Notes

1. **Session Management:**
   - Admin session stored in browser localStorage
   - Sessions expire after 24 hours
   - Clear your browser cache to logout immediately

2. **Data Storage:**
   - Orders stored in browser localStorage
   - Can be backed up by exporting to CSV
   - Clearing browser data will remove all orders

3. **Recommendations:**
   - Regularly export orders as backup (CSV format)
   - Use a private/incognito browser window for admin access
   - Change password periodically (update in admin-login.html)

---

## Customization

### Change Admin Credentials

Edit **admin-login.html** and find:

```javascript
const ADMIN_USERNAME = "Muthukumar T";
const ADMIN_PASSWORD = "Muthu@8110";
```

Change these values to your desired credentials.

### Add More Admin Features

Edit **admin-dashboard.html** and **admin-panel.js** to add:
- Email notifications for new orders
- SMS notifications
- Print receipts
- Customer communication system

### Customize Checkout Form

Edit **checkout.html** to add:
- Product selection
- Payment gateway integration
- Delivery date selection
- Discount codes

---

## Troubleshooting

### Orders Not Saving?
- Check browser's localStorage is enabled
- Verify form validation passes
- Check browser console for errors

### Can't Login?
- Verify exact username and password (case-sensitive)
- Clear browser cache and try again
- Check if JavaScript is enabled

### Lost Orders?
- Check if browser localStorage was cleared
- Import previously exported CSV file if available
- Check browser's local storage in Developer Tools (F12)

### CSV Not Downloading?
- Check if pop-ups are blocked
- Try different browser
- Ensure sufficient disk space

---

## Browser Compatibility

- Chrome/Edge: ✅ Full Support
- Firefox: ✅ Full Support
- Safari: ✅ Full Support
- IE11: ⚠️ Limited Support

---

## Backup & Recovery

### To Backup Orders:
1. Go to Admin Dashboard
2. Click "Export CSV"
3. Save the file safely

### To Restore Orders:
Contact system administrator for restoration procedures.

---

## Support

For technical issues or questions:
- **Phone:** 8110998030
- **Email:** gogularasai82@gmail.com

---

**Version:** 1.0  
**Last Updated:** January 2025  
**Created for:** TMG - TMG Shri Bahavan Groups
