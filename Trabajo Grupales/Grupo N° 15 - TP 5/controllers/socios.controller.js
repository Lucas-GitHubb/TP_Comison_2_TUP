const  connection  = require("../config/config")

const mostrarSocios = (req, res) => {

    const consulta = "select * from socios";

    connection.query(consulta, (error, results) => {
        if (error) {
            console.error("Error al obtener los socios:", error);
            res.status(500).json({ error: "Error al obtener los socios" });
        } else {
            res.send(results);
        }
    });
};

const crearSocio = (req, res) => {
    const { nombre, apellido, mail, telefono, fechaNacimiento } = req.body;

    const consulta = "INSERT INTO socios (nombre, apellido, mail, telefono, fechaNacimiento) VALUES (?, ?, ?, ?, ?)";

    connection.query(consulta, [nombre, apellido, mail, telefono, fechaNacimiento], (error, results) => {
        if (error) {
            console.error("Error al crear el socio:", error);
            res.status(500).json({ error: "Error al crear el socio" });
        } else {
            res.status(201).json({ message: "Socio creado exitosamente", id: results.insertId });
        }
    });
};

const modificarSocio = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, mail, telefono, fechaNacimiento } = req.body;
    const consulta = "UPDATE socios SET nombre = ?, apellido = ?, mail = ?, telefono = ?, fechaNacimiento = ? WHERE idSocio = ?";
    connection.query(consulta, [nombre, apellido, mail, telefono, fechaNacimiento, id], (error, results) => {
        if (error) {
            console.error("Error al modificar el socio:", error);
            res.status(500).json({ error: "Error al modificar el socio" });
        } else {
            res.json({ message: "Socio modificado exitosamente" });
        }
    });

}

const eliminarSocio = (req, res) => {
    const { id } = req.params;
    const consulta = "DELETE FROM socios WHERE idSocio = ?";
    connection.query(consulta, [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar el socio:", error);
            res.status(500).json({ error: "Error al eliminar el socio" });
        } else {
            res.json({ message: "Socio eliminado exitosamente" });
        }
    });
}

module.exports = { mostrarSocios, crearSocio, modificarSocio, eliminarSocio };

