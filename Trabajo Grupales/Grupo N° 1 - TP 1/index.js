const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());              
app.use(express.json());        


app.use('/api', require('./src/routes/index'));


app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Servidor en funcionamiento ✅'
  });
});


app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});


app.use((err, req, res, next) => {
  console.error('❌ Error en el servidor:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📊 Sistema de Gestión Comercial`); 
});
