const express = require('express');
const router = express.Router();

// Ruta principal de compras que muestra el menú
router.get('/', (req, res) => {
  res.render('compras/index'); // Renderiza la vista con el menú
});

module.exports = router;
