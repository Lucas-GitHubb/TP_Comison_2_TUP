const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const serviciosRoutes = require('./src/routes/servicios.routes.js');
const clientesRoutes = require('./src/routes/clientes.routes.js');
const turnosRoutes = require('./src/routes/turnos.routes.js');

dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


app.use('/clientes', clientesRoutes);
app.use('/servicios', serviciosRoutes);
app.use('/turnos', turnosRoutes);





const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
