const express= require('express');
const {body,param}=require('express-validator');

const {getCart,addToCart,updateCartItem,removeCartItem,}= require('../controllers/cartController');

const {protect,}=require('../middleware/authMiddleware');

const validate = require('../middleware/validationMiddleware');

const router=express.Router();

router.get('/',protect,getCart);
router.post('/',protect,
    [
        body('productId').isMongoId().withMessage('Valid productId is required'),
        body('quantity').optional().isInt({min: 1}).withMessage('Quantity must be atleast 1'),
    ],validate,addToCart);
router.put('/:productId',protect,
    [
        param('productId').isMongoId().withMessage('Valid productId is required'),
        body('quantity').isInt({min: 1}).withMessage('Quantity must be atleast 1'),
    ],validate,updateCartItem);
router.delete('/:productId',protect,
    [
        param('productId').isMongoId().withMessage('Valid productId is required'),
    ],validate,removeCartItem);

module.exports = router;
