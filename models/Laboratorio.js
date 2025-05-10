const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Laboratorio = sequelize.define('Laboratorio', {
  CodLab: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  razonSocial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contacto: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Laboratorio',
  timestamps: false
});

sequelize.sync()
  .then(() => {
    console.log('Tabla Laboratorio sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Laboratorio:', error);
  });

module.exports = Laboratorio;
