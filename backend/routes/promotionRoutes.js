const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');
const upload = require('../config/multer'); // Para manejar archivos

// ✅ Ruta para obtener la promoción activa
router.get('/active', promotionController.getActivePromotion);

// ✅ Rutas de gestión de promociones
router.get('/', promotionController.getAllPromotions);
router.post('/', upload.single('file'), promotionController.createPromotion);
router.put('/:id', upload.single('file'), promotionController.updatePromotion);
router.delete('/:id', promotionController.deletePromotion);
router.put('/:id/toggle', promotionController.togglePromotionActive);

module.exports = router;
