import React from 'react';

const MenuItemCard = ({ item, onEdit, onToggle }) => {
  return (
    <article className="menu-item-card">
      <div className="menu-item-media">🍽️</div>

      <div className="menu-item-details">
        <div className="menu-item-heading">
          <div className="menu-item-title">{item.name}</div>
          <div className={`item-status ${item.available ? 'status-active' : 'status-86'}`}>
            {item.available ? 'Active' : "86'd"}
          </div>
        </div>

        <div className="menu-item-price">${item.price.toFixed(2)}</div>
        <p className="menu-item-copy">{item.description}</p>
      </div>

      <div className="menu-item-actions">
        <button type="button" className="button button-secondary" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button type="button" className="button button-toggle" onClick={() => onToggle(item.id)}>
          {item.available ? "86 item" : 'Activate'}
        </button>
      </div>
    </article>
  );
};

export default MenuItemCard;
