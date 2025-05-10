const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const OrdenCompra = sequelize.define('OrdenCompra', {
  NroOrdenC: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaEmision: DataTypes.DATE,
  Situacion: DataTypes.STRING,
  Total: DataTypes.FLOAT,
  NroFacturaProv: DataTypes.STRING
}, {
  tableName: 'OrdenCompra',
  timestamps: false
});

OrdenCompra.associate = (models) => {
  OrdenCompra.belongsTo(models.Laboratorio, {
    foreignKey: 'CodLab'
  });

  OrdenCompra.hasMany(models.DetalleOrdenCompra, {
    foreignKey: 'NroOrdenC'
  });
};

sequelize.sync()
  .then(() => {
    console.log('Tabla OrdenCompra sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla OrdenCompra:', error);
  });

module.exports = OrdenCompra;
