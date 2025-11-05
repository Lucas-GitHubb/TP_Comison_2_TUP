const { connection } = require("../config/DB");

const getCategorias = (req, res) => {
    const query = "SELECT * FROM categorias WHERE activo_categoria = 1";
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener las categorías", details: err.message });
        }
        res.json(results);
    });
}


const getCategoriasPorId = (req, res) => {
    const { id_categoria } = req.params || req.body;
    const query = "SELECT * FROM categorias WHERE id_categoria = ?";
    connection.query(query, [id_categoria], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener la categoría", details: err.message });
        }  
        if (results.length === 0) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }
        res.json(results[0]);
    });
}   

const crearCategoria = (req, res) => {
    const { nombre_categoria } = req.body;
    const query = "INSERT INTO categorias (nombre_categoria) VALUES (?)";
    connection.query(query, [nombre_categoria], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al crear la categoría", details: err.message });
        }   
        res.status(201).json({ message: "Categoría creada con éxito", id_categoria: results.insertId });
    });
}

const actualizarCategoria = (req, res) => {
    const { id_categoria, nombre_categoria } = req.body;
    const query = "UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?";
    connection.query(query, [nombre_categoria, id_categoria], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar la categoría", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }

    }
    );
    res.status(200).json({ message: "Categoría actualizada con éxito." });
}   

const eliminarCategoria = (req, res) => {
    const { id_categoria } = req.params || req.body;
    const query = "UPDATE categorias SET activo_categoria = 0 WHERE id_categoria = ?";
    connection.query(query, [id_categoria], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar la categoría", details: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }
        res.status(200).send({ message: "Categoría eliminada con éxito." });
    }   
    );
}

module.exports = { getCategorias, crearCategoria, actualizarCategoria, eliminarCategoria, getCategoriasPorId };