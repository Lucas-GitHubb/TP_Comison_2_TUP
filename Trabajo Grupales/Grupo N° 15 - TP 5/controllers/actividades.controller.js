const connection = require('../config/config'); // Ajusta la ruta según tu estructura



const mostrarActividades = (req, res) => {
    const consulta = "SELECT * FROM actividades";
    connection.query(consulta, (error, results) => {
        if (error) {
            console.error("Error al obtener las actividades:", error);
            res.status(500).json({ error: "Error al obtener las actividades" });
        } else {
            res.send(results);
        }
    });
};

const crearActividad = (req, res) => {
    const { nombre, descripcion, cupoMaximo } = req.body;
    const consulta = "INSERT INTO actividades (nombre, descripcion, cupoMaximo) VALUES (?, ?, ?)";
    connection.query(consulta, [nombre, descripcion, cupoMaximo], (error, results) => {
        if (error) {
            console.error("Error al crear la actividad:", error);
            res.status(500).json({ error: "Error al crear la actividad" });
        } else {
            res.status(201).json({ message: "Actividad creada exitosamente", id: results.insertId });
        }
    });
};


const editarActividad = (req, res) => {
   const {id} = req.params;
   const { nombre, descripcion, cupoMaximo } = req.body;
   
   const consulta = "UPDATE actividades SET nombre = ?, descripcion = ?, cupoMaximo = ? WHERE idActividad = ?"
   connection.query(consulta, [nombre,descripcion,cupoMaximo,id], (error, results) => {
    if (error) {
            console.error("Error al editar la actividad:", error);
            res.status(500).json({ error: "Error al editar la actividad" });
        } else {
            res.status(201).json({ message: "Actividad fue editada exitosamente"});
        }
   })
}

const eliminarActividad = (req, res) => {
    const {id} = req.params;
const consulta1 = "DELETE From reservas WHERE idActividad = ?"
connection.query(consulta1, [id], (error, results) => {
    if (error) {
            console.error("Error al eliminar la actividad en la recerva:", error);
            res.status(500).json({ error: "Error al eliminar la actividad en la recerva" });
        } 
})
    const consulta2 = "DELETE From actividades WHERE idActividad = ?"
    connection.query(consulta2, [id], (error, results) => {
    if (error) {
            console.error("Error al eliminar la actividad:", error);
            res.status(500).json({ error: "Error al eliminar la actividad" });
        } else {
            res.status(201).json({ message: "Actividad fue eliminada exitosamente"});
        }
})
}

module.exports = { mostrarActividades, crearActividad, editarActividad, eliminarActividad};