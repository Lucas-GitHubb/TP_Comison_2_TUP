const connection = require('../config/config');

const  mostrarReservas = (req, res) => {

    const consulta = "SELECT * FROM reservas";
    connection.query(consulta, (error, results) => {
        if (error) {
            console.error("Error al obtener las reservas:", error);
            res.status(500).json({ error: "Error al obtener las reservas" });
        } else {
            res.send(results);
        }
    });
};

const crearReserva = (req, res) => {
    const { idSocio, idActividad, fecha,hora } = req.body;

    // Consultar cupo de la actividad
    const consultaCupo = "SELECT cupoMaximo FROM actividades WHERE idActividad = ?";
    connection.query(consultaCupo, [idActividad], (error, results) => {
        if (error) {
            console.error("Error al consultar la actividad:", error);
            return res.status(500).json({ error: "Error al consultar la actividad" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Actividad no encontrada" });
        }

        const cupoMaximo = results[0].cupoMaximo || 0;

        if (cupoMaximo === 0) {
            return res.status(400).json({ error: "No hay cupo disponible para esta actividad" });
        }

        // Verificar si el socio ya tiene una reserva en esa actividad
        const consultaReservaExistente = "SELECT * FROM reservas WHERE idSocio = ? AND idActividad = ?";
        connection.query(consultaReservaExistente, [idSocio, idActividad], (error, reservas) => {
            if (error) {
                console.error("Error al consultar reservas previas:", error);
                return res.status(500).json({ error: "Error al consultar reservas previas" });
            }
            if (reservas.length > 0) {
                return res.status(400).json({ error: "El socio ya tiene una reserva en esta actividad" });
            }

            // Crear la reserva incluyendo la hora
            const consultaReserva = "INSERT INTO reservas (idSocio, idActividad, fecha, hora) VALUES (?, ?, ?, ?)";
            connection.query(consultaReserva, [idSocio, idActividad, fecha, hora], (error, result) => {
                if (error) {
                    console.error("Error al crear la reserva:", error);
                    return res.status(500).json({ error: "Error al crear la reserva" });
                }

                // Descontar 1 del cupo
                const consultaDescontarCupo = "UPDATE actividades SET cupoMaximo = cupoMaximo - 1 WHERE idActividad = ?";
                connection.query(consultaDescontarCupo, [idActividad], (error) => {
                    if (error) {
                        console.error("Error al descontar el cupo:", error);
                        return res.status(500).json({ error: "Reserva creada pero no se pudo actualizar el cupo" });
                    }
                    res.status(201).json({ message: "Reserva creada exitosamente", id: result.insertId });
                });
            });
        });
    });
};

const eliminarReserva = (req, res) => {
    const { idReserva } = req.params;

    const consulta = "DELETE FROM reservas WHERE idReserva = ?";
    connection.query(consulta, [idReserva], (error, results) => {
        if (error) {
            console.error("Error al eliminar la reserva:", error);
            return res.status(500).json({ error: "Error al eliminar la reserva" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        }

        res.json({ mensaje: "Reserva eliminada correctamente" });
    });
};

module.exports = { mostrarReservas, crearReserva, eliminarReserva };
