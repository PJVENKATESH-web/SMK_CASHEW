const mongoose=require('mongoose');

const orderItemSchema=new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        _id: false,
    }
);

const shippingAddressSchema=new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            default: 'India',
        },
    },
    {
        _id: false,
    }    
);

const orderSchema=new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items:[orderItemSchema],
        shippingAddress: shippingAddressSchema,
        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },
        shippingFee :{
            type: Number,
            default: 0,
            min: 0,
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentMethod:{
            type: String,
            enum: ['cod','stripe','razorpay'],
            default: 'cod',
        },
        paymentStatus:{
            type: String,
            enum: ['pending','paid','failed'],
            default:'pending',
        },
        orderStatus:{
            type: String,
            enum: ['pending','confirmed','shipped','delivered','cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

module.exports=mongoose.model('Order',orderSchema)
