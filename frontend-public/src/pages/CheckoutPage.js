// src/pages/CheckoutPage.js
import React, { useEffect, useState } from 'react';
import { getCartItems, clearCart, updateCartItem, removeFromCart } from '../services/cartService';

import { createOrderFromCart } from '../services/orderService';
import { getUserProfile } from '../services/profileService';
import { useNavigate } from 'react-router-dom';
import './checkout.css';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    descripcion: '',
  });

  useEffect(() => {
    fetchCart();
    fetchProfile();
  }, []);

  const fetchCart = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items);
    } catch (err) {
      setMessage('Error al cargar el carrito.');
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
      setMessage('Error al cargar el perfil del usuario.');
    }
  };

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.Product.price, 0);

  const isProfileComplete = profile?.name && profile?.phone && profile?.address && profile?.city;
  const isFormValid = form.descripcion;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleQuantityChange = async (itemId, newQuantity) => {
  try {
    if (newQuantity < 1) {
      setRemovingItemId(itemId); // activa animación
      setTimeout(async () => {
        await removeFromCart(itemId);
        setRemovingItemId(null);
        fetchCart();
        setMessage('🗑️ Producto eliminado del carrito.');
      }, 500); // esperar a que se complete el fade-out
    } else {
      await updateCartItem(itemId, newQuantity);
      fetchCart();
    }
  } catch (error) {
    setMessage('❌ Error al actualizar cantidad.');
  }
};


  const handleConfirmOrder = async () => {
    try {
      setLoading(true);
      await createOrderFromCart({ descripcion: form.descripcion });
      await clearCart();
      setMessage('✅ Pedido confirmado. Se envió un correo con el resumen.');
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setMessage('❌ Error al confirmar el pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>🧾 Confirmar pedido</h2>

      {!isProfileComplete && (
        <p className="error-message">
          ⚠️ Tu perfil está incompleto. Por favor <a href="/profile">actualízalo</a> o <a href="/register">Regístrate</a> gratis antes de confirmar el pedido.
        </p>
      )}

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="checkout-items">
            {cartItems.map(item => (
              <li
  key={item.id}
  className={`checkout-item ${removingItemId === item.id ? 'fade-out' : ''}`}
>
                <img src={item.Product.imageUrl} alt={item.Product.title} className="checkout-img" />
                <div>
                  <h4>{item.Product.title}</h4>
                  <p><em>{item.Product.description}</em></p>
                  <p>Precio unitario: ${item.Product.price.toFixed(2)}</p>
                  <p>Subtotal: ${(item.Product.price * item.quantity).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="total">Total: ${total.toFixed(2)}</h3>

          <div className="checkout-form">
            <h4>Datos de entrega</h4>
            <textarea
              name="descripcion"
              placeholder="Dirección de envío, hora, mensaje si lleva tarjeta, etc."
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              required
            ></textarea>
          </div>

          <button
            className="confirm-button"
            onClick={handleConfirmOrder}
            disabled={!isFormValid || !isProfileComplete || loading}
          >
            {loading ? 'Procesando...' : 'Confirmar pedido'}
          </button>
        </>
      )}

      {message && <p className="checkout-message">{message}</p>}
    </div>
  );
};

export default CheckoutPage;
