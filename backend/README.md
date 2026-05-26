# SMK_CASHEW Backend

Node.js + Express + MongoDB backend for the SMK_CASHEW ecommerce website.

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcryptjs password hashing
- express-validator request validation
- Helmet and rate limiting for basic security

## Setup

Install dependencies:

```bash
npm install

Main APIs
Health
GET /api/health
Products
GET    /api/products
GET    /api/products/:id
POST   /api/products          admin only
PUT    /api/products/:id      admin only
DELETE /api/products/:id      admin only
Auth
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
Cart
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:productId
DELETE /api/cart/:productId
Checkout
POST /api/checkout
GET  /api/checkout/my-orders
Admin
GET /api/admin/orders
PUT /api/admin/orders/:id/status

