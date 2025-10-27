import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';

//importamos rutas creadas
import userRoutes from './routes/user.routes.js';
import proveedorRoutes from './routes/proveedores.routes.js';
import productoRoutes from './routes/productos.routes.js';
import ventasRoutes from './routes/ventas.routes.js';

dotenv.config();

db.getConnection((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
  console.log('Conexion exitosa a la base de datos');
});

const app = express();
//configuracion del puerto
const PORT = process.env.PORT || 3000;

app.use(cors());

//middlewares
app.use(express.json());

//rutas
app.use('/api/usuarios/v1', userRoutes);
app.use('/api/proveedores/v1', proveedorRoutes);
app.use('/api/productos/v1', productoRoutes);
app.use('/api/ventas/v1', ventasRoutes);

//iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


