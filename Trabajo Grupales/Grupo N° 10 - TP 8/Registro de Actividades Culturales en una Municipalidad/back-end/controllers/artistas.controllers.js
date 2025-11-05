const connection = require('../config/bd');
const {hashPass} = require("../utils/hash.utils")

const getAllArtistas = (req, res) => {
    const consulta = "SELECT * FROM artistas WHERE activo = true";
    connection.query(consulta, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    })
}


const getArtistasById = (req, res) => {
    const { id } = req.params;
    const consulta = "SELECT * FROM artistas WHERE id = ? AND activo = true";
    connection.query(consulta, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Artista no encontrado' });
        res.json(results[0]);
    })
}

const createArtista =  (req, res) => {
    const { nombre, tipo_arte, biografia, email, contra, telefono } = req.body;
    const consulta = "INSERT INTO artistas (nombre, tipo_arte, biografia, email, contra, telefono) VALUES (?, ?, ?, ?, ?, ?)";

    const contraEmp =  hashPass(contra)

    connection.query(consulta, [nombre, tipo_arte, biografia, email, contraEmp, telefono], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Artista creado' });
    })
}


const updateArtista = (req, res) => {
    const { id } = req.params;
    const { nombre, tipo_arte, biografia, email, telefono, contra, activo } = req.body;
    const consulta = "UPDATE artistas SET nombre=?, tipo_arte=?, biografia=?, email=?, telefono=?, contra=?, activo=? WHERE id=?";
    const contraEmp =  hashPass(contra)

    connection.query(consulta, [nombre, tipo_arte, biografia, email, telefono, contraEmp, activo, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Artista actualizado' });
    })
}

const deleteArtista = (req, res) => {
    const { id } = req.params;
    const consulta = "UPDATE artistas SET activo = false WHERE id = ?";
    connection.query(consulta, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Artista eliminado' });
    })
}

module.exports = { getAllArtistas, getArtistasById, createArtista, updateArtista, deleteArtista }