// index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// --- 1. Importación de la Conexión DB ---
const { testConnection } = require('./config/db');

// --- 2. Importación de Rutas ---
const usuariosRoutes = require('./routes/usuarios.routes');
const proveedoresRoutes = require('./routes/proveedores.routes');
const productosRoutes = require('./routes/productos.routes');
const ventasRoutes = require('./routes/ventas.routes');
const metricasRoutes = require('./routes/metricas.routes');
// (Si creaste una ruta para clientes, ¡importala aquí!)

const app = express();
const PORT = process.env.PORT || 3000;

// --- 3. Middlewares Obligatorios y Sugeridos ---
app.use(helmet()); // Seguridad básica
app.use(cors());   // Permitir peticiones de otros dominios
app.use(morgan('dev')); // Logging de peticiones HTTP (sugerido)
app.use(express.json()); // Permite a Express leer el cuerpo de las peticiones en formato JSON

// --- 4. Montaje de Rutas ---
// Montamos cada router en su path base: /api/[nombre]
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/metricas', metricasRoutes);
// (Si tienes clientes, sería app.use('/api/clientes', clientesRoutes);)

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de Gestión Comercial en funcionamiento.');
});

// --- 5. Inicio del Servidor ---
// Primero probamos la conexión a la base de datos
testConnection().then(() => {
    // Si la conexión es exitosa, iniciamos el servidor Express
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
});