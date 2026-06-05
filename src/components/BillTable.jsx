import React from 'react';

const BillTable = ({ items }) => {
  return (
    <div className="bill-table">
      <div className="bill-table-header">
        <span>Item</span>
        <span>Qty</span>
        <span>Unit Price</span>
        <span>Total</span>
      </div>
      <div className="bill-table-body">
        {items.map((item, index) => (
          <div key={item.id} className={`bill-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <span className="item-name">{item.name}</span>
            <span className="item-qty">{item.quantity}</span>
            <span className="item-price">${item.price.toFixed(2)}</span>
            <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillTable;
