const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const OrdenVenta = sequelize.define('OrdenVenta', {
  NroOrdenVta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaEmision: DataTypes.DATE,
  Motivo: DataTypes.STRING,
  Situacion: DataTypes.STRING
}, {
  tableName: 'OrdenVenta',
  timestamps: false
});

OrdenVenta.associate = (models) => {
  OrdenVenta.hasMany(models.DetalleOrdenVta, {
    foreignKey: 'NroOrdenVta'
  });
};

sequelize.sync()
  .then(() => {
    console.log('Tabla OrdenVenta sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla OrdenVenta:', error);
  });

module.exports = OrdenVenta;
