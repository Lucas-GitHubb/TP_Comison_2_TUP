const express = require('express');
const {connection} = require("./config/DB")
const routesUsuario = require("./routes/usuarios.routes")
const routesCategorias = require("./routes/categorias.routes")
const routesLibros = require("./routes/libros.routes")
const routesPrestamos = require("./routes/prestamos.routes")
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')


const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use("/", routesUsuario);
app.use("/", routesCategorias);
app.use("/", routesLibros);
app.use("/", routesPrestamos);

app.get("/",(req,res)=>{
    res.send(" Backend Biblioteca funcionando")
})



const PORT = process.env.PORT || 8000

app.listen(PORT,(err)=>{
    if(err) throw err
    console.log("escuchando en el puerto "+PORT)
})



connection.connect((err)=>{
    if(err) throw err
    console.log("conectado a mi DB")
})