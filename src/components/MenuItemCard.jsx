import React from 'react';

const MenuItemCard = ({ item, onEdit, onToggle, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
      onDelete(item.id);
    }
  };

  return (
    <article className="menu-item-card">
      <div className="menu-item-media">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name}
            className="menu-item-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/120x120?text=No+Image';
            }}
          />
        ) : (
          <div className="menu-item-emoji-placeholder">🍽️</div>
        )}
      </div>

      <div className="menu-item-details">
        <div className="menu-item-heading">
          <div className="menu-item-title">{item.name}</div>
          <div className={`item-status ${item.available ? 'status-active' : 'status-deactivated'}`}>
            {item.available ? 'Active' : "Deactivated"}
          </div>
        </div>

        <div className="menu-item-price">${item.price?.toFixed(2) || '0.00'}</div>
        <p className="menu-item-copy">{item.description || 'No description provided'}</p>
      </div>

      <div className="menu-item-actions">
        <button 
          type="button" 
          className="button button-secondary" 
          onClick={() => onEdit(item)}
        >
          Edit
        </button>
        <button 
          type="button" 
          className={`button button-toggle ${item.available ? 'button-deactivate' : 'button-activate'}`} 
          onClick={() => onToggle(item.id)}
        >
          {item.available ? "Deactivate" : 'Activate'}
        </button>
        <button 
          type="button" 
          className="button button-danger" 
          onClick={handleDelete}
        >
          🗑️ Delete
        </button>
      </div>
    </article>
  );
};

export default MenuItemCard;