const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Promotion = require('./Promotion')(sequelize, DataTypes);

// Importar modelos
const User = require('./user')(sequelize, DataTypes);
const Product = require('./product')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const CartItem = require('./cartItem')(sequelize, DataTypes); // Nuevo modelo

// Relaciones existentes
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Order, { foreignKey: 'productId', onDelete: 'CASCADE' });
Order.belongsTo(Product, { foreignKey: 'productId' });

// ✅ Nuevas relaciones para carrito
User.hasMany(CartItem, { foreignKey: 'userId', onDelete: 'CASCADE' });
CartItem.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(CartItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

const initModels = async () => {
  await sequelize.sync({ alter: false });
 // usar { force: true } solo en desarrollo si necesitas resetear
  console.log('🧩 Modelos sincronizados con la base de datos');
};

module.exports = {
  sequelize,
  initModels,
  User,
  Product,
  Order,
  CartItem, // Exportar nuevo modelo
  Promotion // Exportar modelo de promoción
};
