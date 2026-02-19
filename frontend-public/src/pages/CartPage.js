// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import { getCartItems, updateCartItem, removeCartItem } from '../services/cartService';
import { useNavigate } from 'react-router-dom';
import './styles/cartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const items = await getCartItems();
      setCartItems(items);
    } catch (error) {
      console.error('❌ Error al obtener el carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity);
      fetchCart();
    } catch (error) {
      console.error('❌ Error al actualizar la cantidad:', error);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(itemId);
      fetchCart();
    } catch (error) {
      console.error('❌ Error al eliminar el producto:', error);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.Product.price, 0);

  const goToCheckout = () => navigate('/checkout');

  if (loading) return <p>Cargando carrito...</p>;

  if (cartItems.length === 0) return <p>🛒 Tu carrito está vacío.</p>;

  return (
    <div className="cart-page">
      <h1>🛍️ Tu Carrito</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.Product.imageUrl} alt={item.Product.title} className="cart-img" />
            <div className="cart-info">
              <h3>{item.Product.title}</h3>
              <p>Precio unitario: ${item.Product.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                >-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => handleRemove(item.id)}>❌ Eliminar</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ${totalPrice.toFixed(2)}</h2>
        <button className="checkout-btn" onClick={goToCheckout}>Confirmar pedido</button>
      </div>
    </div>
  );
};

export default CartPage;
