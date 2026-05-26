# SMK_CASHEW Database Model

Database: MongoDB

## User

Collection:

```txt
users
Fields:

name          String, required
email         String, required, unique
passwordHash  String, required
role          String: customer/admin
createdAt     Date
updatedAt     Date
Product
Collection:

products
Fields:

name          String, required
slug          String, required, unique
type          String: raw/roasted/salted/flavored/organic
grade         String
weightGrams   Number
price         Number
stock         Number
images        String[]
description   String
isActive      Boolean
createdAt     Date
updatedAt     Date
Cart
Collection:

carts
Fields:

user          ObjectId -> User, unique
items         Array
createdAt     Date
updatedAt     Date
Cart item:

product        ObjectId -> Product
quantity       Number
priceSnapshot  Number
Order
Collection:

orders
Fields:

user            ObjectId -> User
items           Array
shippingAddress Object
subtotal        Number
shippingFee     Number
totalAmount     Number
paymentMethod   cod/stripe/razorpay
paymentStatus   pending/paid/failed
orderStatus     pending/confirmed/shipped/delivered/cancelled
createdAt       Date
updatedAt       Date
Order item:

product   ObjectId -> Product
name      String
quantity  Number
price     Number
Shipping address:

fullName
phone
addressLine1
addressLine2
city
state
postalCode
country