const Order = require('../models/Order');
const User = require('../models/User');

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


const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email phone role createdAt').sort({ createdAt: -1 });
    const totals = await Order.aggregate([
      { $group: { _id: '$user', orders: { $sum: 1 }, spent: { $sum: '$totalAmount' } } },
    ]);
    const summary = new Map(totals.map((item) => [String(item._id), item]));
    res.json({
      users: users.map((user) => ({
        ...user.toObject(),
        orders: summary.get(String(user._id))?.orders || 0,
        spent: summary.get(String(user._id))?.spent || 0,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  getUsers,
};
