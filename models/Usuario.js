const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Usuario = sequelize.define('Usuario', {
  CodUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  rol: DataTypes.STRING
}, {
  tableName: 'Usuario',
  timestamps: false
});

sequelize.sync()
  .then(() => {
    console.log('Tabla Usuario sincronizada');
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla Usuario:', error);
  });

module.exports = Usuario;