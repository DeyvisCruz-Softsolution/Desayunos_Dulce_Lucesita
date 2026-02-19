const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multer');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Público
router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getByCategory);


// Solo admin
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  upload.single('image'),
  productController.createProduct
);
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  upload.single('image'),
  productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);



module.exports = router;
