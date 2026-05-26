# SMK_CASHEW Step-by-Step Project Guide

## Your Current Starting Point
You are building SMK_CASHEW from scratch with separate backend, frontend, database, and docs folders. You have already started the backend and installed Express, TypeScript Express types, dotenv, cors, and nodemon. You have also created a MongoDB cluster.

Recommended current stack:
- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React with Vite or Next.js
- Database: MongoDB Atlas
- Docs: Markdown files inside docs/
- Payments later: Stripe plus Razorpay for India

## Step 1: Create Project Structure
Create this folder structure:

SMK_CASHEW/
  backend/
  frontend/
  database/
  docs/

Inside docs, keep planning and API files:
- docs/project-roadmap.md
- docs/api-spec.md
- docs/database-model.md
- docs/setup-guide.md

## Step 2: Initialize Git
From inside SMK_CASHEW, run:

git init
git checkout -b dev

Create .gitignore at the root:

node_modules/
.env
.DS_Store
dist/
build/
coverage/

## Step 3: Finish Backend Setup
Inside SMK_CASHEW/backend, initialize package.json if not done:

npm init -y

Install runtime packages:

npm install express mongoose dotenv cors bcryptjs jsonwebtoken cookie-parser express-validator helmet express-rate-limit morgan

Install dev packages:

npm install -D nodemon

Your backend folder should become:

backend/
  src/
    config/
      db.js
    controllers/
      productController.js
      authController.js
      cartController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
      validateMiddleware.js
    models/
      User.js
      Product.js
      Cart.js
      Order.js
    routes/
      productRoutes.js
      authRoutes.js
      cartRoutes.js
    seed/
      productSeeder.js
    server.js
  .env
  .env.example
  package.json

## Step 4: Add Backend Scripts
In backend/package.json, add:

"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js",
  "seed": "node src/seed/productSeeder.js"
}

## Step 5: Create Environment Files
Create backend/.env:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=change_this_to_a_long_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development

Create backend/.env.example with the same keys but fake values.

## Step 6: Connect MongoDB
Create backend/src/config/db.js:

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

## Step 7: Create Backend Entry File
Create backend/src/server.js with Express, CORS, JSON parsing, routes, and error handling. Start with /api/health first so you can test the server quickly.

Required first endpoint:

GET /api/health -> { "status": "ok" }

Success check:
- Run npm run dev
- Open http://localhost:5000/api/health
- You should see status ok

## Step 8: Design MongoDB Models
Start with these collections:

User:
- name
- email
- passwordHash
- role: customer or admin
- createdAt

Product:
- name
- slug
- type: raw, roasted, salted, flavored, organic
- grade
- weightGrams
- price
- stock
- images
- description
- isActive
- createdAt

Cart:
- userId
- items: productId, quantity, priceSnapshot

Order:
- userId
- items
- shippingAddress
- paymentStatus
- orderStatus
- totalAmount
- createdAt

## Step 9: Build Product API First
Create:
- Product model
- productController
- productRoutes

Endpoints:
- GET /api/products
- GET /api/products/:id

Add query support later:
- type
- minPrice
- maxPrice
- page
- limit

Success check:
- Seed products
- GET /api/products returns cashew products
- GET /api/products/:id returns one product

## Step 10: Seed Sample Products
Create at least 10 products first:
- Raw Whole Cashews W240
- Raw Whole Cashews W320
- Roasted Salted Cashews
- Masala Cashews
- Pepper Cashews
- Organic Cashews
- Split Cashews
- Cashew Pieces
- Honey Roasted Cashews
- Premium Gift Pack

Run:

npm run seed

## Step 11: Build Authentication
Create:
- User model
- authController
- authRoutes
- authMiddleware

Endpoints:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

Use bcryptjs for password hashing and JWT for login.

Success check:
- Register works
- Login returns token or sets cookie
- Protected /me route works

## Step 12: Build Basic Cart
Create:
- Cart model
- cartController
- cartRoutes

Endpoints:
- GET /api/cart
- POST /api/cart
- PUT /api/cart/:productId
- DELETE /api/cart/:productId

Success check:
- Logged-in user can add product to cart
- Cart survives refresh because it is saved in MongoDB

## Step 13: Write API Docs
Create docs/api-spec.md with every endpoint, request body, response body, and error example.

Keep it updated whenever you add or change an endpoint.

## Step 14: Scaffold Frontend
After backend product API works, create frontend:

npm create vite@latest frontend

Choose React.

Install dependencies:

npm install axios react-router-dom lucide-react

Suggested frontend structure:

frontend/
  src/
    components/
      Navbar.jsx
      ProductCard.jsx
      QuantitySelector.jsx
      MiniCart.jsx
    pages/
      Home.jsx
      Products.jsx
      ProductDetail.jsx
      Cart.jsx
      Login.jsx
      Register.jsx
    services/
      api.js
    context/
      AuthContext.jsx
      CartContext.jsx
    App.jsx
    main.jsx

## Step 15: Connect Frontend to Backend
Create frontend/src/services/api.js:

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default api;

Create frontend/.env:

VITE_API_URL=http://localhost:5000/api

## Step 16: Build Frontend MVP Pages
Build in this order:
1. Navbar
2. Home page
3. Product listing page
4. Product detail page
5. Cart page
6. Login page
7. Register page

Success check:
- Frontend loads
- Product list comes from backend
- Product detail page works
- Add to cart works

## Step 17: Phase 3 Later - Checkout
Only after cart is stable, add:
- Order model
- Checkout endpoint
- Stripe/Razorpay sandbox
- Order confirmation page

## Step 18: Phase 4 Later - Admin
After storefront works, add:
- Admin role
- Product create/edit/delete
- Order management
- Image upload using Cloudinary

## Step 19: Phase 5 Later - Quality
Add:
- Backend validation
- Helmet
- Rate limiting
- Unit tests
- Playwright checkout test
- Lighthouse performance audit

## Your Immediate Next 7 Tasks
1. Create SMK_CASHEW folder structure.
2. Finish backend folder structure.
3. Create .env and .env.example.
4. Add MongoDB connection file.
5. Add Express server with /api/health.
6. Add Product model and seed data.
7. Implement GET /api/products and GET /api/products/:id.

## Rule To Follow
Do not start frontend until your backend can return real seeded products. This makes frontend work much easier and avoids guessing data shapes.
