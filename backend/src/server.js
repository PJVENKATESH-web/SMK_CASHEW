require('dotenv').config();

const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const morgan=require('morgan');
const rateLimit=require('express-rate-limit');
const connectDB=require('./config/db');
const productRoutes=require('./routes/productRoutes');
const authRoutes=require('./routes/authRoutes');
const cartRoutes= require('./routes/cartRoutes');
const {notFound,errorHandler}=require('./middleware/errorMiddleware');
const checkoutRoutes = require('./routes/checkoutRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app=express();
connectDB();

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

app.use(rateLimit({
    windowMs: 15 * 60 *1000,
    max: 100,
}));

app.use('/api/products',productRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/checkout',checkoutRoutes);
app.use('/api/admin',adminRoutes);

app.get('/api/health',(req,res)=>{
    res.json({
        status:'ok',
        service:"SMK_CASHEW API",
    });
});

app.use(notFound);
app.use(errorHandler);


const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log('Server is running on port',PORT);
});
