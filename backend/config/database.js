const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:\n', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
