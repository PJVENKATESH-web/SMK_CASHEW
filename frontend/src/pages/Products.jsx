import {useEffect,useState} from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard'

function Products(){
    const [products,setProducts]=useState([]);
    const [status,setStatus]=useState('loading');
    const [error,setError]=useState('');

    useEffect(()=>{
        const fetchProducts = async()=>{
            try{
                setStatus('loading');
                const response=await api.get('/products');
                setProducts(response.data.products||[]);
                setStatus('success');
            }catch(error){
                setError(error.response?.data?.message||'Failed to load products');
                setStatus('error');
            }
        };
        fetchProducts();
    },[]);

    if(status ==='loading'){
        return <p className='text-stone-600'>Loading products...</p>
    }

    if(status==='error'){
        return  (
            <div className='rounded-lg border border-red-200 bg-red-50 p-4 text-red-700'>
                {error}
            </div>
        );
    }

    return (
        <section>
            <div className='mb-6'>
                <h1 className='text-3xl font-bold text-stone-900'>Cashew Products</h1>
                <p className='mt-2 text-stone-600'>Browse premium raw, roasted, salted, organic, and flavored cashews.</p>
            </div>
            {products.length===0 ? (
                <p className='text-stone-600'>No products found.</p>
            ):(
                <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                    {products.map((product)=>(
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default Products;