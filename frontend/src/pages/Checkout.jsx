import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items, subtotal, fetchCart } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const shippingFee = subtotal >= 999 ? 0 : 49;
  const totalAmount = subtotal + shippingFee;

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    try {
      setStatus('loading');
      setError('');

      const response = await api.post('/checkout', {
        shippingAddress: form,
        paymentMethod: 'cod',
      });

      await fetchCart();

      navigate(`/order-confirmation/${response.data.order._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Checkout failed'
      );
      setStatus('error');
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="rounded-lg border border-stone-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-stone-900">
          Checkout
        </h1>

        <p className="mt-2 text-stone-600">
          Please login before checkout.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-stone-900">
        Checkout
      </h1>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]"
      >
        <div className="rounded-lg border border-stone-200 bg-white p-6">
          <h2 className="text-lg font-bold text-stone-900">
            Shipping Address
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-stone-700">
                Full Name
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700">
                Address Line 1
              </label>
              <input
                name="addressLine1"
                value={form.addressLine1}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-stone-700">
                Address Line 2
              </label>
              <input
                name="addressLine2"
                value={form.addressLine2}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                City
              </label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                State
              </label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Postal Code
              </label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Country
              </label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
              />
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-bold text-stone-900">
            Order Summary
          </h2>

          <div className="mt-4 space-y-2">
            {items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between gap-3 text-sm text-stone-600"
              >
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>
                  ₹{item.priceSnapshot * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-stone-200 pt-4">
            <div className="flex justify-between text-stone-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="mt-2 flex justify-between text-stone-700">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</span>
            </div>

            <div className="mt-4 flex justify-between text-lg font-bold text-stone-900">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || items.length === 0}
            className="mt-5 w-full rounded-md bg-amber-700 px-4 py-3 font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
          >
            {status === 'loading' ? 'Placing Order...' : 'Place COD Order'}
          </button>
        </aside>
      </form>
    </section>
  );
}

export default Checkout;