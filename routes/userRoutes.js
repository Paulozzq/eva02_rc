const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Usuario = require('../models/Usuario'); // Asegúrate de que el modelo esté correcto

// Obtener todos los usuarios
router.get('/', verifyToken, async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.render('users/index', { usuarios });
  } catch (err) {
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Mostrar formulario de creación
router.get('/new', verifyToken, (req, res) => {
  console.log('Accediendo a la ruta de creación de usuario');
  res.render('users/new');
});

// Crear un nuevo usuario
router.post('/', verifyToken, async (req, res) => {
  try {
    const { nombre, email, password, role } = req.body;
    await Usuario.create({ nombre, email, password, role });
    res.redirect('/users');
  } catch (err) {
    res.status(400).send('Error al crear el usuario');
  }
});

// Mostrar formulario de edición
router.get('/:id/edit', verifyToken, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    console.log('Usuario encontrado:', usuario);
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    res.render('users/edit', { usuario });
  } catch (err) {
    res.status(500).send('Error al cargar el formulario');
  }
});

// Actualizar un usuario
router.post('/:id', verifyToken, async (req, res) => {
  try {
    const { nombre, email, rol } = req.body;
    console.log('Datos recibidos para actualizar:', req.body);
    await Usuario.update({ nombre, email, rol }, { where: { CodUsuario: req.params.id } });
    
    res.redirect('/users');
  } catch (err) {
    res.status(400).send('Error al actualizar el usuario');
  }
});

// Eliminar un usuario
router.post('/:id/delete', verifyToken, async (req, res) => {
  try {
    await Usuario.destroy({ where: {  CodUsuario: req.params.id } });
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Error al eliminar el usuario');
  }
});

module.exports = router;
