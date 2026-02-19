import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../services/orderService';
import OrderTable from '../components/OrderTable';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);

  return (
    <div>
      <h2>Pedidos</h2>
      <OrderTable orders={orders} />
    </div>
  );
};

export default ManageOrders;
