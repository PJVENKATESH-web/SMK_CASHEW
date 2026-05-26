# SMK_CASHEW Frontend

React + Vite frontend for the SMK_CASHEW ecommerce website.

## Tech Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React icons

## Setup

Install dependencies:

```bash
npm install
Create .env:

VITE_API_URL=http://localhost:5000/api
Run development server:

npm run dev
Open:

http://localhost:5173
Pages
/                         Home
/products                 Product listing
/products/:id             Product detail
/cart                     Cart
/checkout                 Checkout
/order-confirmation/:id   Order confirmation
/orders                   User orders
/login                    Login
/register                 Register
/admin                    Admin dashboard
/admin/products           Admin product management
/admin/products/new       Add product
/admin/products/:id/edit  Edit product
/admin/orders             Admin order management
Features
Product browsing
Product detail page
Register/login
JWT token stored in localStorage
Cart count in navbar
Add/update/remove cart items
COD checkout
Order history
Admin product CRUD
Admin order status updates