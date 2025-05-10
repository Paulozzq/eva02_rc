const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const DetalleOrdenCompra = sequelize.define('DetalleOrdenCompra', {
  NroOrdenC: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  descripcion: DataTypes.STRING,
  cantidad: DataTypes.INTEGER,
  precio: DataTypes.FLOAT,
  montouni: DataTypes.FLOAT
}, {
  tableName: 'DetalleOrdenCompra',
  timestamps: false
});

sequelize.sync()
  .then(() => {
    console.log('Tabla DetalleOrdenCompra sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla DetalleOrdenCompra:', error);
  });

module.exports = DetalleOrdenCompra;
