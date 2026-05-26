const Cart=require('../models/Cart');
const Order=require('../models/Order');
const Product=require('../models/Product');

const createOrder= async(req,res)=>{
    try{
        const {shippingAddress,paymentMethod='cod'}=req.body;
        const cart=await Cart.findOne({
            user: req.user._id,
        }).populate('items.product');
        if(!cart||cart.items.length === 0){
            return res.status(400).json({
                message: 'Cart is empty',
            })
        }
        const orderItems = [];
    let subtotal = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product || !product.isActive) {
        return res.status(400).json({
          message: `${item.product.name} is no longer available`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        price: item.priceSnapshot,
      });

      subtotal += item.quantity * item.priceSnapshot;
    }

    const shippingFee = subtotal >= 999 ? 0 : 49;
    const totalAmount = subtotal + shippingFee;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      subtotal,
      shippingFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      orderStatus: 'confirmed',
    });

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    cart.items = [];
    await cart.save();

    const populatedOrder = await Order.findById(order._id).populate(
      'items.product',
      'name slug type grade weightGrams price images'
    );

    res.status(201).json({
      message: 'Order created successfully',
      order: populatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Checkout failed',
      error: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
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

module.exports = {
  createOrder,
  getMyOrders,
};
