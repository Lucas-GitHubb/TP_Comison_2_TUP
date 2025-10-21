
import { app, connectDb } from './app.js';

const PORT = process.env.PORT || 8080;

// Conectar DB
connectDb();

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
