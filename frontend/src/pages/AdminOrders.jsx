import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';

const statuses = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
];

function AdminOrders() {
  const { user, isAuthenticated } = useAuth();

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState('');

  const fetchOrders = async () => {
    try {
      setStatus('loading');
      setError('');

      const response = await api.get('/admin/orders');

      setOrders(response.data.orders || []);
      setStatus('success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders');
      setStatus('error');
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'admin') {
      return;
    }

    let isMounted = true;

    const loadOrders = async () => {
      try {
        const response = await api.get('/admin/orders');

        if (!isMounted) return;

        setOrders(response.data.orders || []);
        setStatus('success');
      } catch (err) {
        if (!isMounted) return;

        setError(err.response?.data?.message || 'Failed to load orders');
        setStatus('error');
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user]);

  const handleStatusChange = async (orderId, orderStatus) => {
    try {
      setUpdatingOrderId(orderId);
      setError('');

      const response = await api.put(`/admin/orders/${orderId}/status`, {
        orderStatus,
      });

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? response.data.order : order
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update order status'
      );
    } finally {
      setUpdatingOrderId('');
    }
  };

  if (isAuthenticated && !user) {
    return <p className="text-stone-600">Checking admin access...</p>;
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        Admin access only.
      </section>
    );
  }

  if (status === 'loading') {
    return <p className="text-stone-600">Loading orders...</p>;
  }

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">
            Admin Orders
          </h1>

          <p className="mt-1 text-stone-600">
            View customer orders and update delivery status.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          className="rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="mt-6 rounded-lg border border-stone-200 bg-white p-6 text-stone-600">
          No orders found.
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-lg border border-stone-200 bg-white p-5"
            >
              <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
                <div>
                  <p className="text-sm text-stone-500">Order ID</p>

                  <p className="break-all font-semibold text-stone-900">
                    {order._id}
                  </p>

                  <p className="mt-2 text-sm text-stone-600">
                    Customer: {order.user?.name || 'Unknown'} -{' '}
                    {order.user?.email || 'No email'}
                  </p>

                  <p className="mt-1 text-sm text-stone-600">
                    Total: Rs. {order.totalAmount} - Payment:{' '}
                    {order.paymentMethod}
                  </p>

                  <p className="mt-1 text-sm text-stone-600">
                    Ship to: {order.shippingAddress?.fullName},{' '}
                    {order.shippingAddress?.city},{' '}
                    {order.shippingAddress?.state}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700">
                    Status
                  </label>

                  <select
                    value={order.orderStatus}
                    disabled={updatingOrderId === order._id}
                    onChange={(event) =>
                      handleStatusChange(order._id, event.target.value)
                    }
                    className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2"
                  >
                    {statuses.map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 border-t border-stone-200 pt-4">
                {order.items.map((item) => (
                  <div
                    key={`${order._id}-${item.product?._id || item.product}`}
                    className="flex justify-between gap-4 py-1 text-sm text-stone-600"
                  >
                    <span>
                      {item.product?.name || item.name} x {item.quantity}
                    </span>

                    <span>Rs. {item.price * item.quantity}</span>
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

export default AdminOrders;
