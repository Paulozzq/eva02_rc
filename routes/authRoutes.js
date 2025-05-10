const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Usuario = require('../models/Usuario');

const JWT_SECRET = process.env.JWT_SECRET;

// Página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Página de registro
router.get('/register', (req, res) => {
  res.render('register');
});

// Registro de usuario
router.post('/register', async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  try {
    const user = await Usuario.create({ nombre, email, password, rol });
    const token = jwt.sign({ id: user.CodUsuario, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error al registrar usuario');
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token'); // Elimina el token de la cookie
  res.redirect('/login'); // Redirige al login
});
// Inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (user && user.password === password) {
      const token = jwt.sign({ id: user.CodUsuario, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.redirect('/home');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (err) {
    res.status(400).send('Error al iniciar sesión');
  }
});

module.exports = router;
