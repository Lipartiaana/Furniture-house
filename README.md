# Furniture house

### Tech stack: HTML | CSS | SCSS | Bootstrap | JavaScript | Swiper.js

## Project Overview

The **Furniture Shop** project is a multi-page e-commerce website that allows users to browse and purchase a wide range of furniture items. The website features product listings, detailed product views, a shopping cart, and an order checkout system. The shop offers an intuitive user experience with smooth navigation and responsive design.

## Project Structure

The project includes:

- 📄 **Index HTML file**

- 📁 **Styles folder** containing SCSS files

- 📁 **CSS folder** automatically generated from SCSS

- 📁 **JavaScript** folder with scripts for functionality:

  - `cart.js` - Handles shopping cart functionality.

  - `category.js` - Manages product category filtering.

  - `checkout.js` - Processes order checkout.

  - `features.js` - Displays featured products.

  - `owner.js` - Displays owners information.

  - `pagination.js` - Handles product listing pagination.

  - `products.js` - Manages product display and modal view.

  - `recommendation.js` - Displays recomendations slider.

  - `script.js` - General website functionality.

- 📁 **Assets folder** for images and icons.

- 📄 `data.json` with product information.

## Main Pages

1. **🏠 Homepage**:

   - Provides general information about the shop.

   - Displays featured products and promotional content.

   - Includes links to different product categories.

2. **ℹ️ About Page**:

   - Showcases the company's story, values, and mission.

   - Introduces the ownership team with a slider powered by Swiper.js.

3. **📞 Contact Page**:

   - A contact form for customer inquiries.

4. **🛍️ Products Page**:

   - Displays all available products with a Bootstrap sidebar for category filtering.

   - Initially fetches and displays all products.

   - Implements pagination to navigate through products.

   - Clicking on a product opens a modal with detailed information.

   - Users can add products to their cart from the modal view.

5. **🛒 Cart Page**:

   - Shows all products added to the cart with their details and prices.

   - Users can adjust quantities or remove items.

   - Shipping method selection is available.

   - Checkout button leads to a checkout form displayed in a modal.

   - Once the order is confirmed, the cart is emptied and the checkout button is disabled.

## Features

- **Product Modal View:** Users can click on any product to view detailed information in a modal, including price, description, and an option to add to cart.

- **Shopping Cart Management:** Users can add, update, and remove products from the cart with real-time updates.

- **Category Filtering:** Products can be filtered using the Bootstrap sidebar categories.

- **Pagination:** Ensures smooth navigation across multiple product pages.

- **Order Checkout:** A checkout form appears in a modal where users input shipping and payment details.

- **Responsive Design:** The website is fully responsive, ensuring usability across all devices.

## Libraries Used

**Bootstrap:** Used for styling and responsive layout.

**Swiper.js:** Enables smooth and interactive sliders for showcasing the team on the About page and features on the homepage.

The website provides a seamless shopping experience with a well-structured layout, clear navigation, and user-friendly functionalities.
