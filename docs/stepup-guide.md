# SMK_CASHEW Setup Guide

## Prerequisites

Install:

- Node.js
- npm
- MongoDB Atlas account
- Git

## 1. Clone or Open Project

```bash
cd SMK_CASHEW
2. Backend Setup
cd backend
npm install
Create .env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
Seed products:

npm run seed
Run backend:

npm run dev
Backend runs at:

http://localhost:5000
3. Frontend Setup
Open new terminal:

cd frontend
npm install
Create .env:

VITE_API_URL=http://localhost:5000/api
Run frontend:

npm run dev
Frontend runs at:

http://localhost:5173
4. Admin Setup
Register a user from frontend or API.

In MongoDB Atlas, open the users collection and change:

"role": "customer"
to:

"role": "admin"
Logout and login again.

5. Local Test Flow
Open frontend
Browse products
Register/login
Add product to cart
Checkout with COD
Open orders page
Login as admin
Manage products
Update order status
Common Problems
MongoDB URI is undefined
Check:

.env is inside backend
variable name is exactly MONGO_URI
require('dotenv').config() is at top of server.js
Frontend cannot call backend
Check:

backend is running on port 5000
frontend .env has VITE_API_URL=http://localhost:5000/api
backend CLIENT_URL=http://localhost:5173