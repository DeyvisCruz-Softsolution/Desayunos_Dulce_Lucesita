import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <p>No hay información de la orden.</p>;

  return (
    <div className="order-success">
      <h2>¡Gracias por tu compra!</h2>
      <p>Tu orden ha sido procesada correctamente.</p>
      <h4>ID Orden: {order.id}</h4>

      {order.items?.map(item => (
        <div key={item.id} className="item">
          <p>{item.Product?.title}</p>
          <img src={item.Product?.imageUrl} alt={item.Product?.title} width={120} />
          <p>Cantidad: {item.quantity}</p>
          <p>Precio: ${item.Product?.price}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderSuccess;
