const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); // asegúrate de importar tu modelo

// Middleware para verificar el token JWT y cargar el usuario
async function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
      return res.redirect('/login');
    }

    // Asignar el usuario completo a la request
    req.user = usuario;

    next();
  } catch (err) {
    console.error('Error al verificar el token:', err.message);
    res.redirect('/login');
  }
}

module.exports = verifyToken;
