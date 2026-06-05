import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/useOrderStore';
import BillTable from '../components/BillTable';
import PaymentPanel from '../components/PaymentPanel';
import ReceiptModal from '../components/ReceiptModal';
import './BillingScreen.css';

const BillingScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { orders, updateStatus } = useOrderStore();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [discount, setDiscount] = useState({ type: 'none', value: 0 });
  const [serviceCharge, setServiceCharge] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [amountTendered, setAmountTendered] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [paidOrderId, setPaidOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-load order from URL param if provided
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId && orders.length > 0) {
      const order = orders.find((o) => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
        setAmountTendered(order.total.toString());
      }
    }
  }, [searchParams, orders]);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return [...orders]
      .filter((order) => {
        if (!query) return true;
        return (
          order.number.toLowerCase().includes(query) ||
          order.tableNumber.toString().includes(query)
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, searchTerm]);

  // Calculate totals with discount and service charge
  const billTotals = useMemo(() => {
    if (!selectedOrder) return null;

    let subtotal = selectedOrder.subtotal;
    let tax = selectedOrder.tax;

    // Apply discount
    let discountAmount = 0;
    if (discount.type === 'percentage') {
      discountAmount = (subtotal * discount.value) / 100;
    } else if (discount.type === 'fixed') {
      discountAmount = discount.value;
    }

    // Apply service charge (on subtotal before discount)
    let svcCharge = 0;
    if (serviceCharge) {
      svcCharge = (subtotal * 10) / 100;
    }

    const totalBeforeTax = subtotal - discountAmount;
    const finalTax = (totalBeforeTax * 8) / 100;
    const totalDue = totalBeforeTax + finalTax + svcCharge;

    return {
      subtotal,
      discount: discountAmount,
      tax: finalTax,
      serviceCharge: svcCharge,
      total: totalDue,
    };
  }, [selectedOrder, discount, serviceCharge]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setAmountTendered(order.total.toString());
    setDiscount({ type: 'none', value: 0 });
    setServiceCharge(false);
    setPaymentMethod(null);
  };

  const handlePaymentConfirm = () => {
    if (!selectedOrder || !paymentMethod) return;

    // Update order status to Paid
    updateStatus(selectedOrder.id, 'Paid');
    setPaidOrderId(selectedOrder.id);
    setShowReceipt(true);
  };

  const handleCloseReceipt = (action) => {
    setShowReceipt(false);
    setPaidOrderId(null);

    if (action === 'dashboard') {
      navigate('/dashboard');
    } else if (action === 'new-order') {
      navigate('/pos-order');
    }
    // 'print' just closes the modal
  };

  const changeDue = amountTendered ? Math.max(0, parseFloat(amountTendered) - (billTotals?.total || 0)) : 0;

  return (
    <div className="billing-screen">
      {/* Orders Sidebar */}
      <div className="billing-sidebar">
        <div className="billing-sidebar-header">
          <h2>Bills</h2>
        </div>
        <input
          type="text"
          className="billing-sidebar-search"
          placeholder="Search order or table"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="billing-orders-list">
          {filteredOrders.length === 0 ? (
            <div className="billing-empty-list">No orders found</div>
          ) : (
            filteredOrders.map((order) => (
              <button
                key={order.id}
                type="button"
                className={`billing-order-item ${selectedOrder?.id === order.id ? 'active' : ''}`}
                onClick={() => handleSelectOrder(order)}
              >
                <div className="order-item-header">
                  <span className="order-number">{order.number}</span>
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-item-meta">
                  <span>Table {order.tableNumber}</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="billing-main">
        {selectedOrder ? (
          <>
            {/* Order Header */}
            <div className="billing-order-header">
              <div>
                <span className="header-label">Order #</span>
                <span className="header-value">{selectedOrder.number}</span>
              </div>
              <div>
                <span className="header-label">Table</span>
                <span className="header-value">{selectedOrder.tableNumber}</span>
              </div>
              <div>
                <span className="header-label">Status</span>
                <span className={`status-badge status-${selectedOrder.status.toLowerCase()}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            {/* Bill Table */}
            <BillTable items={selectedOrder.items} />

            {/* Totals Section */}
            <div className="billing-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${billTotals.subtotal.toFixed(2)}</span>
              </div>

              {billTotals.discount > 0 && (
                <div className="total-row discount">
                  <span>Discount ({discount.type === 'percentage' ? `${discount.value}%` : '$'})</span>
                  <span>-${billTotals.discount.toFixed(2)}</span>
                </div>
              )}

              {serviceCharge && (
                <div className="total-row service-charge">
                  <span>Service Charge (10%)</span>
                  <span>${billTotals.serviceCharge.toFixed(2)}</span>
                </div>
              )}

              <div className="total-row tax">
                <span>Tax (8%)</span>
                <span>${billTotals.tax.toFixed(2)}</span>
              </div>

              <div className="total-row final-total">
                <span>Total Due</span>
                <span>${billTotals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Discount Field */}
            <div className="billing-discount-section">
              <label>Apply Discount (Optional)</label>
              <div className="discount-inputs">
                <div className="discount-input-group">
                  <input
                    type="number"
                    min="0"
                    value={discount.value}
                    onChange={(e) => setDiscount({ ...discount, value: parseFloat(e.target.value) || 0 })}
                    placeholder="Amount"
                  />
                  <select value={discount.type} onChange={(e) => setDiscount({ ...discount, type: e.target.value })}>
                    <option value="none">None</option>
                    <option value="percentage">%</option>
                    <option value="fixed">$</option>
                  </select>
                </div>
                <label className="service-charge-toggle">
                  <input
                    type="checkbox"
                    checked={serviceCharge}
                    onChange={(e) => setServiceCharge(e.target.checked)}
                  />
                  <span>Add 10% Service Charge</span>
                </label>
              </div>
            </div>
          </>
        ) : (
          <div className="billing-empty">
            <div className="empty-illustration">🧾</div>
            <h2>Select an Order</h2>
            <p>Choose a bill from the left to view details and process payment.</p>
          </div>
        )}
      </div>

      {/* Payment Panel */}
      <PaymentPanel
        selectedOrder={selectedOrder}
        billTotals={billTotals}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
        amountTendered={amountTendered}
        onAmountTenderedChange={setAmountTendered}
        changeDue={changeDue}
        onConfirmPayment={handlePaymentConfirm}
      />

      {/* Receipt Modal */}
      {showReceipt && selectedOrder && (
        <ReceiptModal
          order={selectedOrder}
          totals={billTotals}
          paymentMethod={paymentMethod}
          onClose={handleCloseReceipt}
        />
      )}
    </div>
  );
};

export default BillingScreen;
