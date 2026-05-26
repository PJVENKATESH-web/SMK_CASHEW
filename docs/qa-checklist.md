# SMK_CASHEW QA Checklist

## Backend Health

- [ ] `GET /api/health` returns status ok.

## Products

- [ ] `GET /api/products` returns product list.
- [ ] `GET /api/products?type=raw` returns raw products only.
- [ ] `GET /api/products/:id` returns one product.
- [ ] Invalid product id returns validation error.

## Auth

- [ ] Register works with valid data.
- [ ] Register fails for duplicate email.
- [ ] Login works with valid credentials.
- [ ] Login fails with wrong password.
- [ ] `GET /api/auth/me` works with token.
- [ ] `GET /api/auth/me` fails without token.

## Cart

- [ ] Logged-in user can add product to cart.
- [ ] Cart count updates in frontend.
- [ ] User can update quantity.
- [ ] User can remove item.
- [ ] Cart is blocked for logged-out user.

## Checkout

- [ ] User can place COD order.
- [ ] Order confirmation page shows order id.
- [ ] Cart clears after checkout.
- [ ] Product stock reduces after checkout.
- [ ] Order appears in user order history.

## Admin Products

- [ ] Admin can open admin dashboard.
- [ ] Customer cannot open admin dashboard.
- [ ] Admin can create product.
- [ ] Created product appears in storefront.
- [ ] Admin can update product.
- [ ] Admin can soft delete product.
- [ ] Deleted product disappears from storefront.

## Admin Orders

- [ ] Admin can view all orders.
- [ ] Admin can update order status.
- [ ] Customer order page shows updated status.

## UI

- [ ] Home page loads.
- [ ] Products page loads.
- [ ] Product detail page loads.
- [ ] Login page works.
- [ ] Register page works.
- [ ] Cart page works.
- [ ] Checkout page works.
- [ ] Orders page works.
- [ ] Admin pages work.