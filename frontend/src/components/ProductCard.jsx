import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setStatus('loading');
      setMessage('');

      await addToCart(product._id, 1);

      setStatus('success');
      setMessage('Added');
    } catch (error) {
      setStatus('error');
      setMessage(
        error.response?.data?.message || 'Failed'
      );
    }
  };

  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
      <Link to={`/products/${product._id}`}>
        <div className="flex `aspect-4/3` items-center justify-center bg-stone-100">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-stone-500">
              No image
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          {product.type} · {product.grade}
        </p>

        <Link to={`/products/${product._id}`}>
          <h2 className="mt-1 text-lg font-semibold text-stone-900 hover:text-amber-700">
            {product.name}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm text-stone-600">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-stone-900">
              ₹{product.price}
            </p>
            <p className="text-xs text-stone-500">
              {product.weightGrams}g
            </p>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 rounded-md bg-amber-700 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
            >
              <ShoppingCart size={16} />
              {status === 'loading' ? 'Adding' : 'Add'}
            </button>

            {message && (
              <p
                className={`mt-1 text-xs ${
                  status === 'error'
                    ? 'text-red-600'
                    : 'text-green-700'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;