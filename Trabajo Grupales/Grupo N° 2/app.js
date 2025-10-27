
import express from 'express';
import cors from 'cors';
import { conection } from './config/DB.js';
import comedoresRoutes from './routes/comedores.route.js';
import donadoresRoutes from './routes/donadores.route.js';
import entregasRoutes from './routes/entregas.route.js';
import productosRoutes from './routes/productos.route.js';
import migrationRoutes from './routes/migration.route.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/migration', migrationRoutes);
app.use('/api/donadores', donadoresRoutes);
app.use('/api/comedores', comedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/entregas', entregasRoutes);

// Ruta de prueba
app.get('/', (req, res) => res.send('Bienvenidos'));

const connectDb = () => {
  conection.connect(err => {
    if (err) console.error('Error DB:', err);
    else console.log('DB conectada');
  });
};

export { app, connectDb };
