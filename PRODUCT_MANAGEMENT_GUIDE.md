# Product Management System - User Guide

## Overview
The CLEANZOD admin dashboard now includes a comprehensive **Product Management System** that allows you to add, view, and delete products for **all** product sections: Home Wash, Cloth Wash, Sope Oil, Bulk Pro, Bulk Market, and Bleaching. Any products you add through the admin panel will **automatically appear** on their respective pages (`homewash.html`, `clothwash.html`, etc.).

## How to Access

1. **Login to Admin Dashboard**
   - Navigate to `admin-dashboard.html`
   - Login with your admin credentials

2. **Navigate to Products Section**
   - Click on the **"Products"** menu item in the left sidebar
   - You'll see the Product Management interface

## Managing Multiple Categories

The system now supports multiple product categories. Use the **Category Tabs** at the top of the Product Management section to switch between different product lines:

- **Home Wash**: Products for `homewash.html`
- **Cloth Wash**: Products for `clothwash.html`
- **Sope Oil**: Products for `sopeoil.html`
- **Bulk Pro**: Commercial bulk products for `bulkpro.html`
- **Bulk Market**: General bulk items for `bulk.html`
- **Bleaching**: Bleaching and disinfectant products for `bleching.html`

**To Manage a Category:**
1. Click the tab for the category you want to edit (e.g., "Cloth Wash").
2. The table will refresh to show products ONLY for that category.
3. Any new product added will be saved to the CURRENTLY SELECTED category.

## Features

### 1. View Products by Category
- The products table displays products for the selected category.
- Each product shows:
  - Product image (thumbnail)
  - Product name
  - Price
  - Description
  - Best Seller status
  - Delete action button

### 2. Add New Product

**Steps:**
1. **Select the correct Category Tab** first!
2. Click the **"Add New Product"** button in the top-right corner.
3. Fill in the product form:
   - **Product Name**: e.g., "Floor Cleaner - 10L"
   - **Price**: Enter price in rupees (numbers only)
   - **Product Description**: Detailed description
   - **Image URL**: Local path (`img/...`) or external URL
   - **Best Seller**: Select "Yes" to show a "Best Seller" badge (if supported by the page)
4. Click **"Save Product"**.
5. The product is added to the *selected category* and appears on the corresponding website page immediately.

### 3. Delete Product

1. Ensure you are on the correct **Category Tab**.
2. Find the product in the table.
3. Click the **red trash icon** to delete.
4. Confirm deletion.

## How It Works

### Technical Details

**Data Storage:**
- Products are stored in `localStorage` with specific keys for each category:
  - `homewash_products`
  - `clothwash_products`
  - `sopeoil_products`
  - `bulkpro_products`
  - `bulk_products`
  - `bleching_products`

**Automatic Synchronization:**
- `product-manager.js` is included in all product pages.
- Each page initializes itself with `initializeCategory('category_name')`.
- This fetches the specific list from `localStorage`.

### Files Involved

1. **admin-dashboard.html**: Contains the multi-tabbed UI.
2. **product-manager.js**: Central logic for handling all categories (CRUD operations, storage keys, defaults).
3. **Product Pages** (`homewash.html`, `clothwash.html`, etc.):
   - Include `product-manager.js`.
   - Call `initializeCategory()` to load their specific data.
   - Render products dynamically.

## Default Products
If you haven't added any products or cleared your data, each category loads a set of **Default Products** defined in `product-manager.js`.

## Troubleshooting

### Products appearing in the wrong category?
- Make sure you selected the correct **Category Tab** before adding the product.
- Delete the incorrect product and add it again under the right tab.

### Products not appearing on the website?
- Clear browser cache.
- Ensure the page (`e.g., clothwash.html`) includes `product-manager.js`.
- Check browser console for errors.

### Resetting to Defaults?
To reset a specific category (e.g., Home Wash), run this in the browser console:
`localStorage.removeItem('homewash_products')`
Then refresh.

## Future Enhancements
- Inventory management across categories
- Global search for products
- Image upload functionality

## Support

For technical support or questions:
- Email: gogularasai82@gmail.com
- Phone: +91 8110998030

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Created by**: CLEANZOD Development Team
