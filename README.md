# SMK_CASHEW

SMK_CASHEW is an ecommerce website for browsing, ordering, and managing premium cashew products.

## Project Structure

```txt
SMK_CASHEW/
  backend/    Express + MongoDB API
  frontend/   React + Vite storefront
  database/   Database notes and future scripts
  docs/       Planning, QA, and project documentation
Current Features
Product catalog
Product detail page
User registration and login
JWT authentication
Protected cart
Add, update, and remove cart items
COD checkout
Order confirmation
User order history
Admin dashboard
Admin product create/edit/delete
Admin order status management
Tech Stack
Frontend
React
Vite
Tailwind CSS
React Router
Axios
Lucide React
Backend
Node.js
Express
MongoDB Atlas
Mongoose
JWT
bcryptjs
express-validator
Run Locally
Backend
cd backend
npm install
npm run dev
Backend URL:

http://localhost:5000
Frontend
cd frontend
npm install
npm run dev
Frontend URL:

http://localhost:5173
Environment Variables
Backend .env:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
Frontend .env:

VITE_API_URL=http://localhost:5000/api


Next Planned Features
Payment gateway integration
Image upload with Cloudinary or S3
Better admin analytics
Automated tests
Deployment