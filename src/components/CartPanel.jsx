import React from 'react';
import CartItem from './CartItem';

const CartPanel = ({
  orderNumber,
  tableNumber,
  onTableChange,
  cartItems,
  subtotal,
  tax,
  total,
  onDecrease,
  onIncrease,
  onRemove,
  onSend,
  disabled,
}) => {
  return (
    <div className="cart-panel">
      <div className="cart-header">
        <div>
          <div className="cart-label">Order</div>
          <h2>{orderNumber}</h2>
        </div>
        <label className="table-select-label">
          Table
          <select value={tableNumber} onChange={(event) => onTableChange(event.target.value)}>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((number) => (
              <option key={number} value={String(number)}>
                {number}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              item={cartItem}
              qty={cartItem.quantity}
              onDecrease={() => onDecrease(cartItem.id, cartItem.quantity)}
              onIncrease={() => onIncrease(cartItem.id, cartItem.quantity)}
              onRemove={() => onRemove(cartItem.id)}
            />
          ))
        ) : (
          <div className="cart-empty">Add items from the left to start the order.</div>
        )}
      </div>

      <div className="cart-footer">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row total-row">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button type="button" className="button button-primary send-button" onClick={onSend} disabled={disabled}>
          Send to kitchen
        </button>
      </div>
    </div>
  );
};

export default CartPanel;
