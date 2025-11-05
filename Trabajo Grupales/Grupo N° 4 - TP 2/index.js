import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './src/routes/auth.routes.js';
import clientesRoutes from './src/routes/clientes.routes.js';
import serviciosRoutes from './src/routes/servicios.routes.js';
import turnosRoutes from './src/routes/turnos.routes.js';

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());                      // JSON (Thunder/Postman)
app.use(express.urlencoded({ extended: true })); // <- NECESARIO para <form>

app.use('/api/auth', authRoutes);             // <- MONTAR AUTH
app.use('/api/clientes', clientesRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/turnos', turnosRoutes);

app.get('/', (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
