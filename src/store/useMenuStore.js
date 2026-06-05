import React from 'react';

const initialState = {
  categories: ['Starters', 'Mains', 'Drinks', 'Desserts'],
  items: [
    {
      id: 'item-1',
      name: 'Truffle Fries',
      category: 'Starters',
      price: 8.5,
      description: 'Crispy fries finished with truffle oil and parmesan.',
      available: true,
    },
    {
      id: 'item-2',
      name: 'Brussels Sprout Salad',
      category: 'Starters',
      price: 10.0,
      description: 'Roasted sprouts with almonds and lemon dressing.',
      available: true,
    },
    {
      id: 'item-3',
      name: 'Steak Frites',
      category: 'Mains',
      price: 24.0,
      description: 'Grilled steak with rosemary butter and hand-cut fries.',
      available: true,
    },
    {
      id: 'item-4',
      name: 'Salmon Bowl',
      category: 'Mains',
      price: 19.5,
      description: 'Seared salmon, jasmine rice, avocado, and sesame glaze.',
      available: true,
    },
    {
      id: 'item-5',
      name: 'Spicy Ramen',
      category: 'Mains',
      price: 16.0,
      description: 'Rich pork broth with noodles and chili oil.',
      available: false,
    },
    {
      id: 'item-6',
      name: 'BBQ Chicken Pizza',
      category: 'Mains',
      price: 18.0,
      description: 'Crispy crust with chicken, mozzarella, and red onion.',
      available: true,
    },
    {
      id: 'item-7',
      name: 'Matcha Latte',
      category: 'Drinks',
      price: 6.5,
      description: 'Creamy matcha with steamed milk.',
      available: true,
    },
    {
      id: 'item-8',
      name: 'Cold Brew',
      category: 'Drinks',
      price: 5.0,
      description: 'Smooth cold brew coffee served over ice.',
      available: true,
    },
    {
      id: 'item-9',
      name: 'Mango Smoothie',
      category: 'Drinks',
      price: 7.0,
      description: 'Fresh mango blended with coconut water.',
      available: false,
    },
    {
      id: 'item-10',
      name: 'Chocolate Lava Cake',
      category: 'Desserts',
      price: 9.0,
      description: 'Warm chocolate cake with molten center.',
      available: true,
    },
    {
      id: 'item-11',
      name: 'Cheesecake',
      category: 'Desserts',
      price: 8.5,
      description: 'Classic cheesecake with berry compote.',
      available: true,
    },
    {
      id: 'item-12',
      name: 'Seasonal Sorbet',
      category: 'Desserts',
      price: 7.5,
      description: 'Light sorbet made from seasonal fruit.',
      available: true,
    },
  ],
};

function menuReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    case 'TOGGLE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, available: !item.available } : item
        ),
      };
    case 'ADD_CATEGORY':
      if (!action.payload || state.categories.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    default:
      return state;
  }
}

export const useMenuStore = () => {
  const [state, dispatch] = React.useReducer(menuReducer, initialState);

  const addItem = (item) => {
    const payload = {
      ...item,
      id: `item-${Date.now()}`,
    };
    dispatch({ type: 'ADD_ITEM', payload });
  };

  const updateItem = (item) => dispatch({ type: 'UPDATE_ITEM', payload: item });

  const toggleItem = (itemId) => dispatch({ type: 'TOGGLE_ITEM', payload: itemId });

  const addCategory = (categoryName) =>
    dispatch({ type: 'ADD_CATEGORY', payload: categoryName });

  return {
    state,
    addItem,
    updateItem,
    toggleItem,
    addCategory,
  };
};
