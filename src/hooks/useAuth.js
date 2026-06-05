// /hooks/useAuth.js
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on mount
    const storedRole = localStorage.getItem('pos_role');
    const storedUsername = localStorage.getItem('pos_username');
    
    if (storedRole && storedUsername) {
      setUser({
        username: storedUsername,
        role: storedRole
      });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const normalizedRole = String(userData.role).toLowerCase();

    // Store user data in localStorage
    localStorage.setItem('pos_role', normalizedRole);
    localStorage.setItem('pos_username', userData.username);
    setUser({ ...userData, role: normalizedRole });
    // Return role for caller to handle navigation
    return normalizedRole;
  };

  const logout = () => {
    // Clear localStorage and reset user state
    localStorage.removeItem('pos_role');
    localStorage.removeItem('pos_username');
    setUser(null);
  };

  const getUserRole = () => {
    const storedRole = user?.role || localStorage.getItem('pos_role');
    return storedRole ? String(storedRole).toLowerCase() : null;
  };

  const getUsername = () => {
    return user?.username || localStorage.getItem('pos_username');
  };

  const isAuthenticated = () => {
    return !!getUserRole();
  };

  const hasRole = (allowedRoles) => {
    const userRole = getUserRole();
    if (!userRole) return false;
    
    if (typeof allowedRoles === 'string') {
      return userRole === allowedRoles;
    }
    
    return allowedRoles.includes(userRole);
  };

  return {
    user,
    loading,
    isLoading: loading,
    login,
    logout,
    getUserRole,
    getUsername,
    isAuthenticated,
    hasRole
  };
};

export { useAuth };