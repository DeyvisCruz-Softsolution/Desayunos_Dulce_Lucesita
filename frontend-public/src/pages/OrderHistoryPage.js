import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../services/orderService';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        setMessage('❌ Error al cargar tus pedidos.');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h2>📦 Historial de compras</h2>
      {message && <p>{message}</p>}
      {orders.length === 0 ? (
        <p>No has realizado pedidos aún.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <p><strong>Producto:</strong> {order.Product.title}</p>
              <p><strong>Cantidad:</strong> {order.quantity}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
              <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
