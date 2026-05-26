import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';

function Orders() {
  const { isAuthenticated } = useAuth();

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setStatus('success');
        return;
      }

      try {
        setStatus('loading');

        const response = await api.get('/checkout/my-orders');

        setOrders(response.data.orders || []);
        setStatus('success');
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to load orders'
        );
        setStatus('error');
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <section className="rounded-lg border border-stone-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-stone-900">
          My Orders
        </h1>

        <p className="mt-2 text-stone-600">
          Please login to view your orders.
        </p>

        <Link
          to="/login"
          className="mt-4 inline-block rounded-md bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800"
        >
          Login
        </Link>
      </section>
    );
  }

  if (status === 'loading') {
    return <p className="text-stone-600">Loading orders...</p>;
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
      <h1 className="text-3xl font-bold text-stone-900">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-lg border border-stone-200 bg-white p-6">
          <p className="text-stone-600">
            You have not placed any orders yet.
          </p>

          <Link
            to="/products"
            className="mt-4 inline-block rounded-md bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800"
          >
            Shop Products
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-lg border border-stone-200 bg-white p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-stone-500">
                    Order ID
                  </p>

                  <p className="font-semibold text-stone-900">
                    {order._id}
                  </p>
                </div>

                <div className="text-sm sm:text-right">
                  <p className="font-semibold text-stone-900">
                    ₹{order.totalAmount}
                  </p>

                  <p className="capitalize text-stone-500">
                    {order.orderStatus} · {order.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="mt-4 border-t border-stone-200 pt-4">
                {order.items.map((item) => (
                  <div
                    key={item.product}
                    className="flex justify-between py-1 text-sm text-stone-600"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Orders;