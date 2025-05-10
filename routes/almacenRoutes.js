const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Ruta principal del módulo Almacén
router.get('/', verifyToken, (req, res) => {
  res.render('almacen/index');
});

module.exports = router;
