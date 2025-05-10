const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Medicamento = require('../models/Medicamento'); // Modelo Medicamento
const TipoMedic = require('../models/TipoMedic'); // Modelo TipoMedic (para la lista de tipos)
const Especialidad = require('../models/Especialidad'); // Modelo Especialidad (para la lista de especialidades)

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
    const tiposMedic = await TipoMedic.findAll(); // Obtener los tipos de medicamentos
    const especialidades = await Especialidad.findAll(); // Obtener las especialidades
    res.render('medicamentos/new', { tiposMedic, especialidades });
  } catch (err) {
    res.status(500).send('Error al cargar los tipos de medicamento y especialidades');
  }
});

// Crear un nuevo medicamento
router.post('/', verifyToken, async (req, res) => {
  try {
    const { descripcionMed, fechaFabricacion, fechaVencimiento, Presentacion, stock, precioVentaUni, precioVentaPres, Marca, CodTipoMed, CodEspec } = req.body;
    await Medicamento.create({
      descripcionMed,
      fechaFabricacion,
      fechaVencimiento,
      Presentacion,
      stock,
      precioVentaUni,
      precioVentaPres,
      Marca,
      CodTipoMed,  // Asociación con TipoMedic
      CodEspec     // Asociación con Especialidad
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
    if (!medicamento) return res.status(404).send('Medicamento no encontrado');

    const tiposMedic = await TipoMedic.findAll(); // Obtener los tipos de medicamentos
    const especialidades = await Especialidad.findAll(); // Obtener las especialidades
    res.render('medicamentos/edit', { medicamento, tiposMedic, especialidades });
  } catch (err) {
    res.status(500).send('Error al cargar el formulario');
  }
});

// Actualizar un medicamento
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { descripcionMed, fechaFabricacion, fechaVencimiento, Presentacion, stock, precioVentaUni, precioVentaPres, Marca, CodTipoMed, CodEspec } = req.body;
    const [updated] = await Medicamento.update(
      { descripcionMed, fechaFabricacion, fechaVencimiento, Presentacion, stock, precioVentaUni, precioVentaPres, Marca, CodTipoMed, CodEspec },
      { where: { CodMedicamento: req.params.id } }
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
router.post('/:id/delete', verifyToken, async (req, res) => {
  try {
    const deleted = await Medicamento.destroy({ where: { CodMedicamento: req.params.id } });
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
