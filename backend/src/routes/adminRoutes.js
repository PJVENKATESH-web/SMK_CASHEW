const express = require('express');

const {
  getAllOrders,
  updateOrderStatus,
  getUsers,
} = require('../controllers/adminOrderController');

const {
  protect,
  adminOnly,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/orders', protect, adminOnly, getAllOrders);
router.put('/orders/:id/status', protect, adminOnly, updateOrderStatus);
router.get('/users', protect, adminOnly, getUsers);

module.exports = router;