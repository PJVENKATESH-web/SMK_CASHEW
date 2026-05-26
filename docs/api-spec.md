# SMK_CASHEW API Spec

Base URL:

```txt
http://localhost:5000/api

Health
GET /health
Response:

{
  "status": "ok",
  "service": "SMK_CASHEW API"
}
Products
GET /products
Query params:

type=raw|roasted|salted|flavored|organic
minPrice=0
maxPrice=1000
page=1
limit=12
GET /products/:id
Returns one active product.

POST /products
Admin only.

Request:

{
  "name": "Raw Cashews",
  "slug": "raw-cashews",
  "type": "raw",
  "grade": "W320",
  "weightGrams": 500,
  "price": 549,
  "stock": 50,
  "images": [],
  "description": "Premium cashews"
}
PUT /products/:id
Admin only.

DELETE /products/:id
Admin only. Soft deletes product by setting isActive to false.

Auth
POST /auth/register
Request:

{
  "name": "Jhonson",
  "email": "jhonson@example.com",
  "password": "Password123"
}
POST /auth/login
Request:

{
  "email": "jhonson@example.com",
  "password": "Password123"
}
GET /auth/me
Requires header:

Authorization: Bearer TOKEN
Cart
All cart routes require:

Authorization: Bearer TOKEN
GET /cart
Returns current user's cart.

POST /cart
Request:

{
  "productId": "PRODUCT_ID",
  "quantity": 2
}
PUT /cart/:productId
Request:

{
  "quantity": 3
}
DELETE /cart/:productId
Removes product from cart.

Checkout
POST /checkout
Requires auth.

Request:

{
  "shippingAddress": {
    "fullName": "Jhonson",
    "phone": "9876543210",
    "addressLine1": "123 Main Road",
    "addressLine2": "Near Market",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "postalCode": "600001",
    "country": "India"
  },
  "paymentMethod": "cod"
}
GET /checkout/my-orders
Requires auth. Returns logged-in user's orders.

Admin
Admin routes require:

Authorization: Bearer ADMIN_TOKEN
GET /admin/orders
Returns all orders.

PUT /admin/orders/:id/status
Request:

{
  "orderStatus": "shipped"
}
Allowed statuses:

pending
confirmed
shipped
delivered
cancelled