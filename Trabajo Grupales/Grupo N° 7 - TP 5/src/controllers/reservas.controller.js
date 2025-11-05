const { conection } = require("../config/DB")

const getReservas = (req, res) => {
    const sql = "SELECT * FROM reservas"
    conection.query(sql, (error, results) => {
        if (error) throw error
        res.json(results)
    })
}

const addReserva = (req, res) => {
    const { socio_id, actividad_id, fecha, hora } = req.body

    if (!socio_id || !actividad_id || !fecha) {
        return res.status(400).send({ mensaje: "Faltan datos obligatorios" })
    }

    const sqlCupo = `
        SELECT a.cupo_maximo, COUNT(r.id) AS cantidad
        FROM actividades a
        LEFT JOIN reservas r ON a.id = r.actividad_id AND r.fecha = ?
        WHERE a.id = ?
        GROUP BY a.id
    `

    conection.query(sqlCupo, [fecha, actividad_id], (error, results) => {
        if (error) throw error

        if (results.length === 0) {
            res.status(404).send({ mensaje: "Actividad no encontrada" })
        } else {
            const cupoMax = results[0].cupo_maximo
            const cantidad = results[0].cantidad

            if (cantidad >= cupoMax) {
                res.status(400).send({ mensaje: "No hay cupos disponibles" })
            } else {
                const sqlInsert = "INSERT INTO reservas (socio_id, actividad_id, fecha, hora) VALUES (?,?,?,?)"
                const values = [socio_id, actividad_id, fecha, hora]

                conection.query(sqlInsert, values, (error, results2) => {
                    if (error) throw error
                    res.status(201).send({ mensaje: "Reserva creada correctamente" })
                })
            }
        }
    })
}

const deleteReserva = (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM reservas WHERE id = ?"

    conection.query(sql, [id], (error, results) => {
        if (error) throw error

        if (results.affectedRows === 0) {
            res.status(404).send({ mensaje: "Reserva no encontrada" })
        } else {
            res.send({ mensaje: "Reserva eliminada correctamente" })
        }
    })
}

module.exports = { getReservas, addReserva, deleteReserva }

