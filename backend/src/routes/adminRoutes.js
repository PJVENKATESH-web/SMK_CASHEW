const express = require('express');

const {
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/adminOrderController');

const {
  protect,
  adminOnly,
} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/orders', protect, adminOnly, getAllOrders);
router.put('/orders/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;