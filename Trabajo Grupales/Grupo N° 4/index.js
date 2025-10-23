const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');

const serviciosRoutes = require('./routes/serviciosRoute.js');
const clientesRoutes = require('./routes/clientes.js');
const turnosRoutes = require('./routes/turnosRoutes.js');

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
