const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware'); // Asegúrate de exportar bien en el middleware

// Ruta protegida para la página de inicio (dashboard)
router.get('/', verifyToken, (req, res) => {
  try {
    const user = req.user; // Usuario decodificado del JWT
    console.log('Usuario autenticado:', user);
    res.render('home', { user }); // Renderiza la vista "home" con el usuario
  } catch (error) {
    console.error('Error al acceder a la página de inicio:', error);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
