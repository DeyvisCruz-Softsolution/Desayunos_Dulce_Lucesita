import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartCheckout = ({ cartItems }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const res = await axios.post('/api/orders/create-from-cart', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      navigate('/order-success', { state: res.data });
    } catch (err) {
      alert('Error al procesar la orden.');
    }
  };

  return (
    <div className="checkout-container">
      <button onClick={handleCheckout} className="btn btn-success">
        Confirmar Pedido
      </button>
    </div>
  );
};

export default CartCheckout;
