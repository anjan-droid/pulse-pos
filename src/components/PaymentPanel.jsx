import React from 'react';

const PaymentPanel = ({
  selectedOrder,
  billTotals,
  paymentMethod,
  onPaymentMethodChange,
  amountTendered,
  onAmountTenderedChange,
  changeDue,
  onConfirmPayment,
}) => {
  const paymentMethods = [
    { id: 'card', label: 'Card', icon: '💳' },
    { id: 'cash', label: 'Cash', icon: '💵' },
    { id: 'upi', label: 'UPI', icon: '📱' },
    { id: 'split', label: 'Split bill', icon: '👥' },
  ];

  return (
    <div className="payment-panel">
      <div className="payment-section">
        <label className="payment-label">Payment Method</label>
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              className={`payment-method-btn ${paymentMethod === method.id ? 'active' : ''}`}
              onClick={() => onPaymentMethodChange(method.id)}
              disabled={!selectedOrder}
            >
              <span className="method-icon">{method.icon}</span>
              <span className="method-label">{method.label}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedOrder && billTotals && (
        <>
          <div className="payment-amount-section">
            <label>Amount</label>
            <div className="amount-display">
              ${billTotals.total.toFixed(2)}
            </div>

            {paymentMethod === 'cash' && (
              <>
                <label style={{ marginTop: '1rem' }}>Amount Tendered</label>
                <input
                  type="number"
                  className="amount-input"
                  value={amountTendered}
                  onChange={(e) => onAmountTenderedChange(e.target.value)}
                  min={billTotals.total}
                  step="0.01"
                />
              </>
            )}

            {paymentMethod === 'cash' && changeDue > 0 && (
              <div className="change-due">
                <span>Change Due</span>
                <span className="change-amount">${changeDue.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="payment-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={onConfirmPayment}
              disabled={!paymentMethod}
            >
              Confirm Payment
            </button>
            <button type="button" className="button button-secondary">
              Print Receipt
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPanel;
