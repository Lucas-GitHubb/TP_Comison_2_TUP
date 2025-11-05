const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require("./routes/auth.routes");




const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use('/api/eventos', require('./routes/eventos.routes'));
app.use('/api/artistas_eventos', require('./routes/artistas_eventos.routes'));
app.use('/api/ventas_boletos', require('./routes/ventas_boletos.routes'));
app.use('/api/artistas', require('./routes/artistas.routes'));
app.use('/api/lugares', require('./routes/lugares.routes'));
app.use("/api/login/artista", require("./routes/login.routes"))
app.use("/api/auth", authRouter);

// RUTA PRINCIPAL
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido al Sistema de Gestión Cultural',
    endpoints: {
      eventos: '/api/eventos',
      artistas_eventos: '/api/artistas_eventos',
      ventas_boletos: '/api/ventas_boletos',
      artistas: '/api/artistas',
      lugares: '/api/lugares',

    }
  });
});

// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor está iniciado en el puerto ${PORT}`);
});


