import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-amber-700 font-semibold"
      : "text-gray-700 hover:text-amber-700";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-xl font-bold tracking-wide text-stone-900">
          SMK_CASHEW
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex items-center gap-1 ${
                isActive
                  ? "text-amber-700 font-semibold"
                  : "text-gray-700 hover:text-amber-700"
              }`
            }
          >
            <ShoppingCart size={18} />
            Cart
            {totalItems > 0 && (
              <span className="ml-1 rounded-full bg-amber-700 px-2 py-0.5 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </NavLink>

          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <NavLink to="/admin" className={linkClass}>
                  Admin
                </NavLink>
              )}

              <NavLink to="/orders" className={linkClass}>
                Orders
              </NavLink>

              <span className="text-stone-600">
                Hi, {user?.name || "Customer"}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
