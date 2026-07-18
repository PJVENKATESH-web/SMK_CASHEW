const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

const createToken=(userId)=>{
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );
};

const register=async(req,res)=>{
    try{
        const {name,email,phone,password}=req.body;
        const existingUser=await User.findOne({ $or: [{email}, {phone}] });
        if(existingUser){
            return res.status(409).json({
                message: 'This email or phone number is already registered',
            });
        }

        const passwordHash=await bcrypt.hash(password,10);
        const user=await User.create({
            name,email,phone,passwordHash,
        });

        const token=createToken(user._id);
        res.status(201).json({
            message:'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            }
        });
    }
    catch(error){
        res.status(500).json({
            message: 'Registration failed',
            error: error.message,
        });
    }
};

const login=async(req,res)=>{
    try{
        const {identifier,password}=req.body;
        const normalizedPhone=String(identifier || '').replace(/\D/g, '').slice(-10);
        const user=await User.findOne({ $or: [{email: String(identifier || '').toLowerCase()}, {phone: normalizedPhone}] });
        if(!user){
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        }
        const isPasswordCorrect =await bcrypt.compare(
            password,
            user.passwordHash,
        );
        if(!isPasswordCorrect){
            return res.status(401).json({
                message:'Invalid email or password',
            });
        }

        const token=createToken(user._id);
        res.json({
            message:'Login successful',
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            }
        });
    }

    catch(error){
        res.status(500).json({
            message: 'Login failed',
            error: error.message,
        });
    }
};

const getMe=async(req,res)=>{
    res.json({
        user: {
            id: req.user._id,
            name: req.user.name,
            email:req.user.email,
            phone:req.user.phone,
            role: req.user.role,
        }
    })
}

module.exports={
    register,
    login,
    getMe,
};