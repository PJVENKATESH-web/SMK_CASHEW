import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
import ProductForm from '../components/ProductForm.jsx';

function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [form, setForm] = useState({
    name: '',
    slug: '',
    type: 'raw',
    grade: '',
    weightGrams: '',
    price: '',
    stock: '',
    imageUrl: '',
    description: '',
  });

  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!isAuthenticated || user?.role !== 'admin') return;

      try {
        setStatus('loading');

        const response = await api.get(`/products/${id}`);
        const product = response.data;

        setForm({
          name: product.name || '',
          slug: product.slug || '',
          type: product.type || 'raw',
          grade: product.grade || '',
          weightGrams: product.weightGrams || '',
          price: product.price || '',
          stock: product.stock || '',
          imageUrl: product.images?.[0] || '',
          description: product.description || '',
        });

        setStatus('idle');
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to load product'
        );
        setStatus('error');
      }
    };

    fetchProduct();
  }, [id, isAuthenticated, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus('loading');
      setError('');

      await api.put(`/products/${id}`, {
        name: form.name,
        slug: form.slug,
        type: form.type,
        grade: form.grade,
        weightGrams: Number(form.weightGrams),
        price: Number(form.price),
        stock: Number(form.stock),
        images: form.imageUrl ? [form.imageUrl] : [],
        description: form.description,
      });

      navigate('/admin/products');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update product'
      );
      setStatus('error');
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        Admin access only.
      </section>
    );
  }

  if (status === 'loading') {
    return <p className="text-stone-600">Loading product...</p>;
  }

  return (
    <section>
      <Link
        to="/admin/products"
        className="text-sm font-semibold text-amber-700"
      >
        Back to products
      </Link>

      <h1 className="mt-3 text-3xl font-bold text-stone-900">
        Edit Product
      </h1>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6">
        <ProductForm
          form={form}
          status={status}
          submitLabel="Update Product"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}

export default AdminProductEdit;