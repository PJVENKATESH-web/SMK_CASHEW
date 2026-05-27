/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('smk_token') || '';
  });

  const [user, setUser] = useState(null);

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('smk_token', token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('smk_token');
      delete api.defaults.headers.common.Authorization;
    //   setUser(null);
    }
  }, [token]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) return;

      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch {
        setToken('');
      }
    };

    fetchCurrentUser();
  }, [token]);

  const login = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
  };

  const logout = () => {
    setToken('');
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [token, user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext);
}
