const {connection} = require("../config/DB")

const getPrestamos = (req, res) => {
    const query = "SELECT * FROM prestamos";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener los préstamos", details: err.message });
        }
        res.json(results);
    });
}   
const getPrestamosPorId = (req, res) => {
    const { id_prestamo } = req.params || req.body;
    const query = "SELECT * FROM prestamos WHERE id_prestamo = ?";
    connection.query(query, [id_prestamo], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener el préstamo", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Préstamo no encontrado." });
        }
        res.json(results[0]);
    });
}


const crearPrestamo = (req, res) => {
    const { id_usuario, id_libro } = req.body;
    if (!id_usuario || !id_libro) return res.status(400).json({ error: "Faltan id_usuario o id_libro" });
    const qStock = "SELECT libro_stock FROM libros WHERE id_libro = ? FOR UPDATE";
    connection.query(qStock, [id_libro], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al consultar stock', details: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Libro no encontrado' });
        const stock = results[0].libro_stock;
        if (stock <= 0) return res.status(400).json({ error: 'No hay ejemplares disponibles' });
        
        const qInsert = "INSERT INTO prestamos (id_libro, id_usuario) VALUES (?, ?)";
        connection.query(qInsert, [id_libro, id_usuario], (err, insertRes) => {
            if (err) return res.status(500).json({ error: 'Error al crear préstamo', details: err.message });
            
            const qUpdateStock = "UPDATE libros SET libro_stock = libro_stock - 1 WHERE id_libro = ?";
            connection.query(qUpdateStock, [id_libro], (err, updRes) => {
                if (err) return res.status(500).json({ error: 'Error al actualizar stock', details: err.message });
                
                res.status(201).json({ message: 'Préstamo creado con éxito', id_prestamo: insertRes.insertId });
            });
        });
    });
};


const actualizarPrestamo = (req, res) => {
    const id_prestamo = req.params.id_prestamo || req.body.id_prestamo;
    if (!id_prestamo) return res.status(400).json({ error: 'Falta id_prestamo' });
    const qGet = "SELECT * FROM prestamos WHERE id_prestamo = ?";
    connection.query(qGet, [id_prestamo], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al consultar préstamo', details: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Préstamo no encontrado' });
        const prestamo = results[0];
        const wasReturned = prestamo.fecha_devolucion !== null;
        const qUpdate = "UPDATE prestamos SET fecha_devolucion = CURRENT_TIMESTAMP WHERE id_prestamo = ?";
        connection.query(qUpdate, [id_prestamo], (err, updRes) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar préstamo', details: err.message });
            if (!wasReturned) {
                const qIncStock = "UPDATE libros SET libro_stock = libro_stock + 1 WHERE id_libro = ?";
                connection.query(qIncStock, [prestamo.id_libro], (err2) => {
                    if (err2) return res.status(500).json({ error: 'Error al actualizar stock', details: err2.message });
                    return res.status(200).json({ message: 'Préstamo devuelto y stock actualizado.' });
                });
            } else {
                return res.status(200).json({ message: 'El préstamo ya estaba devuelto.' });
            }
        });
    });
}

const eliminarPrestamo = (req, res) => {
    const { id_prestamo } = req.params || req.body;
    const query = "UPDATE prestamos SET activo_prestamo = 0 WHERE id_prestamo = ?";
    connection.query(query, [id_prestamo], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar el préstamo", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Préstamo no encontrado." });
        }   
        res.status(200).json({ message: "Préstamo eliminado con éxito." });
    });
}   

module.exports = { getPrestamos, getPrestamosPorId, crearPrestamo, actualizarPrestamo, eliminarPrestamo };