module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define('Promotion', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  });

  return Promotion;
};
