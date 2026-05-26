const mongoose=require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['raw','roasted','salted','flavored','organic'],
        },
        grade:{
            type: String,
            required: true,
        },
        weightGrams:{
            type: Number,
            required: true,
            min: 1,
        },
        price:{
            type: Number,
            required: true,
            min: 0,
        },
        stock:{
            type: Number,
            required: true,
            min: 0,
        },
        images: [
            {
                type: String,
            },
        ],
        description:{
            type: String,
            required: true,
        },
        isActive:{
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports=mongoose.model('Product', productSchema);