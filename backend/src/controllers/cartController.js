const Cart=require('../models/Cart');
const Product=require('../models/Product');

const getCart = async(req,res)=>{
    try{
        const cart=await Cart.findOne({user: req.user._id}).populate(
            'items.product'
        );
        res.json({
            items: cart ? cart.items : [],
        });
    }
    catch(error){
        res.status(500).json({
            message: 'Failed to fetch cart',
            error: error.message,
        });
    }
};

const addToCart = async(req,res)=>{
    try{
        const {productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);

        if(!product || !product.isActive){
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        if(product.stock < quantity){
            return res.status(400).json({
                message: 'Not enough stock available',
            });
        }

        let cart=await Cart.findOne({user: req.user._id});

        if(!cart){
            cart=await Cart.create({
                user: req.user._id,
                items:[],
            });
        }

        const existingItem= cart.items.find(
            (item)=> item.product.toString() === productId
        );

        if(existingItem){
            existingItem.quantity += Number(quantity);
            existingItem.priceSnapshot=product.price;
        }else{
            cart.items.push({
                product: product._id,
                quantity: Number(quantity),
                priceSnapshot: product.price,
            });
        }
        await cart.save();

        const populatedCart = await Cart.findOne({
            user: req.user._id,
        }).populate('items.product');

        res.status(201).json({
            message: 'Product added to Cart',
            items: populatedCart.items,
        });
    }catch(error){
        res.status(500).json({
            message: 'Failed to add product to cart',
            error: error.message,
        });
    }
}

const updateCartItem= async(req,res)=>{
    try{
        const {productId}=req.params;
        const {quantity}=req.body;

        if(!quantity || Number(quantity) < 1){
            return res.status(400).json({
                message: 'Quantity must be at least 1',
            });
        }
        const cart =await Cart.findOne({user: req.user._id});

        if(!cart){
            return res.status(404).json({
                message: 'Cart not found',
            });
        }

        const item=cart.items.find(
            (cartItem)=>cartItem.product.toString() === productId
        );

        if(!item){
            return res.status(404).json({
                message: 'Product not found in cart',
            });
        }

        const product = await Product.findById(productId);

        if(!product|| !product.isActive){
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        if(product.stock < Number(quantity)){
            return res.status(404).json({
                message: 'Not enough stock available',
            });
        }

        item.quantity = Number(quantity);
        item.priceSnapshot=product.price;

        await cart.save();
        const populatedCart= await Cart.findOne({
            user: req.user._id,
        }).populate('items.product');

        res.json({
            message: 'Cart item updated',
            items: populatedCart.items,
        });
    }catch(error){
        res.status(500).json({
            message: 'Failed to update cart item',
            error: error.message,
        })
    }
}
const removeCartItem=async(req,res)=>{
    try{
        const {productId}=req.params;
        const cart= await Cart.findOne({user: req.user._id});

        if(!cart){
            return res.status(404).json({
                message: 'Cart not found',
            })
        }
        cart.items = cart.items.filter(
            (item)=>item.product.toString() !== productId,
        );

        await cart.save();

        const populatedCart=await Cart.findOne({
            user: req.user._id,
        }).populate('items.product');

        res.json({
            message: 'Cart item removed',
            items: populatedCart.items,
        });
    }catch(error){
        res.status(500).json({
            message: 'Failed to remove cart item',
            error: error.message,
        })
    }
}
module.exports={
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
};
