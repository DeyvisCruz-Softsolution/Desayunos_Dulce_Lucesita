const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const { initModels } = require('./models');
const orderRoutes = require('./routes/orderRoutes'); // ✅ Importa solo las rutas
const contactRoutes = require('./routes/contactRoutes'); // ✅ Importa las rutas de contacto
const cartRoutes = require('./routes/cartRoutes'); // ✅ Importa las rutas de carrito
const promotionRoutes = require('./routes/promotionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

dotenv.config();

const app = express();

// Middleware base
app.use(cors({
  origin: [
    "http://localhost:3000", // para desarrollo local
    "https://desayunos-dulce-lucesita.vercel.app",
    "https://dulce-lucesita-admin.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Conexión base de datos y modelos
connectDB()
  .then(() => {
    initModels();
    })
  .then(() => {
    console.log("📦 Tablas sincronizadas correctamente");
  })
  .catch((error) => {
    console.error("❌ Error inicializando la app:", error);
  });


// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/contact', require('./routes/contactRoutes')); // ✅ Usa las rutas de contacto
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/promotions', require('./routes/promotionRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes')); // ✅ Usa las rutas de dashboard (dashboardRoutes);
app.get('/', (req, res) => res.send('🚀 API de Dulce Lucesita lista'));

module.exports = app;
