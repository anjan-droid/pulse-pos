import React from 'react';

const ReceiptModal = ({ order, totals, paymentMethod, onClose }) => {
  const methodLabel = {
    card: 'Credit/Debit Card',
    cash: 'Cash',
    upi: 'UPI',
    split: 'Split Bill',
  }[paymentMethod];

  return (
    <div className="receipt-modal-overlay">
      <div className="receipt-modal">
        <div className="receipt-modal-header">
          <div className="success-icon">✓</div>
          <h2>Payment Confirmed</h2>
          <p>Order {order.number}</p>
        </div>

        <div className="receipt-details">
          <div className="receipt-row">
            <span>Table</span>
            <span>{order.tableNumber}</span>
          </div>
          <div className="receipt-row">
            <span>Payment Method</span>
            <span>{methodLabel}</span>
          </div>
          <div className="receipt-row total">
            <span>Total Amount Paid</span>
            <span>${totals.total.toFixed(2)}</span>
          </div>
          <div className="receipt-row">
            <span>Order Status</span>
            <span className="status-paid">Paid</span>
          </div>
        </div>

        <div className="receipt-modal-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={() => onClose('print')}
          >
            Print Receipt
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => onClose('new-order')}
          >
            New Order
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={() => onClose('dashboard')}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
