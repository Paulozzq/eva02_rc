const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Medicamento = require('../models/Medicamento'); // Asegúrate de que el modelo esté correcto
const TipoMed = require('../models/TipoMedic'); // Modelo de TipoMed
const Especialidad = require('../models/Especialidad'); // Modelo de Especialidad

// Obtener todos los medicamentos
router.get('/', verifyToken, async (req, res) => {
  try {
    const medicamentos = await Medicamento.findAll();
    res.render('medicamentos/index', { medicamentos });
  } catch (err) {
    res.status(500).send('Error al obtener los medicamentos');
  }
});

// Mostrar formulario de creación
router.get('/new', verifyToken, async (req, res) => {
  try {
    // Obtener los tipos de medicamentos y especialidades
    const tiposMedicamentos = await TipoMed.findAll(); 
    const especialidades = await Especialidad.findAll();
    
    // Renderizar el formulario con los tipos y especialidades disponibles
    res.render('medicamentos/new', { tiposMedicamentos, especialidades });
  } catch (err) {
    res.status(500).send('Error al cargar los datos para el formulario');
  }
});

// Crear un nuevo medicamento
router.post('/', verifyToken, async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, fechaVencimiento, CodTipoMed, CodEspec } = req.body;
    await Medicamento.create({
      nombre,
      descripcion,
      precio,
      stock,
      fechaVencimiento,
      CodTipoMed, // Guardar el tipo de medicamento seleccionado
      CodEspec, // Guardar la especialidad seleccionada
    });
    res.redirect('/medicamentos');
  } catch (err) {
    res.status(400).send('Error al crear el medicamento');
  }
});

// Mostrar formulario de edición
router.get('/:id/edit', verifyToken, async (req, res) => {
  try {
    const medicamento = await Medicamento.findByPk(req.params.id);
    const tiposMedicamentos = await TipoMed.findAll(); 
    const especialidades = await Especialidad.findAll();
    
    if (!medicamento) return res.status(404).send('Medicamento no encontrado');
    res.render('medicamentos/edit', { medicamento, tiposMedicamentos, especialidades });
  } catch (err) {
    res.status(500).send('Error al cargar el formulario');
  }
});

// Actualizar un medicamento
router.post('/:id', verifyToken, async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, fechaVencimiento, CodTipoMed, CodEspec } = req.body;
    const [updated] = await Medicamento.update(
      { nombre, descripcion, precio, stock, fechaVencimiento, CodTipoMed, CodEspec },
      { where: { id: req.params.id } }
    );

    if (updated) {
      res.redirect('/medicamentos');
    } else {
      res.status(404).send('Medicamento no encontrado');
    }
  } catch (err) {
    res.status(400).send('Error al actualizar el medicamento');
  }
});

// Eliminar un medicamento
router.post('/:id/delete', verifyToken, async (req, res) => { // Cambié DELETE a POST, ya que los formularios no soportan DELETE de forma nativa
  try {
    const deleted = await Medicamento.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.redirect('/medicamentos');
    } else {
      res.status(404).send('Medicamento no encontrado');
    }
  } catch (err) {
    res.status(500).send('Error al eliminar el medicamento');
  }
});

module.exports = router;
