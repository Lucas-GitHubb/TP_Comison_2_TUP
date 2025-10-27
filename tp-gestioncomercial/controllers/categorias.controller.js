const { connection } = require("../config/db");

// Obtener todas las categorías
const getAllCategorias = (req, res) => {
  const consulta = "SELECT * FROM categorias;";
  
  connection.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener categoría por ID
const getCategoriaById = (req, res) => {
  const { id } = req.params;
  const consulta = "SELECT * FROM categorias WHERE id = ?;";
  
  connection.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(results[0]);
  });
};

// Crear categoría
const createCategoria = (req, res) => {
  const { nombre, descripcion } = req.body;
  const consulta = "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?);";

  connection.query(
    consulta,
    [nombre, descripcion],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, mensaje: "Categoría creada exitosamente" });
    }
  );
};

// Actualizar categoría
const updateCategoria = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  const consulta = "UPDATE categorias SET nombre=?, descripcion=? WHERE id=?;";

  connection.query(consulta, [nombre, descripcion, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json({ mensaje: "Categoría actualizada exitosamente" });
  });
};

// Eliminar categoría
const deleteCategoria = (req, res) => {
  const { id } = req.params;
  const consulta = "DELETE FROM categorias WHERE id = ?;";
  
  connection.query(consulta, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json({ mensaje: "Categoría eliminada exitosamente" });
  });
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
};