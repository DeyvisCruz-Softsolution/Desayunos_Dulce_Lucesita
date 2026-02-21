const { Order, CartItem, Product, User } = require('../models');
const nodemailer = require('nodemailer');

// Crear orden desde un solo producto (modo directo)
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

// Crear orden desde el carrito
exports.createOrderFromCart = async (req, res) => {
  const { descripcion } = req.body;
  if (!descripcion) {
    return res.status(400).json({ error: 'Falta el campo descripcion' });
  }

  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user || !user.email) {
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
    const orderDetails = [];

    for (const item of cartItems) {
      const product = item.Product;
      const quantity = item.quantity;

      if (product.stock < quantity) {
        return res.status(400).json({ error: `Stock insuficiente para ${product.title}` });
      }

      const subtotal = product.price * quantity;
      totalOrder += subtotal;

      await product.update({ stock: product.stock - quantity });

      const order = await Order.create({
        userId,
        productId: product.id,
        quantity,
        total: subtotal,
      });

    orderDetails.push({
     title: product.title,
     quantity,
     price: product.price,
     subtotal,
     imageUrl: product.imageUrl, // ✅ aseguramos que esté disponible para el correo
     description: product.description // ✅ nuevo
  });
    }

    // Vaciar el carrito
    await CartItem.destroy({ where: { userId } });

    // Enviar correo de confirmación
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

const orderSummaryHTML = orderDetails
  .map((item) => `
    <li style="margin-bottom: 20px; list-style: none; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
      <img src="${item.imageUrl}" alt="${item.title}" width="100" style="border-radius: 8px; margin-bottom: 8px;" />
      <p><strong>Producto:</strong> ${item.title}</p>
      <p><strong>Contenido del artículo:</strong> ${item.description || 'Sin descripción disponible'}</p>
      <p><strong>Cantidad:</strong> ${item.quantity}</p>
      <p><strong>Precio unitario:</strong> $${item.price.toFixed(2)}</p>
      <p><strong>Subtotal:</strong> $${item.subtotal.toFixed(2)}</p>
    </li>
  `)
  .join('');


    const htmlContent = `
      <p style="font-size: 16px; color: #c2185b; font-weight: bold;">
    🎀 ¡Gracias por confiar en nosotros! Para coordinar el domicilio y los últimos detalles de tu pedido,
    puedes escribirnos directamente por 
    <a href="https://wa.me/573182794944" style="color: #1976d2;" target="_blank">WhatsApp</a>
    o llamarnos al <strong>318 279 4944</strong>. 💬
  </p>
  <hr style="margin: 20px 0;" />
      <h3>📝 Datos del cliente</h3>
      <ul>
        <li><strong>Nombre completo:</strong> ${user.name}</li>
        <li><strong>Teléfono o celular:</strong> ${user.phone}</li>
        <li><strong>Dirección:</strong> ${user.address}</li>
        <li><strong>Ciudad:</strong> ${user.city}</li>
        <li><strong>Dirección, hora y mensaje:</strong> ${descripcion}</li>
      </ul>
      <h3>🛒 Detalles del pedido</h3>
      <ul>${orderSummaryHTML}</ul>
      <p><strong>Total del pedido:</strong> $${totalOrder}</p>
    `;

    const mailOptionsToAdmin = {
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL,
      subject: '📦 Nuevo pedido - Dulce Lucecita',
      html: htmlContent,
    };

    const mailOptionsToClient = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: '✅ Confirmación de tu pedido - Dulce Lucecita',
      html: htmlContent,
    };

try {
  await transporter.sendMail(mailOptionsToAdmin);
  await transporter.sendMail(mailOptionsToClient);
  console.log("✅ Correos enviados correctamente");
} catch (mailError) {
  console.error("❌ Error enviando correos COMPLETO:", mailError);
}

    res.status(201).json({ message: 'Pedido creado y correos enviados.' });
  } catch (error) {
    console.error('❌ Error al crear pedido desde carrito:', error);
    res.status(500).json({ error: 'Error al crear pedido desde el carrito.' });
  }
};

// Obtener pedidos del usuario
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

// Obtener todas las órdenes (admin)
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

// Actualizar status de la orden
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });

    order.status = status;
    await order.save();

    return res.status(200).json({ message: '✅ Estado actualizado correctamente', order });
  } catch (error) {
    console.error('❌ Error al actualizar estado:', error);
    return res.status(500).json({ error: '❌ Error al actualizar estado' });
  }
};
