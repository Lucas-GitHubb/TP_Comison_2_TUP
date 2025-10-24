import express from 'express';
import dotenv from 'dotenv';

import comedoresRoutes from './routes/comedores.route.js';
import migrationRoutes from './routes/migration.route.js';
import donadoresRoutes from './routes/donadores.route.js';
import productosRoutes from './routes/productos.route.js';
import entregasRoutes from './routes/entregas.route.js';

import { requestLogger } from './middlewares/requestLogger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { app, connectDb } from './app.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

// Conectar DB
connectDb();

// Middlewares
app.use(express.json());
app.use(requestLogger);

// Rutas principales
app.use('/api/migration/', migrationRoutes);
app.use('/api/donadores/', donadoresRoutes);
app.use('/api/comedores/', comedoresRoutes);
app.use('/api/productos/', productosRoutes);
app.use('/api/entregas/', entregasRoutes);

// Middlewares globales
app.use(notFoundHandler);
app.use(errorHandler);

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
