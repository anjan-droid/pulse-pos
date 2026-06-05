import React from 'react';

const MenuGrid = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  items,
  onAddToCart,
}) => {
  return (
    <div className="menu-browser">
      <div className="menu-browser-top">
        <input
          type="text"
          className="pos-search-input"
          placeholder="Search menu"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-card-grid">
        {items.length > 0 ? (
          items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`menu-card ${item.available ? '' : 'disabled'}`}
              onClick={() => onAddToCart(item)}
              disabled={!item.available}
            >
              <div className="menu-card-media">🍛</div>
              <div className="menu-card-body">
                <div className="menu-card-name">{item.name}</div>
                <div className="menu-card-price">${item.price.toFixed(2)}</div>
              </div>
            </button>
          ))
        ) : (
          <div className="empty-grid-state">No menu items match your search.</div>
        )}
      </div>
    </div>
  );
};

export default MenuGrid;
