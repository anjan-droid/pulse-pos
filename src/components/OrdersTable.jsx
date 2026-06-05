import React from 'react';
import StatusBadge from './StatusBadge';

const OrdersTable = ({ orders, selectedOrderId, onSelectOrder }) => {
  return (
    <div className="orders-table-wrapper">
      <div className="orders-table-header">
        <span>Order #</span>
        <span>Items</span>
        <span>Time</span>
        <span>Amount</span>
        <span>Status</span>
      </div>
      <div className="orders-table-body">
        {orders.map((order) => (
          <button
            key={order.id}
            type="button"
            className={`orders-table-row ${selectedOrderId === order.id ? 'selected' : ''}`}
            onClick={() => onSelectOrder(order.id)}
          >
            <span>{order.number}</span>
            <span>{order.items.reduce((total, item) => total + item.quantity, 0)}</span>
            <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>${order.total.toFixed(2)}</span>
            <span className="orders-table-status">
              <StatusBadge status={order.status} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
