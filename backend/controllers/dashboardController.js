const { Order, Product, User } = require('../models');
const { Sequelize, Op } = require('sequelize');

exports.getDashboardStats = async (req, res) => {
  try {
    const { period = 'month', startDate, endDate } = req.query;

    const where = {
      status: ['Completado', 'vendido']
    };

    // Filtro por fechas manual
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    let groupFormat;

    switch (period) {
      case 'day':
        groupFormat = 'YYYY-MM-DD';
        break;
      case 'week':
        groupFormat = 'IYYY-IW'; // ISO week
        break;
      case 'month':
        groupFormat = 'YYYY-MM';
        break;
      case '6months':
      default:
        groupFormat = 'YYYY-MM';
        where.createdAt = {
          [Op.gte]: Sequelize.literal("NOW() - INTERVAL '6 months'")
        };
        break;
    }

    // 💰 Total ingresos
    const totalIncomeResult = await Order.findAll({
      where,
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('total')), 'totalIncome']
      ]
    });

    const totalIncome = parseFloat(
      totalIncomeResult[0]?.dataValues?.totalIncome || 0
    );

    // 📊 Estados de pedidos
    const statusCounts = await Order.findAll({
      attributes: [
        'status',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['status']
    });

    // 🏆 Productos más vendidos
    const topProducts = await Order.findAll({
      attributes: [
        'productId',
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalSold']
      ],
      include: [
        {
          model: Product,
          attributes: ['title', 'imageUrl']
        }
      ],
      group: ['productId', 'Product.id'],
      order: [[Sequelize.literal('totalSold'), 'DESC']],
      limit: 5
    });

    // 👤 Clientes más activos
    const topClients = await Order.findAll({
      attributes: [
        'userId',
        [Sequelize.fn('COUNT', Sequelize.col('Order.id')), 'ordersCount']
      ],
      include: [
        {
          model: User,
          attributes: ['name', 'email']
        }
      ],
      group: ['userId', 'User.id'],
      order: [[Sequelize.literal('ordersCount'), 'DESC']],
      limit: 5
    });

    // 📈 Ventas por periodo (CORREGIDO PARA POSTGRESQL)
    const salesByPeriod = await Order.findAll({
      where,
      attributes: [
        [
          Sequelize.fn(
            'TO_CHAR',
            Sequelize.col('createdAt'),
            groupFormat
          ),
          'period'
        ],
        [Sequelize.fn('SUM', Sequelize.col('total')), 'totalSales']
      ],
      group: ['period'],
      order: [[Sequelize.literal('period'), 'DESC']]
    });

    res.json({
      totalIncome,
      statusCounts,
      topProducts,
      topClients,
      salesByPeriod
    });

  } catch (error) {
    console.error('Error dashboard:', error);
    res.status(500).json({
      message: 'Error al obtener datos del dashboard',
      error: error.message // 🔥 esto te ayuda a depurar en producción
    });
  }
};