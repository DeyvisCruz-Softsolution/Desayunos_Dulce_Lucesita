import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../services/orderService';
import OrderTable from '../components/OrderTable';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar pedidos');
      }
    };

    load();
  }, []);

  return (
    <div>
      <h2>Pedidos</h2>
      {error && <p>{error}</p>}
      <OrderTable orders={orders} />
    </div>
  );
};

export default ManageOrders;