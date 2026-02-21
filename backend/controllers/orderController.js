const { Order, CartItem, Product, User } = require('../models');

// ===============================
// Crear orden desde producto directo
// ===============================
exports.createOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'Faltan campos requeridos: productId o quantity' });
  }

  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const total = product.price * quantity;

    const order = await Order.create({
      userId: req.user.id,
      productId,
      quantity,
      total,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('❌ Error al crear pedido directo:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

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

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: 'Perfil de usuario incompleto.' });
    }

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

      if (product.stock < quantity) {
        return res.status(400).json({
          error: `Stock insuficiente para ${product.title}`
        });
      }

      const subtotal = product.price * quantity;
      totalOrder += subtotal;

      await product.update({
        stock: product.stock - quantity
      });

      await Order.create({
        userId,
        productId: product.id,
        quantity,
        total: subtotal,
      });
    }

    // Vaciar carrito
    await CartItem.destroy({ where: { userId } });

    console.log("✅ Pedido creado correctamente (sin correo)");

    res.status(201).json({
      message: 'Pedido creado correctamente.',
      total: totalOrder
    });

  } catch (error) {
    console.error('❌ Error al crear pedido desde carrito:', error);
    res.status(500).json({ error: 'Error al crear pedido desde el carrito.' });
  }
};

// ===============================
// Obtener pedidos del usuario
// ===============================
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [Product],
      order: [['createdAt', 'DESC']],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tus pedidos' });
  }
};

// ===============================
// Obtener todas las órdenes (admin)
// ===============================
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [Product, User],
      order: [['createdAt', 'DESC']],
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todas las órdenes' });
  }
};

// ===============================
// Actualizar status de la orden
// ===============================
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: '✅ Estado actualizado correctamente',
      order
    });

  } catch (error) {
    console.error('❌ Error al actualizar estado:', error);
    return res.status(500).json({ error: '❌ Error al actualizar estado' });
  }
};