import React from 'react';
import StatusBadge from './StatusBadge';
import ElapsedTimer from './ElapsedTimer';
import { getOrderPrimaryDetail, getOrderTypeLabel } from '../utils/orderType';

const actionLabelMap = {
  Pending: 'Start preparing',
  Preparing: 'Mark ready',
  Ready: 'Mark served',
};

const actionClassMap = {
  Pending: 'kds-action-amber',
  Preparing: 'kds-action-blue',
  Ready: 'kds-action-green',
};

const KDSCard = ({ order, onAction, flash }) => {
  return (
    <div className={`kds-card ${flash ? 'kds-card-flash' : ''}`}>
      <div className="kds-card-header">
        <div>
          <div className="kds-order-number">{order.number}</div>
          <div className="kds-table-number">
            {getOrderPrimaryDetail(order)} - {getOrderTypeLabel(order.orderType)}
          </div>
          {order.orderType === 'delivery' ? (
            <div className="kds-table-number">{order.customerDetails?.address}</div>
          ) : null}
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="kds-item-list">
        {order.items.map((item) => (
          <div key={item.id} className="kds-item-row">
            <span>{item.name}</span>
            <span>x{item.quantity}</span>
          </div>
        ))}
      </div>

      {order.notes ? <div className="kds-notes">{order.notes}</div> : null}

      <div className="kds-footer-row">
        <ElapsedTimer createdAt={order.createdAt} />
        {actionLabelMap[order.status] && (
          <button
            type="button"
            className={`kds-action-button ${actionClassMap[order.status]}`}
            onClick={() => onAction(order.id)}
          >
            {actionLabelMap[order.status]}
          </button>
        )}
      </div>
    </div>
  );
};

export default KDSCard;
