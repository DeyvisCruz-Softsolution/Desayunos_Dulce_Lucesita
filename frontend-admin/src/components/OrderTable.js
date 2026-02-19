import React from 'react';
import { updateOrderStatus } from '../services/orderService';
import './OrderTable.css';

const OrderTable = ({ orders, onStatusChange }) => {
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus);

      alert(res.message || '✅ Estado actualizado correctamente.');

      // 🔁 Refrescar la lista si se pasó la función desde el componente padre
      if (typeof onStatusChange === 'function') {
        onStatusChange(); 
      }
    } catch (error) {
      console.error('❌ Error actualizando estado:', error);
      alert('❌ Error actualizando estado.');
    }
  };

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>ID Pedido</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.Product?.title}</td>
            <td>{order.quantity}</td>
            <td>${order.total?.toFixed(2)}</td>
            <td>
              <span className={`status status-${order.status}`}>
                {order.status}
              </span>
            </td>
            <td>
              <button
                className="action-button action-vendido"
                onClick={() => handleStatusUpdate(order.id, 'vendido')}
                disabled={order.status === 'vendido'}
              >
                ✅ Vendido
              </button>
              <button
                className="action-button action-cancelado"
                onClick={() => handleStatusUpdate(order.id, 'cancelado')}
                disabled={order.status === 'cancelado'}
              >
                ❌ Cancelado
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
