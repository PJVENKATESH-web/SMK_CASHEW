import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import Orders from './pages/Orders.jsx';
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminProductNew from "./pages/AdminProductNew.jsx";
import AdminProductEdit from "./pages/AdminProductEdit.jsx";
import AdminOrders from './pages/AdminOrders.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-8">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:id" element={<ProductDetail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/order-confirmation/:id"
            element={<OrderConfirmation />}
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/admin/products' element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<AdminProductNew />} />
          <Route path='/admin/product/:id/edit' element={<AdminProductEdit />} />
          <Route path='/admin/orders' element={<AdminOrders />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
