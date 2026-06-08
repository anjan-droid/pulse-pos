import React from 'react';
import CartItem from './CartItem';

const CartPanel = ({
  orderNumber,
  tableNumber,
  onTableChange,
  orderTypes,
  orderType,
  onOrderTypeChange,
  customerDetails,
  onCustomerDetailsChange,
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
  const handleCustomerDetailChange = (field, value) => {
    onCustomerDetailsChange({
      ...customerDetails,
      [field]: value,
    });
  };

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <div>
          <div className="cart-label">Order</div>
          <h2>{orderNumber}</h2>
        </div>
        <div className="order-type-field">
          <div className="cart-label">Order type</div>
          <div className="order-type-options" role="group" aria-label="Order type">
            {orderTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                className={`order-type-option ${orderType === type.value ? 'active' : ''}`}
                onClick={() => onOrderTypeChange(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        {orderType === 'dine-in' ? (
          <label className="order-detail-field">
            Table
            <select value={tableNumber} onChange={(event) => onTableChange(event.target.value)}>
              {Array.from({ length: 12 }, (_, index) => index + 1).map((number) => (
                <option key={number} value={String(number)}>
                  {number}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <div className="customer-detail-fields">
            <label className="order-detail-field">
              Name
              <input
                type="text"
                value={customerDetails.name}
                onChange={(event) => handleCustomerDetailChange('name', event.target.value)}
                placeholder="Customer name"
              />
            </label>
            <label className="order-detail-field">
              Phone
              <input
                type="tel"
                value={customerDetails.phone}
                onChange={(event) => handleCustomerDetailChange('phone', event.target.value)}
                placeholder="Phone number"
              />
            </label>
            {orderType === 'delivery' ? (
              <label className="order-detail-field">
                Address
                <textarea
                  value={customerDetails.address}
                  onChange={(event) => handleCustomerDetailChange('address', event.target.value)}
                  placeholder="Delivery address"
                  rows="3"
                />
              </label>
            ) : null}
          </div>
        )}
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
