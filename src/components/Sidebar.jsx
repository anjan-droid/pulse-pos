import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { appRoutes } from '../router/routes';
import './Sidebar.css';

const renderIcon = (name) => {
  switch (name) {
    case 'grid':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case 'tools-kitchen':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 7C7.12 7 6 8.12 6 9.5V14" />
          <path d="M15.5 7C14.12 7 13 8.12 13 9.5V14" />
          <path d="M8 15h8" />
          <path d="M6 19h12" />
          <path d="M9 3h6v4H9V3z" />
        </svg>
      );
    case 'shopping-cart':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3h2l1.68 10.39a2 2 0 0 0 2 1.61h8.64a2 2 0 0 0 2-1.61L21 6H6" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      );
    case 'clipboard-list':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3h6" />
          <path d="M9 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2" />
          <path d="M9 11h6" />
          <path d="M9 15h6" />
          <path d="M12 7v2" />
        </svg>
      );
    case 'flame':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s5-4.75 5-10a5 5 0 0 0-10 0c0 5.25 5 10 5 10z" />
          <path d="M12 2C8 7 9 11 9 11a3 3 0 0 0 6 0s1-4-3-9z" />
        </svg>
      );
    case 'receipt':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h14v16l-3-2-3 2-3-2-3 2V4z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
        </svg>
      );
    case 'chart-bar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 19V9" />
          <path d="M10 19V5" />
          <path d="M14 19v-6" />
          <path d="M18 19v-3" />
          <path d="M4 21h16" />
        </svg>
      );
    default:
      return null;
  }
};

const Sidebar = () => {
  const navigate = useNavigate();
  const { getUserRole, getUsername, logout } = useAuth();
  const role = getUserRole();
  const username = getUsername();
  const visibleRoutes = appRoutes.filter((route) => route.allowed.includes(role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div>
        <div className="logo">
          <div className="logo-mark">R</div>
          <span className="logo-text">RestoPOS</span>
        </div>

        <nav className="sidebar-nav">
          {visibleRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={`/${route.path}`}
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              <span className="sidebar-icon">{renderIcon(route.icon)}</span>
              <span className="nav-label">{route.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="avatar">{username?.charAt(0).toUpperCase() || 'U'}</div>
          <div className="user-meta">
            <span className="user-name">{username || 'Guest'}</span>
            <span className="user-role">{role?.toUpperCase() || 'UNKNOWN'}</span>
          </div>
        </div>
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
