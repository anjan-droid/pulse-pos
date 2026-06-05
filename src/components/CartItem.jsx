import React from 'react';

const CartItem = ({ item, qty, onDecrease, onIncrease, onRemove }) => {
  return (
    <div className="cart-item-row">
      <div className="cart-item-name">{item.name}</div>
      <div className="cart-item-quantity">
        <button type="button" className="qty-button" onClick={onDecrease}>
          −
        </button>
        <span>{qty}</span>
        <button type="button" className="qty-button" onClick={onIncrease}>
          +
        </button>
      </div>
      <div className="cart-item-total">${(item.price * qty).toFixed(2)}</div>
      <button type="button" className="cart-item-remove" onClick={onRemove}>
        ×
      </button>
    </div>
  );
};

export default CartItem;
