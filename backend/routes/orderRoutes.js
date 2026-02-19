const express = require('express');
const router = express.Router();
const {
  createOrder,
  createOrderFromCart,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Crear orden desde producto directo
router.post('/', authMiddleware, createOrder);

// Crear orden desde carrito
router.post('/create-from-cart', authMiddleware, createOrderFromCart);

// Obtener órdenes del usuario
router.get('/mis-pedidos', authMiddleware, getUserOrders);

// Obtener todas las órdenes (admin)
router.get('/admin', authMiddleware, getAllOrders);

router.put('/:id/status', authMiddleware, updateOrderStatus);

module.exports = router;
