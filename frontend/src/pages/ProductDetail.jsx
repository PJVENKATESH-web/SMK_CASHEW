import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [cartStatus, setCartStatus] = useState("idle");
  const [cartMessage, setCartMessage] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setStatus("loading");

        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
        setStatus("success");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
        setStatus("error");
      }
    };

    fetchProduct();
  }, [id]);
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setCartStatus("loading");
      setCartMessage("");

      await addToCart(product._id, quantity);

      setCartStatus("success");
      setCartMessage("Added to cart");
    } catch (err) {
      setCartStatus("error");
      setCartMessage(err.response?.data?.message || "Failed to add to cart");
    }
  };
  if (status === "loading") {
    return <p className="text-stone-600">Loading product...</p>;
  }

  if (status === "error") {
    return (
      <div>
        <Link
          to="/products"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700"
        >
          <ArrowLeft size={16} />
          Back to products
        </Link>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section>
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-700"
      >
        <ArrowLeft size={16} />
        Back to products
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex aspect-4/3 items-center justify-center rounded-lg bg-stone-100">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <span className="text-stone-500">No image available</span>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            {product.type} - {product.grade}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-stone-900">
            {product.name}
          </h1>

          <p className="mt-4 text-stone-700">{product.description}</p>

          <div className="mt-6 rounded-lg border border-stone-200 bg-white p-5">
            <p className="text-2xl font-bold text-stone-900">
              Rs. {product.price}
            </p>

            <p className="mt-1 text-sm text-stone-500">
              {product.weightGrams}g pack
            </p>

            <p className="mt-1 text-sm text-stone-500">
              Stock: {product.stock}
            </p>

            <div className="mt-5">
              <label className="block text-sm font-medium text-stone-700">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="mt-2 w-24 rounded-md border border-stone-300 px-3 py-2"
              />
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={cartStatus === "loading"}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-amber-700 px-4 py-3 font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
            >
              <ShoppingCart size={18} />
              {cartStatus === "loading" ? "Adding..." : "Add to Cart"}
            </button>

            {cartMessage && (
              <p
                className={`mt-3 text-sm ${
                  cartStatus === "error" ? "text-red-600" : "text-green-700"
                }`}
              >
                {cartMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
