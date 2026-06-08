import React, { useEffect, useState } from 'react';

const MenuItemModal = ({ open, item, categories, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    category: categories[0] || '',
    price: '',
    description: '',
    available: true,
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

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
        description: item.description || '',
        available: item.available,
        imageUrl: item.imageUrl || '',
      });
      setImagePreview(item.imageUrl || '');
    } else {
      setForm({
        id: '',
        name: '',
        category: categories[0] || '',
        price: '',
        description: '',
        available: true,
        imageUrl: '',
      });
      setImagePreview('');
    }
    setImageFile(null);
  }, [open, item, categories]);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    // Try to upload to backend if available
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      }
    } catch (error) {
      console.error('Error uploading to server:', error);
    }
    
    // Fallback: Convert to base64 (works without backend)
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.category.trim() || form.price === '') {
      alert('Please fill in all required fields');
      return;
    }

    setUploading(true);

    try {
      let imageUrl = form.imageUrl;
      
      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      onSave({
        ...form,
        price: parseFloat(form.price) || 0,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setImageFile(null);
    handleChange('imageUrl', '');
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
          {/* Image Upload Section */}
          <div className="form-group">
            <span>Item Image</span>
            <div className="image-upload-container">
              {imagePreview ? (
                <div className="image-preview-wrapper">
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                  <button type="button" className="remove-image-btn" onClick={removeImage}>
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="image-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload" className="upload-image-label">
                    📸 Click to upload image
                  </label>
                  <small className="upload-hint">PNG, JPG, WEBP (max 2MB)</small>
                </div>
              )}
            </div>
          </div>

          <label className="form-group">
            <span>Name *</span>
            <input
              className="text-input"
              type="text"
              required
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
              placeholder="e.g., Margherita Pizza"
            />
          </label>

          <label className="form-group">
            <span>Category *</span>
            <select
              className="select-input"
              value={form.category}
              onChange={(event) => handleChange('category', event.target.value)}
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="form-group">
            <span>Price *</span>
            <input
              className="text-input"
              type="number"
              min="0"
              step="0.01"
              required
              value={form.price}
              onChange={(event) => handleChange('price', event.target.value)}
              placeholder="0.00"
            />
          </label>

          <label className="form-group">
            <span>Description</span>
            <textarea
              className="textarea-input"
              rows="3"
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
              placeholder="Describe the item..."
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
            <button type="submit" className="button button-primary" disabled={uploading}>
              {uploading ? 'Saving...' : (item ? 'Update Item' : 'Add Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuItemModal;