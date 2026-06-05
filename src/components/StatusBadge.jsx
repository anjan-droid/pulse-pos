import React from 'react';
import './MetricCard.css';

const StatusBadge = ({ status }) => {
  const statusMap = {
    pending: { label: 'Pending', className: 'status-pending' },
    preparing: { label: 'Preparing', className: 'status-preparing' },
    ready: { label: 'Ready', className: 'status-ready' },
    served: { label: 'Served', className: 'status-ready' },
    paid: { label: 'Paid', className: 'status-paid' }
  };

  const normalizedStatus = String(status).toLowerCase();
  const { label, className } = statusMap[normalizedStatus] || statusMap.pending;

  return <span className={`status-badge ${className}`}>{label}</span>;
};

export default StatusBadge;
