const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const usuariosRoutes = require('./routes/usuarios.route.js');
const proveedoresRoutes = require('./routes/proveedores.route.js');
const productosRoutes = require('./routes/productos.route.js');
const ventasRoutes = require('./routes/ventas.route.js');
const metricasRoutes = require('./routes/metricas.route.js');

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/metricas', metricasRoutes);


app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));