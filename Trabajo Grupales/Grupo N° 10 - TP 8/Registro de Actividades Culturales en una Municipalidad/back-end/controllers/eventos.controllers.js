const connection  = require("../config/bd");

// obtenemos todos los eventos 
const getAllEventos = (req, res) => {
    const consulta = `
        SELECT e.*, l.nombre as lugar_nombre, l.capacidad_maxima,
               (l.capacidad_maxima - e.entradas_vendidas) as entradas_disponibles
        FROM eventos e 
        JOIN lugares l ON e.lugar_id = l.id 
        WHERE e.activo = true
    `;
    connection.query(consulta, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// obtener evento por su id 
const getEventoById = (req, res) => {
    const { id } = req.params;
    const consulta = 'SELECT * FROM eventos WHERE id = ? AND activo = true';
    connection.query(consulta, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Evento no encontrado' }); // Cambié a 'error'
        res.json(results[0]);
    });
};

// crear un evento 
const createEvento = (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar_id, precio_entrada } = req.body;
    const consulta = 'INSERT INTO eventos SET ?';
    const datos = { nombre, descripcion, fecha_inicio, fecha_fin, lugar_id, precio_entrada };
    connection.query(consulta, datos, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, message: 'Evento creado' });
    });
};

// actualizar un evento 
const updateEvento = (req, res) => {
    const { id } = req.params;
    const consulta = 'UPDATE eventos SET ? WHERE id = ? AND activo = true';
    connection.query(consulta, [req.body, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Evento no encontrado' });
        res.json({ message: 'Evento actualizado' });
    });
};

// eliminar el evento 
const deleteEvento = (req, res) => {
    const { id } = req.params;
    const consulta = 'UPDATE eventos SET activo = false WHERE id = ?';
    connection.query(consulta, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Evento no encontrado' });
        res.json({ message: 'Evento eliminado' });
    });
};

// Añadir un artista a un evento 
const AgregarArtistaEvento = (req, res) => {
    const { eventoId, artistaId } = req.params;
    const { rol } = req.body;
    const consulta = 'INSERT INTO artistas_eventos SET ?';
    const datos = { artista_id: artistaId, evento_id: eventoId, rol: rol || 'principal' };
    connection.query(consulta, datos, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, message: 'Artista agregado al evento' });
    });
};

// VENDER UN BOLETO PARA EL EVENTO Y SE VERIFICA LA CAPACIDAD 
const venderBoletos = (req, res) => {
    const { eventoId } = req.params;
    const { cantidad } = req.body;
    const consulta = `
        SELECT capacidad_maxima, entradas_vendidas 
        FROM eventos e 
        JOIN lugares l ON e.lugar_id = l.id 
        WHERE e.id = ?
    `;
    connection.query(consulta, [eventoId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Evento no encontrado' });
        
        const evento = results[0];
        const disponibles = evento.capacidad_maxima - evento.entradas_vendidas;
        
        if (cantidad > disponibles) {
            return res.status(400).json({ error: `Solo hay ${disponibles} entradas disponibles` });
        }
        
        const updateConsulta = 'UPDATE eventos SET entradas_vendidas = entradas_vendidas + ? WHERE id = ?';
        connection.query(updateConsulta, [cantidad, eventoId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: `${cantidad} boletos vendidos`, disponibles: disponibles - cantidad });
        });
    });
};

module.exports = {
    getAllEventos,
    getEventoById,
    createEvento,
    updateEvento,
    deleteEvento,
    AgregarArtistaEvento,
    venderBoletos
};