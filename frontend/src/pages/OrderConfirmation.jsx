import { Link, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

function OrderConfirmation() {
  const { id } = useParams();

  return (
    <section className="mx-auto max-w-2xl rounded-lg border border-stone-200 bg-white p-8 text-center shadow-sm">
      <CheckCircle2
        size={52}
        className="mx-auto text-green-700"
      />

      <h1 className="mt-4 text-3xl font-bold text-stone-900">
        Order Confirmed
      </h1>

      <p className="mt-3 text-stone-600">
        Your order has been placed successfully.
      </p>

      <div className="mt-5 rounded-md bg-stone-50 p-4 text-sm text-stone-700">
        Order ID:
        <span className="ml-2 font-semibold text-stone-900">
          {id}
        </span>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/products"
          className="rounded-md bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800"
        >
          Continue Shopping
        </Link>

        <Link
          to="/orders"
          className="rounded-md border border-stone-300 px-4 py-2 font-semibold text-stone-700 hover:bg-stone-50"
        >
          View Orders
        </Link>
      </div>
    </section>
  );
}

export default OrderConfirmation;
