module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active' // active | completed | abandoned
    }
  }, {
    tableName: 'carts',
    timestamps: true
  });

  return Cart;
};