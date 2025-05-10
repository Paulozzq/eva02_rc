const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Especialidad = sequelize.define('Especialidad', {
  CodEspec: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionEsp: DataTypes.STRING
}, {
  tableName: 'Especialidad',
  timestamps: false
});

sequelize.sync()
  .then(() => {
    console.log('Tabla Especialidad sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Especialidad:', error);
  });

module.exports = Especialidad;
