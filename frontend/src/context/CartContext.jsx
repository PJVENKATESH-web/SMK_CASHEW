/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import api from '../services/api';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      setStatus('idle');
      return;
    }

    try {
      setStatus('loading');
      const response = await api.get('/cart');
      setItems(response.data.items || []);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    let isMounted = true;

    if (!isAuthenticated) {
      queueMicrotask(() => {
        if (!isMounted) return;

        setItems([]);
        setStatus('idle');
      });

      return () => {
        isMounted = false;
      };
    }

    const loadCart = async () => {
      try {
        const response = await api.get('/cart');

        if (!isMounted) return;

        setItems(response.data.items || []);
        setStatus('success');
      } catch {
        if (!isMounted) return;

        setStatus('error');
      }
    };

    loadCart();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    const response = await api.post('/cart', {
      productId,
      quantity,
    });

    setItems(response.data.items || []);

    return response.data;
  }, []);

  const updateCartItem = useCallback(async (productId, quantity) => {
    const response = await api.put(`/cart/${productId}`, {
      quantity,
    });

    setItems(response.data.items || []);

    return response.data;
  }, []);

  const removeCartItem = useCallback(async (productId) => {
    const response = await api.delete(`/cart/${productId}`);

    setItems(response.data.items || []);

    return response.data;
  }, []);

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.priceSnapshot,
    0
  );

  const value = useMemo(
    () => ({
      items,
      status,
      totalItems,
      subtotal,
      fetchCart,
      addToCart,
      updateCartItem,
      removeCartItem,
    }),
    [
      items,
      status,
      totalItems,
      subtotal,
      fetchCart,
      addToCart,
      updateCartItem,
      removeCartItem,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
