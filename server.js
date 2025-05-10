require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const Usuario = require('./models/Usuario'); // Ajusta si es necesario
const Medicamento = require('./models/Medicamento'); // Ajusta si es necesario
const app = express();

// Middlewares base
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // ✅ Debe estar ANTES del middleware que accede a req.cookies
app.use(session({ secret: 'otra_clave_secreta', resave: false, saveUninitialized: true }));

// Middleware para cargar usuario desde JWT
app.use(async (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await Usuario.findByPk(decoded.id);
      res.locals.user = usuario || null;
    } catch (err) {
      console.error('Token inválido o expirado:', err.message);
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }

  next();
});

// Configuración del motor de vistas
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.redirect('/login');
});

// Rutas
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

const homeRoute = require('./routes/homeRoute');
app.use('/home', homeRoute);

const almacenRoute = require('./routes/almacenRoutes');
app.use('/almacen', almacenRoute);

const especialidadRoutes = require('./routes/especialidadRoutes');
app.use('/especialidades', especialidadRoutes);

const tipoMedicRoutes = require('./routes/tiposMedicRoutes');
app.use('/tiposMedic', tipoMedicRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const medicamentoRoutes = require('./routes/medicamentoRoutes');
app.use('/medicamentos', medicamentoRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
