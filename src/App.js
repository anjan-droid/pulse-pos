import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import AppShell from './components/AppShell';
import DashboardScreen from './screens/DashboardScreen';
import MenuScreen from './screens/MenuScreen';
import POSScreen from './screens/POSScreen';
import OrdersScreen from './screens/OrdersScreen';
import KDSScreen from './screens/KDSScreen';
import BillingScreen from './screens/BillingScreen';
import { appRoutes, getDefaultRoute, RoleGuard } from './router/routes';
import { useAuth } from './hooks/useAuth';
import { MenuProvider } from './store/useMenuStore';
import { OrderProvider } from './store/useOrderStore';

const PagePlaceholder = ({ title }) => (
  <div className="page-placeholder">
    <h1>{title}</h1>
    <p>{title} coming soon.</p>
  </div>
);

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

function App() {
  const { getUserRole } = useAuth();
  const defaultRoute = getDefaultRoute(getUserRole());

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <OrderProvider>
                <MenuProvider>
                  <AppShell />
                </MenuProvider>
              </OrderProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={defaultRoute} replace />} />
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RoleGuard allowedRoles={route.allowed}>
                  {route.path === 'dashboard' ? (
                    <DashboardScreen />
                  ) : route.path === 'menu' ? (
                    <MenuScreen />
                  ) : route.path === 'pos-order' ? (
                    <POSScreen />
                  ) : route.path === 'orders' ? (
                    <OrdersScreen />
                  ) : route.path === 'kitchen' ? (
                    <KDSScreen />
                  ) : route.path === 'billing' ? (
                    <BillingScreen />
                  ) : (
                    <PagePlaceholder title={route.label} />
                  )}
                </RoleGuard>
              }
            />
          ))}
          <Route path="*" element={<Navigate to={defaultRoute} replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;