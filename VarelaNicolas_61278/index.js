import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import pool from './config/DB.js'; 

import usuariosRoutes from './routes/usuarios.routes.js';
import productosRoutes from './routes/productos.routes.js';
import proveedoresRoutes from './routes/proveedores.routes.js';
import ventasRoutes from './routes/ventas.routes.js';
import metricasRoutes from './routes/metricas.routes.js';

dotenv.config();

const app = express();

app.use(cors()); 
app.use(helmet());
app.use(express.json()); 

const PORT = process.env.PORT || 3000;

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/metricas', metricasRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    pool.getConnection()
      .then(connection => {
        console.log('Conexión a la DB (Pool) exitosa');
        connection.release();
      })
      .catch(error => {
        console.error('Error al conectar a la DB (Pool):', error.message);
      });
});