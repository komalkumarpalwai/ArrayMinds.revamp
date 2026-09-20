import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('adminToken') || null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  // Revalidate session with backend on mount or token change
  const verifySession = useCallback(async () => {
    try {
      if (token) {
        const res = await api.get('/auth/me');
        if (res.data?.admin) {
          setAdmin(res.data.admin);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('adminUser', JSON.stringify(res.data.admin));
          }
        }
      } else {
        // Check if HTTP-only cookie session exists on server
        const res = await api.get('/auth/me');
        if (res.data?.admin) {
          setAdmin(res.data.admin);
        }
      }
    } catch (e) {
      // Session expired or invalid
      if (token) {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
        }
        setToken(null);
        setAdmin(null);
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const login = (data) => {
    if (data.token && typeof localStorage !== 'undefined') {
      localStorage.setItem('adminToken', data.token);
    }
    if (data.admin && typeof localStorage !== 'undefined') {
      localStorage.setItem('adminUser', JSON.stringify(data.admin));
    }
    setToken(data.token || 'session-active');
    setAdmin(data.admin);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore network errors on logout
    } finally {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
      setToken(null);
      setAdmin(null);
    }
  };

  /**
   * Check if current user has a specific permission
   */
  const hasPermission = (permission) => {
    if (!admin) return false;
    if (admin.role?.toLowerCase() === 'super admin') return true;
    const permissions = admin.permissions || [];
    return permissions.includes(permission);
  };

  /**
   * Check if current user has any of the specified permissions
   */
  const hasAnyPermission = (permissions = []) => {
    if (!admin) return false;
    if (admin.role?.toLowerCase() === 'super admin') return true;
    const userPermissions = admin.permissions || [];
    return permissions.some((p) => userPermissions.includes(p));
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!admin,
        hasPermission,
        hasAnyPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
