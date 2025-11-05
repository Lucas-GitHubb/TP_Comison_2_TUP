import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import clienteRoutes from './routes/clienteRoutes.js';
import servicioRoutes from './routes/servicioRoutes.js';
import turnoRoutes from './routes/turnoRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import { testConnection } from './config/DB.js';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/clientes', clienteRoutes);
app.use('/servicios', servicioRoutes);
app.use('/turnos', turnoRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

testConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}).catch((e) => {
  console.error('No se pudo conectar a la DB:', e.message);
  process.exit(1);
});