const express = require('express');
const { body } = require('express-validator');

const {
  createOrder,
  getMyOrders,
} = require('../controllers/checkoutController');

const {
  protect,
} = require('../middleware/authMiddleware');

const validate = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/',
  protect,
  [
    body('shippingAddress.fullName')
      .trim()
      .notEmpty()
      .withMessage('Full name is required'),

    body('shippingAddress.phone')
      .trim()
      .notEmpty()
      .withMessage('Phone is required'),

    body('shippingAddress.addressLine1')
      .trim()
      .notEmpty()
      .withMessage('Address line 1 is required'),

    body('shippingAddress.city')
      .trim()
      .notEmpty()
      .withMessage('City is required'),

    body('shippingAddress.state')
      .trim()
      .notEmpty()
      .withMessage('State is required'),

    body('shippingAddress.postalCode')
      .trim()
      .notEmpty()
      .withMessage('Postal code is required'),

    body('paymentMethod')
      .optional()
      .isIn(['cod', 'stripe', 'razorpay'])
      .withMessage('Invalid payment method'),
  ],
  validate,
  createOrder
);

router.get('/my-orders', protect, getMyOrders);

module.exports = router;
