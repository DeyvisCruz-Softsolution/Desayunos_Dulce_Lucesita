const { Order, CartItem, Product } = require('../models');

// ===============================
// Crear orden desde el carrito
// ===============================
exports.createOrderFromCart = async (req, res) => {
  console.log("🔥 createOrderFromCart EJECUTADO");

  const { descripcion } = req.body;

  if (!descripcion) {
    return res.status(400).json({ error: 'Falta el campo descripcion' });
  }

  try {
    const userId = req.user.id;

    // Traer productos del carrito
    const cartItems = await CartItem.findAll({
      where: { userId },
      include: [Product],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío.' });
    }

    let totalOrder = 0;

    for (const item of cartItems) {
      const product = item.Product;
      const quantity = item.quantity;

      // Validar stock
      if (product.stock < quantity) {
        return res.status(400).json({
          error: `Stock insuficiente para ${product.title}`
        });
      }

      const subtotal = product.price * quantity;
      totalOrder += subtotal;

      // Descontar stock
      await product.update({
        stock: product.stock - quantity
      });

      // Crear registro de orden
      await Order.create({
        userId,
        productId: product.id,
        quantity,
        total: subtotal,
        descripcion
      });
    }

    // Vaciar carrito
    await CartItem.destroy({
      where: { userId }
    });

    console.log("✅ Pedido creado correctamente");

    return res.status(201).json({
      message: 'Pedido creado correctamente',
      total: totalOrder
    });

  } catch (error) {
    console.error('❌ Error al crear pedido:', error);
    return res.status(500).json({
      error: 'Error al crear pedido desde el carrito.'
    });
  }
};


// ===============================
// Obtener órdenes del usuario
// ===============================
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [Product],
      order: [['createdAt', 'DESC']]
    });

    return res.json(orders);

  } catch (error) {
    console.error('❌ Error al obtener órdenes:', error);
    return res.status(500).json({
      error: 'Error al obtener órdenes'
    });
  }
};


// ===============================
// Obtener todas las órdenes (ADMIN)
// ===============================
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Product],
      order: [['createdAt', 'DESC']]
    });

    return res.json(orders);

  } catch (error) {
    console.error('❌ Error al obtener todas las órdenes:', error);
    return res.status(500).json({
      error: 'Error al obtener órdenes'
    });
  }
};