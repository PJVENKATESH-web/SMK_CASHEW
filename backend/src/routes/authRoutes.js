const express=require('express');
const {body}=require('express-validator');

const {register,login,getMe}=require('../controllers/authController');
const {protect,}=require('../middleware/authMiddleware');

const validate=require('../middleware/validationMiddleware');

const router=express.Router();

router.post('/register',[
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('phone').matches(/^[6-9]\d{9}$/).withMessage('Valid 10 digit Indian phone is required'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters'),
],
validate,
register);

router.post('/login',
    [
        body('identifier').trim().notEmpty().withMessage('Email or phone number is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],validate,login);
router.get('/me',protect,getMe)

module.exports=router;
