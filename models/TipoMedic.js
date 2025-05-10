const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const TipoMedic = sequelize.define('TipoMedic', {
  CodTipoMed: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: DataTypes.STRING
}, {
  tableName: 'TipoMedic',
  timestamps: false
});

TipoMedic.associate = (models) => {
  TipoMedic.hasMany(models.Medicamento, {
    foreignKey: 'CodTipoMed'
  });
};

sequelize.sync()
  .then(() => {
    console.log('Tabla TipoMedic sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla TipoMedic:', error);
  });

module.exports = TipoMedic;
