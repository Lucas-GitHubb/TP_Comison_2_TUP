const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// ImportaMOS 
require('../tp-gestioncomercial/config/db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/usuarios', require('../tp-gestioncomercial/routes/usuarios.routes'));
app.use('/api/proveedores', require('../tp-gestioncomercial/routes/proveedores.routes'));
app.use('/api/categorias', require('../tp-gestioncomercial/routes/categorias.routes'));
app.use('/api/productos', require('../tp-gestioncomercial/routes/productos.routes'));
app.use('/api/ventas', require('../tp-gestioncomercial/routes/ventas.routes'));
app.use('/api/compras', require('../tp-gestioncomercial/routes/compras.routes'));
app.use('/api/metricas', require('../tp-gestioncomercial/routes/metricas.routes'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Sistema de Gestión Comercial funcionando',
    timestamp: new Date().toISOString()
  });
});

// MIS RUTASSS
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido al Sistema de Gestión Comercial',
    version: '1.0.0',
    endpoints: {
      usuarios: '/api/usuarios',
      proveedores: '/api/proveedores',
      categorias: '/api/categorias',
      productos: '/api/productos',
      ventas: '/api/ventas',
      compras: '/api/compras',
      metricas: '/api/metricas'
    }
  });
});

// 404 handler que pidio para instalar 
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
  next();
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 Servidor backend corriendo en puerto ' + PORT);
  console.log('📊 Sistema de Gestión Comercial');
  console.log('🌐 URL: http://localhost:' + PORT);
});