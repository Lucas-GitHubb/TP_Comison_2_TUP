const {connection} = require("../config/DB");

const getLibros = (req, res) => {
    const query = "SELECT * FROM libros WHERE activo_libro = 1";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener los libros", details: err.message });
        }
        res.json(results);
    });
}  

const getLibrosPorId = (req, res) => {
    const { id_libro } = req.params || req.body;
    const query = "SELECT * FROM libros WHERE id_libro = ?";
    connection.query(query, [id_libro], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener el libro", details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Libro no encontrado." });
        }
        res.json(results[0]);
    });
}  

const crearLibro = (req, res) => {
    const { libro_titulo, autor, libro_stock = 1, id_categoria } = req.body;
    const query = "INSERT INTO libros (libro_titulo, autor, libro_stock, id_categoria, activo_libro) VALUES (?, ?, ?, ?, 1)";
    connection.query(query, [libro_titulo, autor, libro_stock, id_categoria], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al crear el libro", details: err.message });
        }
        res.status(201).json({ message: "Libro creado con éxito", id_libro: results.insertId });
    });
}  

const actualizarLibro = (req, res) => {
    const { id_libro, libro_titulo, autor, id_categoria, libro_stock, activo_libro } = req.body;
    const query = "UPDATE libros SET libro_titulo = ?, autor = ?, id_categoria = ?, libro_stock = ?, activo_libro = ? WHERE id_libro = ?";
    connection.query(query, [libro_titulo, autor, id_categoria, libro_stock, activo_libro, id_libro], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar el libro", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Libro no encontrado." });
        }
        res.status(200).json({ message: "Libro actualizado con éxito." });
    });
}   

const eliminarLibro = (req, res) => {
    const { id_libro } = req.params || req.body;
    const query = "UPDATE libros SET activo_libro = 0 WHERE id_libro = ?";
    connection.query(query, [id_libro], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar el libro", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Libro no encontrado." });
        }
        res.status(200).json({ message: "Libro eliminado con éxito." });
    });
}

module.exports = { getLibros, getLibrosPorId, crearLibro, actualizarLibro, eliminarLibro };