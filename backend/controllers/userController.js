const { User } = require('../models');

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
};
// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  const user = req.user;
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    role: user.role,
  });
};

// Actualizar perfil del usuario autenticado
exports.updateProfile = async (req, res) => {
  const { name, phone, address, city } = req.body;
  const user = req.user;

  try {
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.city = city || user.city;

    await user.save();

    res.json({ message: 'Perfil actualizado correctamente', user });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
};
