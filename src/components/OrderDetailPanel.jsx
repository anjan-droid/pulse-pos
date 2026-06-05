import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const nextStatus = {
  Pending: 'Preparing',
  Preparing: 'Ready',
  Ready: 'Served',
  Served: 'Paid',
  Paid: 'Paid',
};

const OrderDetailPanel = ({ order, updateStatus }) => {
  const navigate = useNavigate();

  const handleStatusChange = (event) => {
    updateStatus(order.id, event.target.value);
  };

  const handleMoveToBilling = () => {
    navigate(`/billing?orderId=${encodeURIComponent(order.id)}`);
  };

  const statusOptions = ['Pending', 'Preparing', 'Ready', 'Served', 'Paid'];

  return (
    <div className="order-detail-card">
      <div className="order-detail-header">
        <div>
          <div className="order-detail-number">{order.number}</div>
          <StatusBadge status={order.status} />
        </div>
      </div>

      <div className="order-detail-meta">
        <div>
          <div className="meta-label">Table</div>
          <div className="meta-value">{order.tableNumber}</div>
        </div>
        <div>
          <div className="meta-label">Time</div>
          <div className="meta-value">{new Date(order.createdAt).toLocaleString()}</div>
        </div>
      </div>

      <div className="order-detail-section">
        <div className="order-detail-section-title">Items</div>
        <div className="order-detail-items">
          {order.items.map((item) => (
            <div key={item.id} className="order-detail-item-row">
              <div className="item-name">{item.name}</div>
              <div className="item-qty">x{item.quantity}</div>
              <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-detail-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Tax (8%)</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        <div className="summary-row total-row">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="order-detail-actions">
        <select className="status-dropdown" value={order.status} onChange={handleStatusChange}>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button type="button" className="button button-secondary" onClick={() => updateStatus(order.id, nextStatus[order.status])}>
          Move status forward
        </button>
        <button type="button" className="button button-primary" onClick={handleMoveToBilling}>
          Move to Billing
        </button>
      </div>
    </div>
  );
};

export default OrderDetailPanel;
