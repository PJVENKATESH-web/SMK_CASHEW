import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';

function AdminProducts() {
  const { user, isAuthenticated } = useAuth();

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setStatus('loading');
      const response = await api.get('/products?limit=100');
      setProducts(response.data.products || []);
      setStatus('success');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to load products'
      );
      setStatus('error');
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchProducts();
    }
  }, [isAuthenticated, user]);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) return;

    await api.delete(`/products/${productId}`);
    fetchProducts();
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        Admin access only.
      </section>
    );
  }

  if (status === 'loading') {
    return <p className="text-stone-600">Loading products...</p>;
  }

  if (status === 'error') {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">
            Admin Products
          </h1>

          <p className="mt-1 text-stone-600">
            Manage your product catalog.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-stone-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-700">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Grade</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-3 font-medium text-stone-900">
                    {product.name}
                  </td>

                  <td className="px-4 py-3 capitalize text-stone-600">
                    {product.type}
                  </td>

                  <td className="px-4 py-3 text-stone-600">
                    {product.grade}
                  </td>

                  <td className="px-4 py-3 text-stone-600">
                    ₹{product.price}
                  </td>

                  <td className="px-4 py-3 text-stone-600">
                    {product.stock}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="rounded-md border border-stone-300 p-2 text-stone-700 hover:bg-stone-50"
                        aria-label="Edit product"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(product._id)}
                        className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50"
                        aria-label="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AdminProducts;