const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { testConnection } = require('./config/db');


const usuariosRoutes = require('./Routes/usuarios.routes');
const proveedoresRoutes = require('./Routes/proveedores.routes');
const productosRoutes = require('./Routes/productos.routes');
const ventasRoutes = require('./Routes/ventas.routes');
const metricasRoutes = require('./Routes/metricas.routes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); 
app.use(cors());   
app.use(morgan('dev')); 
app.use(express.json()); 


app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/metricas', metricasRoutes);


app.get('/', (req, res) => {
    res.send('API de Gestion Comercial en funcionamiento.');
});

testConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`👌Servidor corriendo en http://localhost:${PORT}`);
    });
});