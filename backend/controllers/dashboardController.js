const { Order, Product, User } = require('../models');
const { Sequelize, Op } = require('sequelize');

exports.getDashboardStats = async (req, res) => {
  try {
    const { period = 'month', startDate, endDate } = req.query;

    const where = {
      status: ['Completado', 'vendido']
    };

    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    let groupFormat;
    switch (period) {
      case 'day': groupFormat = '%Y-%m-%d'; break;
      case 'week': groupFormat = '%Y-%u'; break;
      case 'month': groupFormat = '%Y-%m'; break;
      case '6months':
      default:
        groupFormat = '%Y-%m';
        where.createdAt = {
          [Op.gte]: Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 6 MONTH)")
        };
        break;
    }

    const totalIncomeResult = await Order.findAll({
      where,
      attributes: [[Sequelize.fn('SUM', Sequelize.col('total')), 'totalIncome']]
    });

    const totalIncome = parseFloat(totalIncomeResult[0].dataValues.totalIncome || 0);

    const statusCounts = await Order.findAll({
      attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
      group: ['status']
    });

    const topProducts = await Order.findAll({
      attributes: ['productId', [Sequelize.fn('SUM', Sequelize.col('quantity')), 'totalSold']],
      include: [{ model: Product, attributes: ['title', 'imageUrl'] }],
      group: ['productId', 'Product.id'],
      order: [[Sequelize.literal('totalSold'), 'DESC']],
      limit: 5
    });

    const topClients = await Order.findAll({
      attributes: ['userId', [Sequelize.fn('COUNT', Sequelize.col('Order.id')), 'ordersCount']],
      include: [{ model: User, attributes: ['name', 'email'] }],
      group: ['userId', 'User.id'],
      order: [[Sequelize.literal('ordersCount'), 'DESC']],
      limit: 5
    });

    const salesByPeriod = await Order.findAll({
      where,
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), groupFormat), 'period'],
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
    res.status(500).json({ message: 'Error al obtener datos del dashboard' });
  }
};
