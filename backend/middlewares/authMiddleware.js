const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Importa el modelo de usuario

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token requerido' });

    // Decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario en la base de datos
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    req.user = user; // Almacenar el usuario completo en `req.user`
    next();
  } catch (error) {
    console.error('❌ Error en autenticación:', error);
    res.status(403).json({ error: 'Token inválido' });
  }
};
