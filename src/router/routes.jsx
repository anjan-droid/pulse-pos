import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const appRoutes = [
  {
    path: 'dashboard',
    label: 'Dashboard',
    icon: 'grid',
    allowed: ['admin', 'cashier'],
  },
  {
    path: 'menu',
    label: 'Menu',
    icon: 'tools-kitchen',
    allowed: ['admin'],
  },
  {
    path: 'pos-order',
    label: 'POS Order',
    icon: 'shopping-cart',
    allowed: ['admin', 'cashier'],
  },
  {
    path: 'orders',
    label: 'Orders',
    icon: 'clipboard-list',
    allowed: ['admin', 'cashier'],
  },
  {
    path: 'kitchen',
    label: 'Kitchen',
    icon: 'flame',
    allowed: ['admin', 'kitchen'],
  },
  {
    path: 'billing',
    label: 'Billing',
    icon: 'receipt',
    allowed: ['admin', 'cashier'],
  },
  {
    path: 'analytics',
    label: 'Analytics',
    icon: 'chart-bar',
    allowed: ['admin'],
  },
];

export const getDefaultRoute = (role) => {
  if (role === 'kitchen') return '/kitchen';
  return '/dashboard';
};

export const RoleGuard = ({ allowedRoles, children }) => {
  const { getUserRole } = useAuth();
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(role)) {
    return <>{children}</>;
  }

  if (role === 'kitchen') {
    return <Navigate to="/kitchen" replace />;
  }

  return <Navigate to={getDefaultRoute(role)} replace />;
};
