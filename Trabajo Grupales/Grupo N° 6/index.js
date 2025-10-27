const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clienteRoutes = require('./src/routes/clienteRoutes');
const servicioRoutes = require('./src/routes/servicioRoutes');
const pagoRoutes = require('./src/routes/pagoRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.use('/api/clientes', clienteRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api', pagoRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});