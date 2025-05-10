const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const DetalleOrdenVta = sequelize.define('DetalleOrdenVta', {
  NroOrdenVta: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  descripcionMed: DataTypes.STRING,
  cantidadRequerida: DataTypes.INTEGER
}, {
  tableName: 'DetalleOrdenVta',
  timestamps: false
});

sequelize.sync()
  .then(() => {
    console.log('Tabla DetalleOrdenVta sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla DetalleOrdenVta:', error);
  });

module.exports = DetalleOrdenVta;
