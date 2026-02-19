const { CartItem, Product } = require('../models');

// Agregar producto al carrito
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const [item, created] = await CartItem.findOrCreate({
      where: { userId, productId },
      defaults: { quantity }
    });

    if (!created) {
      item.quantity += quantity;
      await item.save();
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar al carrito.' });
  }
};

// Obtener productos del carrito
exports.getCart = async (req, res) => {
  try {
    const items = await CartItem.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product }]
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito.' });
  }
};

// Actualizar cantidad
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!item) return res.status(404).json({ error: 'Producto no encontrado' });

    item.quantity = quantity;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito.' });
  }
};

// Eliminar producto
exports.removeCartItem = async (req, res) => {
  try {
    await CartItem.destroy({
      where: { id: req.params.id, userId: req.user.id }
    });
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
  }
};

// Vaciar carrito
exports.clearCart = async (req, res) => {
  try {
    await CartItem.destroy({
      where: { userId: req.user.id }
    });
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al vaciar el carrito.' });
  }
};
