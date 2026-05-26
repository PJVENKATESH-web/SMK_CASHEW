import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Cart() {
  const { items, status, subtotal, updateCartItem, removeCartItem } = useCart();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="rounded-lg border border-stone-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-stone-900">Cart</h1>

        <p className="mt-2 text-stone-600">Please login to view your cart.</p>

        <Link
          to="/login"
          className="mt-4 inline-block rounded-md bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800"
        >
          Login
        </Link>
      </section>
    );
  }

  if (status === "loading") {
    return <p className="text-stone-600">Loading cart...</p>;
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-stone-900">Cart</h1>

      {items.length === 0 ? (
        <div className="mt-6 rounded-lg border border-stone-200 bg-white p-6">
          <p className="text-stone-600">Your cart is empty.</p>

          <Link
            to="/products"
            className="mt-4 inline-block rounded-md bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.product._id}
                className="flex gap-4 rounded-lg border border-stone-200 bg-white p-4"
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-md bg-stone-100">
                  {item.product.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full rounded-md object-cover"
                    />
                  ) : (
                    <span className="text-xs text-stone-500">No image</span>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Link
                      to={`/products/${item.product._id}`}
                      className="font-semibold text-stone-900 hover:text-amber-700"
                    >
                      {item.product.name}
                    </Link>

                    <p className="mt-1 text-sm text-stone-500">
                      ₹{item.priceSnapshot} · {item.product.weightGrams}g
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max={item.product.stock}
                      value={item.quantity}
                      onChange={(event) =>
                        updateCartItem(
                          item.product._id,
                          Number(event.target.value),
                        )
                      }
                      className="w-20 rounded-md border border-stone-300 px-3 py-2"
                    />

                    <button
                      type="button"
                      onClick={() => removeCartItem(item.product._id)}
                      className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-lg border border-stone-200 bg-white p-5">
            <h2 className="text-lg font-bold text-stone-900">Order Summary</h2>

            <div className="mt-4 flex justify-between text-stone-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="mt-2 flex justify-between text-stone-700">
              <span>Shipping</span>
              <span>Calculated later</span>
            </div>

            <div className="mt-4 border-t border-stone-200 pt-4">
              <div className="flex justify-between text-lg font-bold text-stone-900">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-5 block w-full rounded-md bg-amber-700 px-4 py-3 text-center font-semibold text-white hover:bg-amber-800"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Cart;
