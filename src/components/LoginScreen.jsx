import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LoginScreen.css';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const credentials = {
    admin: { password: 'admin123', role: 'admin' },
    cashier: { password: 'cashier123', role: 'cashier' },
    kitchen: { password: 'kitchen123', role: 'kitchen' }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!credentials[username]) {
      setError('Invalid username or password');
      return;
    }

    if (credentials[username].password !== password) {
      setError('Invalid username or password');
      return;
    }

    if (credentials[username].role !== selectedRole) {
      setError(`This account doesn't have ${selectedRole} permissions`);
      return;
    }

    const role = login({ username, role: selectedRole });
    // Navigate based on role
    const route = role === 'kitchen' ? '/kitchen' : '/dashboard';
    navigate(route);
  };

  const isFormValid = username && password && selectedRole;

  return (
    <div className="login-screen">
      <div className="login-card-container">
        <div className="login-card">
          <div className="login-card-header">
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6"
                />
              </svg>
            </div>
            <h1>RestoPOS</h1>
            <p>Restaurant Management System</p>
          </div>

          <div className="login-card-content">
            <div className="role-selector">
              <label>Select Your Role</label>
              <div className="role-grid">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('admin')}
                  className={`role-option ${selectedRole === 'admin' ? 'selected' : ''}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>Admin</span>
                  <small>Full Access</small>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect('cashier')}
                  className={`role-option ${selectedRole === 'cashier' ? 'selected' : ''}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <span>Cashier</span>
                  <small>POS + Billing</small>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect('kitchen')}
                  className={`role-option ${selectedRole === 'kitchen' ? 'selected' : ''}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                    />
                  </svg>
                  <span>Kitchen</span>
                  <small>KDS Only</small>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Username</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <div className="error-box">
                  <div className="error-content">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <button type="submit" className={`submit-button ${isFormValid ? 'enabled' : 'disabled'}`} disabled={!isFormValid}>
                Sign In
              </button>
            </form>

            <div className="demo-credentials">
              <div className="demo-box">
                <p>🎯 Demo Credentials</p>
                <div className="demo-list">
                  <div>
                    <span>Admin:</span>
                    <strong>admin / admin123</strong>
                  </div>
                  <div>
                    <span>Cashier:</span>
                    <strong>cashier / cashier123</strong>
                  </div>
                  <div>
                    <span>Kitchen:</span>
                    <strong>kitchen / kitchen123</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
