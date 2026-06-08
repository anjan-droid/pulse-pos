import React, { useMemo, useState } from 'react';
import { useOrderStore } from '../store/useOrderStore';
import FilterChips from '../components/FilterChips';
import OrdersTable from '../components/OrdersTable';
import OrderDetailPanel from '../components/OrderDetailPanel';
import { getOrderSearchText } from '../utils/orderType';
import './OrdersScreen.css';

const statusOptions = ['All', 'Pending', 'Preparing', 'Ready', 'Served', 'Paid'];

const OrdersScreen = () => {
  const { orders, updateStatus } = useOrderStore();
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [orders]
  );

  const filteredOrders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return sortedOrders.filter((order) => {
      const matchesStatus = activeStatus === 'All' || order.status === activeStatus;
      const matchesSearch =
        query === '' ||
        getOrderSearchText(order).includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [activeStatus, searchTerm, sortedOrders]);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || null;

  const handleSelectOrder = (orderId) => {
    setSelectedOrderId(orderId);
  };

  return (
    <div className="orders-screen">
      <div className="orders-main">
        <div className="orders-topbar">
          <div className="orders-header">
            <h1>Orders</h1>
            <p>Manage kitchen orders and track status across the floor.</p>
          </div>
          <div className="orders-controls">
            <input
              type="text"
              className="orders-search"
              placeholder="Search order, table, customer, or type"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <FilterChips
              options={statusOptions}
              activeKey={activeStatus}
              onChange={setActiveStatus}
            />
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-illustration">🍽️</div>
            <h2>No orders yet</h2>
            <p>Start a new order from the POS screen to see it here.</p>
          </div>
        ) : (
          <OrdersTable
            orders={filteredOrders}
            selectedOrderId={selectedOrderId}
            onSelectOrder={handleSelectOrder}
          />
        )}
      </div>

      <div className={`orders-detail-panel ${selectedOrder ? 'open' : ''}`}>
        {selectedOrder ? (
          <OrderDetailPanel order={selectedOrder} updateStatus={updateStatus} />
        ) : (
          <div className="orders-detail-empty">
            <h2>Order details</h2>
            <p>Select an order to review its items and move it forward.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;
