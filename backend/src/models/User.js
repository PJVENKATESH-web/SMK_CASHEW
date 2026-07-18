const mongoose=require('mongoose');

const userSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^[6-9]\d{9}$/, 'Enter a valid 10 digit Indian mobile number'],
        },
        passwordHash:{
            type: String,
            required: true,
        },
        role:{
            type: String,
            enum:['customer','admin'],
            default: 'customer',
        },
    },
    {
        timestamps: true,
    }
);

module.exports=mongoose.model('User',userSchema);