import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
import ProductForm from '../components/ProductForm.jsx';

const initialForm = {
  name: '',
  slug: '',
  type: 'raw',
  grade: '',
  weightGrams: '',
  price: '',
  stock: '',
  imageUrl: '',
  description: '',
};

function AdminProductNew() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === 'name' && !current.slug
        ? {
            slug: value
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, ''),
          }
        : {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setStatus('loading');
      setError('');

      await api.post('/products', {
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
        err.response?.data?.message || 'Failed to create product'
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

  return (
    <section>
      <Link
        to="/admin/products"
        className="text-sm font-semibold text-amber-700"
      >
        Back to products
      </Link>

      <h1 className="mt-3 text-3xl font-bold text-stone-900">
        Add Product
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
          submitLabel="Create Product"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}

export default AdminProductNew;