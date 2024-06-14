# E-commerce Restaurant Management Web Application

## Overview
Welcome to our latest project: The E-commerce Restaurant Management Web Application with an intuitive Admin Panel!

### Revolutionize Your Dining Experience! 🍽️
- **Order Directly from Your Table**: Scan the QR code placed on your table to order your favorite dishes instantly.

### Live Demo
- [Live Application](https://personal-scan-the-menu.vercel.app/)
- [GitHub Repository](https://github.com/TejasDhodi/Personal-Scan-The-Menu.git)

## Features
- **Seamless Ordering**: Say goodbye to waiting in lines or trying to catch the server's attention. With our QR code scanning system, ordering your favorite dishes is just a scan away.
- **Easy-to-Use**: Our intuitive interface ensures that even first-time users can navigate the ordering process effortlessly.
- **Efficient Service**: By eliminating the need for manual order taking, we streamline the entire dining experience, allowing your orders to reach the kitchen promptly.

## Tech Stack
- **Frontend**: React.js
- **State Management**: Redux Toolkit
- **API Communication**: Axios
- **Routing**: React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary and Multer
- **Hosting Platform**: Render and Vercel
- **Payment Gateway**: Razorpay

## Key Features
- **Admin Panel**: Streamline your operations with a user-friendly admin interface.
- **Wishlist**: Keep track of your favorite items for future reference. Double-click on your dish to add to wishlist.
- **Add to Cart**: Conveniently add items to your cart with just a click.
- **Online and COD Payment**: Choose the payment method that suits you best.
- **Occupied Table Feature**: View which tables are occupied and available based on the indicator.
- **Smart Error Handling**: Instantly receive popup warnings for critical actions and clear error messages to guide you through any unexpected situations.

## Routes

### User Panel
- **Home**: [Home](https://personal-scan-the-menu.vercel.app/)
- **Menu**: [Menu](https://personal-scan-the-menu.vercel.app/menu)
- **Contact**: [Contact](https://personal-scan-the-menu.vercel.app/contact)
- **Tables**: [Tables](https://personal-scan-the-menu.vercel.app/tables)
- **Cart**: [Cart](https://personal-scan-the-menu.vercel.app/menu/cart)
- **Profile**: [Profile](https://personal-scan-the-menu.vercel.app/profile)

### Admin Panel
- **Admin Authentication**: [Admin Authentication](https://personal-scan-the-menu.vercel.app/adminauth)
- **Admin Dashboard**: [Admin Dashboard](https://personal-scan-the-menu.vercel.app/admin)
- **Orders**: [Orders](https://personal-scan-the-menu.vercel.app/orders)
- **Menu Management**: [Menu Management](https://personal-scan-the-menu.vercel.app/menuManage)
- **Create Dish**: [Create Dish](https://personal-scan-the-menu.vercel.app/createDish)

## API Endpoints

### Admin
- **GET**:
  - `/api/v1/dishes`
  - `/api/v1/dishes/:id`
  - `/api/v1/dishes/search`
  - `/api/v1/orders/pending`
  - `/api/v1/orders/processing`
  - `/api/v1/orders/sentToDelivery`
  - `/api/v1/orders/delivered`
  - `/api/v1/orders/paid`

- **POST**:
  - `/api/v1/dishes/filter/check`
  - `/api/v1/createDish`

- **PUT**:
  - `/api/v1/dishes/update/:id`
  - `/api/v1/orders/processing/:id`
  - `/api/v1/orders/delivered/:id`
  - `/api/v1/orders/sentToDelivery/:id`
  - `/api/v1/orders/undoDelivered/:id`
  - `/api/v1/orders/markPaid/:id`

- **DELETE**:
  - `/api/v1/dishes/delete/:id`

### User
- **GET**:
  - `/api/v1/recentOrders/:user`
  - `/api/v1/placeOrder/detail/:id`
  - `/api/v1/userProfile`
  - `/api/v1/allUsers`

- **POST**:
  - `/api/v1/placeOrder/online`
  - `/api/v1/placeOrder/online/verify`
  - `/api/v1/placeOrder`
  - `/api/v1/sendMail`
  - `/api/v1/sendMail/verify`
  - `/api/v1/register`
  - `/api/v1/login`

## Contact
Embark on a seamless online restaurant management experience with us! Get ready to revolutionize the way you run your business. Connect with us to learn more!

Join us in revolutionizing the way we dine out. Experience the future of restaurant service today!

**Hashtags**: #QRCodeOrdering #DiningInnovation #ContactlessDining #Ecommerce #RestaurantManagement #TechInnovation #Project #Job #Cloudinary #Multer #Razorpay #MERNStack #Web