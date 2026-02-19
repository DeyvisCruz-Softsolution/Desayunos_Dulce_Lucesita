const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pendiente',
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Product, { foreignKey: 'productId' });
    Order.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Order;
};
