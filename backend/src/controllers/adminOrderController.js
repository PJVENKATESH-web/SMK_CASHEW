const Order = require('../models/Order');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name slug type grade weightGrams price images')
      .sort({ createdAt: -1 });

    res.json({
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const allowedStatuses = [
      'pending',
      'confirmed',
      'shipped',
      'delivered',
      'cancelled',
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        message: 'Invalid order status',
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate('user', 'name email')
      .populate('items.product', 'name slug type grade weightGrams price images');

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.json({
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update order status',
      error: error.message,
    });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
};
