const { Order, Product, User } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardV2 = async (req, res) => {
  try {

    // 📅 Fecha actual y hace 30 días
    const now = new Date();
    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

    // 📦 TODOS los pedidos últimos 30 días
    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: last30Days
        }
      },
      include: [
        { model: Product },
        { model: User }
      ]
    });

    // 💰 TOTAL INGRESOS
    const totalIncome = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    // 📦 PEDIDOS HOY
    const todayOrders = orders.filter(o => {
      const d = new Date(o.createdAt);
      return d.toDateString() === now.toDateString();
    });

    // ⏳ PEDIDOS PENDIENTES
    const pendingOrders = orders.filter(o => o.status === 'pendiente');

    // 🧾 TICKET PROMEDIO
    const avgTicket = orders.length ? totalIncome / orders.length : 0;

    // 👤 CLIENTES ÚNICOS
    const uniqueUsers = new Set(orders.map(o => o.userId)).size;

    // 🏆 PRODUCTOS TOP
    const productMap = {};

    orders.forEach(o => {
      if (!productMap[o.productId]) {
        productMap[o.productId] = {
          title: o.Product?.title,
          totalSold: 0,
          totalRevenue: 0
        };
      }

      productMap[o.productId].totalSold += o.quantity;
      productMap[o.productId].totalRevenue += o.total || 0;
    });

    const topProducts = Object.values(productMap)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);

    // 📈 VENTAS POR DÍA (últimos 7 días)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);

      const dayStr = d.toISOString().slice(0, 10);

      const dayOrders = orders.filter(o =>
        new Date(o.createdAt).toISOString().slice(0, 10) === dayStr
      );

      const total = dayOrders.reduce((sum, o) => sum + (o.total || 0), 0);

      last7Days.push({
        date: dayStr,
        total
      });
    }

    res.json({
      kpis: {
        totalIncome,
        todayOrders: todayOrders.length,
        pendingOrders: pendingOrders.length,
        avgTicket,
        customers: uniqueUsers
      },
      topProducts,
      salesLast7Days: last7Days
    });

  } catch (error) {
    console.error('Dashboard V2 error:', error);
    res.status(500).json({
      message: 'Error en dashboard V2',
      error: error.message
    });
  }
};