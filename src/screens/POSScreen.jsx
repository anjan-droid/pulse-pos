import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../store/useMenuStore';
import { useOrderStore } from '../store/useOrderStore';
import { useCart } from '../hooks/useCart';
import MenuGrid from '../components/MenuGrid';
import CartPanel from '../components/CartPanel';
import './POSScreen.css';

const ORDER_TYPES = [
  { value: 'dine-in', label: 'Dine-in' },
  { value: 'takeaway', label: 'Takeaway' },
  { value: 'delivery', label: 'Delivery' },
];

const POSScreen = () => {
  const { state: menuState } = useMenuStore();
  const { createOrder } = useOrderStore();
  const { cartItems, addItem, removeItem, updateQty, clearCart, cartTotal } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All items');
  const [tableNumber, setTableNumber] = useState('1');
  const [orderType, setOrderType] = useState('dine-in');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [toast, setToast] = useState('');
  const [orderNumber] = useState(() => `#${Math.floor(1000 + Math.random() * 9000)}`);
  const navigate = useNavigate();

  const categories = useMemo(() => ['All items', ...menuState.categories], [menuState.categories]);

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return menuState.items.filter((item) => {
      const matchesCategory = activeCategory === 'All items' || item.category === activeCategory;
      const matchesSearch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory, menuState.items]);

  const subtotal = Number(cartTotal.toFixed(2));
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  const hasRequiredOrderDetails =
    orderType === 'dine-in' ||
    (customerDetails.name.trim() !== '' &&
      customerDetails.phone.trim() !== '' &&
      (orderType === 'takeaway' || customerDetails.address.trim() !== ''));

  const handleAddToCart = (item) => {
    if (!item.available) {
      return;
    }
    addItem(item);
  };

  const handleSendToKitchen = () => {
    if (cartItems.length === 0) {
      return;
    }

    const newOrder = {
      id: `order-${Date.now()}`,
      number: orderNumber,
      tableNumber: orderType === 'dine-in' ? tableNumber : '',
      orderType,
      customerDetails: {
        name: customerDetails.name.trim(),
        phone: customerDetails.phone.trim(),
        address: customerDetails.address.trim(),
      },
      items: cartItems,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      subtotal,
      tax,
      total,
    };

    createOrder(newOrder);
    clearCart();
    setToast(`Order ${orderNumber} sent to kitchen`);

    setTimeout(() => {
      setToast('');
      navigate('/orders');
    }, 500);
  };

  return (
    <div className="pos-screen">
      <div className="pos-title-row">
        <div>
          <h1>POS Order</h1>
          <p>Browse the menu and send new orders to the kitchen.</p>
        </div>
      </div>

      <div className="pos-layout">
        <section className="pos-left">
          <MenuGrid
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            items={filteredItems}
            onAddToCart={handleAddToCart}
          />
        </section>

        <aside className="pos-right">
          <CartPanel
            orderNumber={orderNumber}
            tableNumber={tableNumber}
            onTableChange={setTableNumber}
            orderTypes={ORDER_TYPES}
            orderType={orderType}
            onOrderTypeChange={setOrderType}
            customerDetails={customerDetails}
            onCustomerDetailsChange={setCustomerDetails}
            cartItems={cartItems}
            subtotal={subtotal}
            tax={tax}
            total={total}
            onDecrease={(itemId, qty) => updateQty(itemId, qty - 1)}
            onIncrease={(itemId, qty) => updateQty(itemId, qty + 1)}
            onRemove={removeItem}
            onSend={handleSendToKitchen}
            disabled={cartItems.length === 0 || !hasRequiredOrderDetails}
          />
        </aside>
      </div>

      {toast && <div className="pos-toast">{toast}</div>}
    </div>
  );
};

export default POSScreen;
