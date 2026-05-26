import { Link } from 'react-router-dom';
import { Package, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="rounded-lg border border-stone-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-stone-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-stone-600">
          Please login as admin to continue.
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

  if (user?.role !== 'admin') {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        <h1 className="text-2xl font-bold">
          Access Denied
        </h1>

        <p className="mt-2">
          Admin access only.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-stone-900">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-stone-600">
        Manage products and customer orders.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/products"
          className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm hover:border-amber-300"
        >
          <Package className="text-amber-700" />

          <h2 className="mt-4 text-xl font-bold text-stone-900">
            Products
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            Create, edit, and remove catalog products.
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm hover:border-amber-300"
        >
          <ShoppingBag className="text-amber-700" />

          <h2 className="mt-4 text-xl font-bold text-stone-900">
            Orders
          </h2>

          <p className="mt-2 text-sm text-stone-600">
            View orders and update shipping status.
          </p>
        </Link>
      </div>
    </section>
  );
}

export default AdminDashboard;