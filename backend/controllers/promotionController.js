const { Promotion } = require('../models');
const cloudinary = require('../config/cloudinary');

// Subir archivo a Cloudinary
const uploadToCloudinary = (fileBuffer, mimetype) => {
  return new Promise((resolve, reject) => {
    const resourceType = mimetype.startsWith('video') ? 'video' : 'image';
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'dulce-lucesita/promociones',
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) {
          console.error('❌ Error al subir a Cloudinary:', error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

exports.getActivePromotion = async (req, res) => {
  try {
    const promotion = await Promotion.findOne({ where: { isActive: true } });
    if (!promotion) return res.status(404).json({ message: 'No hay promociones activas.' });
    res.json(promotion);
  } catch (error) {
    console.error('❌ Error al obtener promoción activa:', error);
    res.status(500).json({ error: 'Error al obtener promoción activa.' });
  }
};

exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener promociones' });
  }
};

exports.createPromotion = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl || null;

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    }

    const { title, message, isActive } = req.body;
    const promotion = await Promotion.create({ title, message, imageUrl, isActive });
    res.status(201).json(promotion);
  } catch (err) {
    console.error('❌ Error al crear promoción:', err);
    res.status(500).json({ error: 'Error al crear promoción' });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findByPk(id);
    if (!promotion) return res.status(404).json({ error: 'No encontrada' });

    let imageUrl = req.body.imageUrl || promotion.imageUrl;

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    }

    await promotion.update({ ...req.body, imageUrl });
    res.json(promotion);
  } catch (err) {
    console.error('❌ Error al actualizar promoción:', err);
    res.status(500).json({ error: 'Error al actualizar promoción' });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findByPk(id);
    if (!promotion) return res.status(404).json({ error: 'No encontrada' });

    await promotion.destroy();
    res.json({ message: 'Promoción eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar promoción' });
  }
};
exports.togglePromotionActive = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const promotion = await Promotion.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }

    await promotion.update({ isActive });
    res.json({ message: 'Estado de promoción actualizado', promotion });
  } catch (error) {
    console.error('❌ Error al cambiar estado de promoción:', error);
    res.status(500).json({ error: 'Error al cambiar estado' });
  }
};
