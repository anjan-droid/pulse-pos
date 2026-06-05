const useDashboardData = () => {
  // Mock data - can be replaced with API calls later
  const dashboardData = {
    metrics: {
      revenue: {
        value: 2841,
        change: 14,
        label: 'Revenue today'
      },
      orders: {
        value: 87,
        change: 9,
        label: 'Orders today'
      },
      avgOrderValue: {
        value: 32.66,
        change: -2,
        label: 'Avg order value'
      },
      activeTables: {
        value: 6,
        total: 14,
        label: 'Active tables'
      }
    },
    revenueByHour: [
      { time: '9am', amount: 145 },
      { time: '10am', amount: 210 },
      { time: '11am', amount: 320 },
      { time: '12pm', amount: 580 },
      { time: '1pm', amount: 450 },
      { time: '2pm', amount: 380 },
      { time: '3pm', amount: 220 },
      { time: '4pm', amount: 165 },
      { time: '5pm', amount: 240 },
      { time: '6pm', amount: 410 },
      { time: '7pm', amount: 520 },
      { time: '8pm', amount: 375 },
      { time: '9pm', amount: 195 }
    ],
    liveOrders: [
      { id: 1001, table: 5, items: 3, status: 'pending' },
      { id: 1002, table: 8, items: 2, status: 'preparing' },
      { id: 1003, table: 12, items: 4, status: 'ready' },
      { id: 1004, table: 2, items: 1, status: 'paid' },
      { id: 1005, table: 14, items: 5, status: 'preparing' },
      { id: 1006, table: 3, items: 2, status: 'pending' },
      { id: 1007, table: 10, items: 3, status: 'ready' }
    ]
  };

  return dashboardData;
};

export { useDashboardData };
