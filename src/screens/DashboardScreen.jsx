import React from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../components/MetricCard';
import StatusBadge from '../components/StatusBadge';
import { useDashboardData } from '../hooks/useDashboardData';
import './DashboardScreen.css';

const SimpleBarChart = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));
  
  return (
    <div className="simple-chart">
      <div className="chart-bars">
        {data.map((item, idx) => (
          <div key={idx} className="chart-bar-wrapper">
            <div className="chart-bar-container">
              <div 
                className="chart-bar"
                style={{ height: `${(item.amount / maxAmount) * 100}%` }}
              />
            </div>
            <div className="chart-label">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardScreen = () => {
  const navigate = useNavigate();
  const dashboardData = useDashboardData();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleOrderClick = (orderId) => {
    navigate(`/orders?id=${orderId}`);
  };

  return (
    <div className="dashboard-screen">
      {/* Top Bar */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="header-date">{today}</p>
        </div>
        <button className="new-order-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Order
        </button>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <MetricCard 
          label={dashboardData.metrics.revenue.label}
          value={`$${dashboardData.metrics.revenue.value.toLocaleString()}`}
          change={dashboardData.metrics.revenue.change}
        />
        <MetricCard 
          label={dashboardData.metrics.orders.label}
          value={dashboardData.metrics.orders.value}
          change={dashboardData.metrics.orders.change}
          subtext="orders"
        />
        <MetricCard 
          label={dashboardData.metrics.avgOrderValue.label}
          value={`$${dashboardData.metrics.avgOrderValue.value}`}
          change={dashboardData.metrics.avgOrderValue.change}
        />
        <MetricCard 
          label={dashboardData.metrics.activeTables.label}
          value={`${dashboardData.metrics.activeTables.value} / ${dashboardData.metrics.activeTables.total}`}
          change={0}
        />
      </div>

      {/* Content Row */}
      <div className="dashboard-content">
        {/* Chart Section */}
        <div className="chart-section">
          <div className="chart-card">
            <h3>Revenue by hour</h3>
            <SimpleBarChart data={dashboardData.revenueByHour} />
          </div>
        </div>

        {/* Orders Section */}
        <div className="orders-section">
          <div className="orders-card">
            <h3>Live orders</h3>
            <div className="orders-list">
              {dashboardData.liveOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="order-row"
                  onClick={() => handleOrderClick(order.id)}
                >
                  <div className="order-id">#{order.id}</div>
                  <div className="order-table">Table {order.table}</div>
                  <div className="order-items">{order.items} items</div>
                  <div className="order-status">
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
