const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Solo admin puede ver todos los usuarios
router.get('/', authMiddleware, roleMiddleware(['admin']), userController.getAllUsers);

// Usuario autenticado puede ver y editar su perfil
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

module.exports = router;
