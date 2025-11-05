const connection = require('../config/bd');


// Obtener todos los artistas por eventos 
const obtenerTodos = (req, res) => {
    connection.query('SELECT * FROM artistas_eventos', (err, result) => {
        if (err) {
            console.error("Error al obtener asignaciones:", err);
            return res.status(500).json({ error: 'Error del servidor' });
        }
        res.json(result);
    });
};

// Obtener artistas de un evento  filtro por eventoId 
const obtenerPorEvento = (req, res) => {
    const { eventoId } = req.params;
    const consulta = 'SELECT * FROM artistas_eventos WHERE evento_id = ?';
    connection.query(consulta, [eventoId], (err, result) => {
        if (err) {
            console.error("Error al obtener asignación por evento:", err);
            return res.status(500).json({ error: 'Error del servidor' });
        }
        res.json(result);
    });
};

// Crear asignación de artista a evento 
const crear = (req, res) => {
    const { artista_id, evento_id, rol } = req.body;
    const consulta = 'INSERT INTO artistas_eventos (artista_id, evento_id, rol) VALUES (?, ?, ?)';
    const params = [artista_id, evento_id, rol || 'principal'];

    connection.query(consulta, params, (err, result) => {
        // Manejo de error para duplicados
        if (err && err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Ya existe esta asignación' });
        }        
        
        res.status(201).json({ message: 'Asignación creada'});
    });
};

// Eliminar asignación de artista a evento
const eliminar = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM artistas_eventos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("Error al eliminar asignación:", err);
            return res.status(500).json({ error: 'Error del servidor' });
        }        
        res.json({ message: 'Asignación eliminada' });
    });
};

module.exports = {
    obtenerTodos,
    obtenerPorEvento,
    crear,
    eliminar
};