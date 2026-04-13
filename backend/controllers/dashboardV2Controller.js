const { Order, Product, User } = require('../models');
const { Op } = require('sequelize');

exports.getDashboardV2 = async (req, res) => {
  try {

    // 📅 Fechas
    const now = new Date();

    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

    const last60Days = new Date();
    last60Days.setDate(now.getDate() - 60);

    // 📦 Pedidos últimos 30 días
    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: last30Days
        }
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'title', 'imageUrl']
        },
        {
          model: User,
          attributes: ['id', 'name', 'email'],
          required: false // 🔥 IMPORTANTE (evita que falle si no hay relación)
        }
      ]
    });

    // 📦 Pedidos 30 días anteriores
    const previousOrders = await Order.findAll({
      where: {
        createdAt: {
          [Op.between]: [last60Days, last30Days]
        }
      }
    });

    // 💰 TOTAL INGRESOS
    const totalIncome = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const previousIncome = previousOrders.reduce((sum, o) => sum + (o.total || 0), 0);

    // 📈 CRECIMIENTO
    let growth = 0;
    if (previousIncome > 0) {
      growth = ((totalIncome - previousIncome) / previousIncome) * 100;
    }

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
          title: o.Product?.title || 'Producto',
          imageUrl: o.Product?.imageUrl || null,
          totalSold: 0,
          totalRevenue: 0
        };
      }

      productMap[o.productId].totalSold += o.quantity || 0;
      productMap[o.productId].totalRevenue += o.total || 0;
    });

    const topProducts = Object.values(productMap)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);

    // 👤 TOP CLIENTES (🔥 CORREGIDO REAL)
    const clientMap = {};

    orders.forEach(o => {
      const userName =
        o.User?.name ||
        `Cliente #${o.userId}`; // 🔥 fallback si no trae relación

      if (!clientMap[o.userId]) {
        clientMap[o.userId] = {
          name: userName,
          totalOrders: 0,
          totalSpent: 0
        };
      }

      clientMap[o.userId].totalOrders += 1;
      clientMap[o.userId].totalSpent += o.total || 0;
    });

    const topClients = Object.values(clientMap)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    // 📈 VENTAS ÚLTIMOS 7 DÍAS
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

    // 🧠 INSIGHTS
    let insights = [];

    if (topProducts.length > 0) {
      insights.push(`🔥 Producto estrella: ${topProducts[0].title}`);
    }

    if (pendingOrders.length > 0) {
      insights.push(`⚠️ ${pendingOrders.length} pedidos pendientes`);
    }

    if (avgTicket > 0) {
      insights.push(`💰 Ticket promedio: $${avgTicket.toFixed(0)}`);
    }

    if (todayOrders.length > 5) {
      insights.push(`🚀 Alta demanda hoy: ${todayOrders.length} pedidos`);
    }

    if (growth > 0) {
      insights.push(`📈 Crecimiento positivo: +${growth.toFixed(1)}%`);
    } else if (growth < 0) {
      insights.push(`📉 Caída en ventas: ${growth.toFixed(1)}%`);
    }

    if (topClients.length > 0) {
      insights.push(`👤 Mejor cliente: ${topClients[0].name}`);
    }

    // 🚀 RESPUESTA FINAL
    res.json({
      kpis: {
        totalIncome,
        todayOrders: todayOrders.length,
        pendingOrders: pendingOrders.length,
        avgTicket,
        customers: uniqueUsers,
        growth
      },
      topProducts,
      topClients,
      salesLast7Days: last7Days,
      insights
    });

  } catch (error) {
    console.error('Dashboard V2 error:', error);

    res.status(500).json({
      message: 'Error en dashboard V2',
      error: error.message
    });
  }
};