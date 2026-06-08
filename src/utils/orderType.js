const ORDER_TYPE_LABELS = {
  'dine-in': 'Dine-in',
  takeaway: 'Takeaway',
  delivery: 'Delivery',
};

export const getOrderTypeLabel = (orderType) => ORDER_TYPE_LABELS[orderType] || 'Dine-in';

export const getOrderPrimaryDetail = (order) => {
  if (order.orderType === 'dine-in') {
    return `Table ${order.tableNumber}`;
  }

  return order.customerDetails?.name || 'Guest';
};

export const getOrderSearchText = (order) =>
  [
    order.number,
    order.tableNumber,
    getOrderTypeLabel(order.orderType),
    order.customerDetails?.name,
    order.customerDetails?.phone,
    order.customerDetails?.address,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
