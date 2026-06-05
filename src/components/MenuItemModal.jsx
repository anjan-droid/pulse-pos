import React, { useEffect, useState } from 'react';

const MenuItemModal = ({ open, item, categories, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    category: categories[0] || '',
    price: '',
    description: '',
    available: true,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    if (item) {
      setForm({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price.toString(),
        description: item.description,
        available: item.available,
      });
    } else {
      setForm({
        id: '',
        name: '',
        category: categories[0] || '',
        price: '',
        description: '',
        available: true,
      });
    }
  }, [open, item, categories]);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.category.trim() || form.price === '') {
      return;
    }

    onSave({
      ...form,
      price: parseFloat(form.price) || 0,
    });
  };

  if (!open) {
    return null;
  }

  return (
    <div className="menu-modal-overlay">
      <div className="menu-modal-card">
        <div className="menu-modal-header">
          <div>
            <h2>{item ? 'Edit menu item' : 'Add menu item'}</h2>
            <p>{item ? 'Update details for this item.' : 'Create a new menu item and assign it a category.'}</p>
          </div>
          <button type="button" className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="menu-modal-form" onSubmit={handleSubmit}>
          <label className="form-group">
            <span>Name</span>
            <input
              className="text-input"
              type="text"
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
            />
          </label>

          <label className="form-group">
            <span>Category</span>
            <select
              className="select-input"
              value={form.category}
              onChange={(event) => handleChange('category', event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="form-group">
            <span>Price</span>
            <input
              className="text-input"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) => handleChange('price', event.target.value)}
            />
          </label>

          <label className="form-group">
            <span>Description</span>
            <textarea
              className="textarea-input"
              rows="3"
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
            />
          </label>

          <label className="form-group toggle-group">
            <span>Available</span>
            <input
              type="checkbox"
              checked={form.available}
              onChange={(event) => handleChange('available', event.target.checked)}
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="button button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              Save item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemModal;
