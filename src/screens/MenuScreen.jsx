import React, { useMemo, useState } from 'react';
import { useMenuStore } from '../store/useMenuStore';
import MenuItemCard from '../components/MenuItemCard';
import MenuItemModal from '../components/MenuItemModal';
import './MenuScreen.css';

const MenuScreen = () => {
  const { state, addItem, updateItem, toggleItem, addCategory } = useMenuStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All items');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryCounts = useMemo(() => {
    const counts = state.categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    state.items.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category] += 1;
      }
    });

    return counts;
  }, [state.categories, state.items]);

  const categories = ['All items', ...state.categories];

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return state.items.filter((item) => {
      const matchesCategory =
        activeCategory === 'All items' || item.category === activeCategory;
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory, state.items]);

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData) => {
    if (itemData.id) {
      updateItem(itemData);
    } else {
      addItem(itemData);
    }
    setIsModalOpen(false);
  };

  const handleAddCategory = () => {
    const label = window.prompt('New category name');
    if (!label) {
      return;
    }

    const trimmed = label.trim();
    if (!trimmed) {
      return;
    }

    addCategory(trimmed);
    setActiveCategory(trimmed);
  };

  return (
    <div className="menu-screen">
      <div className="menu-header">
        <div>
          <h1>Menu Management</h1>
          <p>Organize your menu items, categories, and availability.</p>
        </div>

        <div className="menu-toolbar">
          <label className="search-field">
            <span className="search-label">Search</span>
            <input
              type="text"
              placeholder="Search name or description"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
          <button type="button" className="button button-primary" onClick={handleAddItem}>
            Add item
          </button>
        </div>
      </div>

      <div className="menu-layout">
        <aside className="menu-sidebar">
          <div className="sidebar-title">Categories</div>
          <div className="category-list">
            {categories.map((category) => {
              const count = category === 'All items' ? state.items.length : categoryCounts[category] || 0;
              return (
                <button
                  type="button"
                  key={category}
                  className={`category-item ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  <span>{category}</span>
                  <span className="category-badge">{count}</span>
                </button>
              );
            })}
          </div>

          <button type="button" className="button button-secondary new-category-button" onClick={handleAddCategory}>
            + New category
          </button>
        </aside>

        <section className="menu-grid-section">
          {filteredItems.length > 0 ? (
            <div className="menu-grid">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => handleEditItem(item)}
                  onToggle={() => toggleItem(item.id)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>No items found</h2>
              <p>Try changing the category or search query.</p>
            </div>
          )}
        </section>
      </div>

      <MenuItemModal
        open={isModalOpen}
        item={editingItem}
        categories={state.categories}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
      />
    </div>
  );
};

export default MenuScreen;
