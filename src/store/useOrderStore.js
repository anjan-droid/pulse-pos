import React from 'react';

const OrderContext = React.createContext(null);

const initialState = {
  orders: [
    {
      id: 'order-1001',
      number: '#1001',
      tableNumber: '4',
      items: [
        { id: 'item-1', name: 'Truffle Fries', quantity: 1, price: 8.5 },
        { id: 'item-3', name: 'Steak Frites', quantity: 1, price: 24.0 },
      ],
      status: 'Pending',
      createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
      notes: 'Extra ketchup please',
      subtotal: 32.5,
      tax: 2.6,
      total: 35.1,
    },
    {
      id: 'order-1002',
      number: '#1002',
      tableNumber: '7',
      items: [
        { id: 'item-7', name: 'Matcha Latte', quantity: 2, price: 6.5 },
        { id: 'item-11', name: 'Cheesecake', quantity: 1, price: 8.5 },
      ],
      status: 'Preparing',
      createdAt: new Date(Date.now() - 7 * 60000).toISOString(),
      notes: '',
      subtotal: 21.5,
      tax: 1.72,
      total: 23.22,
    },
    {
      id: 'order-1003',
      number: '#1003',
      tableNumber: '2',
      items: [
        { id: 'item-5', name: 'Spicy Ramen', quantity: 1, price: 16.0 },
      ],
      status: 'Ready',
      createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
      notes: 'No chili flakes',
      subtotal: 16.0,
      tax: 1.28,
      total: 17.28,
    },
  ],
};

function orderReducer(state, action) {
  switch (action.type) {
    case 'CREATE_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };
    case 'UPDATE_STATUS':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? { ...order, status: action.payload.status } : order
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(orderReducer, initialState);

  const createOrder = (order) => dispatch({ type: 'CREATE_ORDER', payload: order });

  const updateStatus = (id, status) =>
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <OrderContext.Provider value={{ orders: state.orders, createOrder, updateStatus, clearCart }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderStore = () => {
  const context = React.useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderStore must be used within an OrderProvider');
  }

  return context;
};
