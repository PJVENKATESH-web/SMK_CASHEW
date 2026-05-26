const Product=require('../models/Product');

const getProducts= async(req,res)=>{
    try{
        const {type,minPrice,maxPrice,page=1,limit=12}=req.query;
        const filter={
            isActive: true,
        }
        if(type){
            filter.type = type;
        }
        if(minPrice||maxPrice){
            filter.price={};
        }
        if(minPrice){
            filter.price.$gte=Number(minPrice);
        }
        if(maxPrice){
            filter.price.$lte=Number(maxPrice);
        }
        const skip=(Number(page)-1)*Number(limit);

        const products=await Product.find(filter).sort({createdAt: -1}).skip(skip).limit(Number(limit));
        const total=await Product.countDocuments(filter);

        res.json({
            products,
            total,
            page: Number(page),
            pages: Math.ceil(total/Number(limit)),
        });
    }
    catch(error){
        res.status(500).json({
            message: 'Failed to fetch products',
            error: error.message,
        })
    }
}
    
const getProductById=async(req,res)=>{
        try{
            const product=await Product.findById(req.params.id);
            if(!product || !product.isActive){
                return res.status(404).json({
                    message: 'Product not found',
                });
            }
            res.json(product);
        }catch(error){
            res.status(500).json({
                message:'Failed to fetch product',
                error: error.message,
            });
        }
}

const createProduct=async(req,res)=>{
    try{
        const product=await  Product.create(req.body);
        res.status(201).json({
            message: 'Product created successfully',
            product,
        })
    }catch(error){
        res.status(500).json({
            message: 'Failed to create product',
            error: error.message,
        });
    }
}

const updateProduct=async(req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if(!product){
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        res.json({
            message: 'Product updated successfully',
            product,
        })
    }catch(error){
        res.status(500).json({
            message: 'Failed to udpate product',
            error: error.message,
        });
    }
};

const deleteProduct = async(req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(
            req.params.id,
            {
                isActive: false,
            },
            {
                new: true,
            }
        );
        if(!product){
            return res.status(404).json({
                message: 'Product not found',
            });
        }

        res.json({
            message: 'Product deleted successfully',
            product,
        });
    }catch(error){
        res.status(500).json({
            message: 'Failed to delete product',
            error: error.message,
        })
    }
}

module.exports={
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
