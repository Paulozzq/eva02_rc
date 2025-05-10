const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionMed: DataTypes.STRING,
  fechaFabricacion: DataTypes.DATE,
  fechaVencimiento: DataTypes.DATE,
  Presentacion: DataTypes.STRING,
  stock: DataTypes.INTEGER,
  precioVentaUni: DataTypes.FLOAT,
  precioVentaPres: DataTypes.FLOAT,
  Marca: DataTypes.STRING
}, {
  tableName: 'Medicamento',
  timestamps: false
});

Medicamento.associate = (models) => {
  Medicamento.belongsTo(models.TipoMedic, {
    foreignKey: 'CodTipoMed'
  });

  Medicamento.belongsTo(models.Especialidad, {
    foreignKey: 'CodEspec'
  });

  Medicamento.hasMany(models.DetalleOrdenVta, {
    foreignKey: 'CodMedicamento'
  });

  Medicamento.hasMany(models.DetalleOrdenCompra, {
    foreignKey: 'CodMedicamento'
  });
};

sequelize.sync()
  .then(() => {
    console.log('Tabla Medicamento sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Medicamento:', error);
  });

module.exports = Medicamento;
