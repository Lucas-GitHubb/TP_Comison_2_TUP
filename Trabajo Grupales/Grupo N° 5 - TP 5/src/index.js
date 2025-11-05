const { app, connectDb } = require('./app');

const PORT = process.env.PORT || 3000;

connectDb();

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error al iniciar el servidor:', err);
  } else {
    console.log('Servidor corriendo en el puerto ' + PORT);
  }
});
