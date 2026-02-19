const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas protegidas
router.post('/', authMiddleware, cartController.addToCart);
router.get('/', authMiddleware, cartController.getCart);
router.put('/:id', authMiddleware, cartController.updateCartItem);
router.delete('/:id', authMiddleware, cartController.removeCartItem);
router.delete('/', authMiddleware, cartController.clearCart);

module.exports = router;
