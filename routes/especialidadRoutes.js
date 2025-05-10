const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Especialidad = require('../models/Especialidad');

// Mostrar todas las especialidades
router.get('/', verifyToken, async (req, res) => {
  try {
    const especialidades = await Especialidad.findAll();
    res.render('especialidad/index', { especialidades });
  } catch (error) {
    res.status(500).send('Error al obtener especialidades');
  }
});

// Mostrar formulario para nueva especialidad
router.get('/new', verifyToken, (req, res) => {
  res.render('especialidad/new');
});

// Crear especialidad
router.post('/', verifyToken, async (req, res) => {
  try {
    const { descripcionEsp } = req.body;
    await Especialidad.create({ descripcionEsp });
    res.redirect('/especialidades');
  } catch (error) {
    res.status(400).send('Error al crear especialidad');
  }
});

// Mostrar formulario para editar
router.get('/:id/edit', verifyToken, async (req, res) => {
  try {
    const especialidad = await Especialidad.findByPk(req.params.id);
    if (!especialidad) return res.status(404).send('Especialidad no encontrada');
    res.render('especialidad/edit', { especialidad });
  } catch (error) {
    res.status(500).send('Error al cargar la especialidad');
  }
});

// Actualizar especialidad
router.post('/:id', verifyToken, async (req, res) => {
  try {
    const { descripcionEsp } = req.body;
    await Especialidad.update({ descripcionEsp }, { where: { CodEspec: req.params.id } });
    res.redirect('/especialidades');
  } catch (error) {
    res.status(400).send('Error al actualizar especialidad');
  }
});

// Eliminar especialidad
router.post('/:id/delete', verifyToken, async (req, res) => {
  try {
    await Especialidad.destroy({ where: { CodEspec: req.params.id } });
    res.redirect('/especialidades');
  } catch (error) {
    res.status(500).send('Error al eliminar especialidad');
  }
});

module.exports = router;
