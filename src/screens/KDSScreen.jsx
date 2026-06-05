import React from 'react';
import { useOrderStore } from '../store/useOrderStore';
import KDSCard from '../components/KDSCard';
import './KDSScreen.css';

const statusColumns = ['Pending', 'Preparing', 'Ready'];
const nextStatus = {
  Pending: 'Preparing',
  Preparing: 'Ready',
  Ready: 'Served',
};

const KDSScreen = () => {
  const { orders, updateStatus } = useOrderStore();
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [flashOrders, setFlashOrders] = React.useState([]);
  const [pollTick, setPollTick] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => window.clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setPollTick((value) => value + 1);
    }, 10000);
    return () => window.clearInterval(interval);
  }, []);

  const lastOrderCount = React.useRef(orders.length);

  React.useEffect(() => {
    if (orders.length > lastOrderCount.current) {
      const newIds = orders.slice(0, orders.length - lastOrderCount.current).map((order) => order.id);
      setFlashOrders((current) => [...current, ...newIds]);
      window.setTimeout(() => {
        setFlashOrders((current) => current.filter((id) => !newIds.includes(id)));
      }, 1600);
    }
    lastOrderCount.current = orders.length;
  }, [orders]);

  const onAction = (orderId) => {
    const order = orders.find((item) => item.id === orderId);
    if (!order) {
      return;
    }
    const next = nextStatus[order.status];
    if (next) {
      updateStatus(orderId, next);
    }
  };

  const grouped = statusColumns.reduce((acc, status) => {
    acc[status] = orders.filter((order) => order.status === status);
    return acc;
  }, {});

  return (
    <div className="kds-screen">
      <div className="kds-topbar">
        <div className="kds-title-group">
          <h1>Kitchen display</h1>
          <div className="kds-live-indicator">
            <span className="live-dot" /> Live
          </div>
        </div>
        <div className="kds-time-display">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>

      <div className="kds-board">
        {statusColumns.map((status) => (
          <section key={status} className={`kds-column kds-column-${status.toLowerCase()}`}>
            <div className="kds-column-header">
              <div>{status}</div>
              <div className="kds-column-count">{grouped[status].length}</div>
            </div>
            <div className="kds-column-body">
              {grouped[status].map((order) => (
                <KDSCard
                  key={order.id}
                  order={order}
                  onAction={onAction}
                  flash={flashOrders.includes(order.id)}
                />
              ))}
              {grouped[status].length === 0 && <div className="kds-empty-state">No orders</div>}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default KDSScreen;
