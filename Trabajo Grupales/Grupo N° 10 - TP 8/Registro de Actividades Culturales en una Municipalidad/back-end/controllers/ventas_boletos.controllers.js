const connection = require("../config/bd");

// Obtener todas las ventas
const obtenerVentas = (req, res) => {
    const consulta = 'SELECT * FROM ventas_boletos';
    connection.query(consulta, (err, results) => {
        if (err) {
            console.error("Error al obtener ventas:", err);
            return res.status(500).json({ error: "Error del servidor al obtener las ventas" });
        }
        res.json(results);
    });
};

// Obtener ventas de un evento
const obtenerVentasPorEvento = (req, res) => {
    const { eventoId } = req.params;
    const consulta = 'SELECT * FROM ventas_boletos WHERE evento_id = ?';
    connection.query(consulta, [eventoId], (err, results) => {
        if (err) {
            console.error("Error al obtener ventas por evento:", err);
            return res.status(500).json({ error: "Error del servidor" });
        }
        res.json(results);
    });
};

// Crear nueva venta
const crearVenta = (req, res) => {
    const { evento_id, cantidad_boletos, total_venta, metodo_pago } = req.body;
    const consulta = 'INSERT INTO ventas_boletos (evento_id, cantidad_boletos, total_venta, metodo_pago) VALUES (?, ?, ?, ?)';
    const params = [evento_id, cantidad_boletos, total_venta, metodo_pago || 'efectivo'];
    
    connection.query(consulta, params, (err, result) => {
        if (err) {
            console.error("Error al crear la venta:", err);
            return res.status(500).json({ error: "Error del servidor al crear la venta" });
        }
        res.status(201).json({ message: 'Venta registrada',});
    });
};

// Obtener total de ventas por evento
const obtenerTotalVentas = (req, res) => {
    const consulta = `
        SELECT evento_id, SUM(cantidad_boletos) as total_boletos, SUM(total_venta) as total_ingresos
        FROM ventas_boletos 
        GROUP BY evento_id
    `;
    connection.query(consulta, (err, results) => {
        if (err) {
            console.error("Error al obtener totales:", err);
            return res.status(500).json({ error: "Error del servidor al obtener los totales" });
        }
        res.json(results);
    });
};

module.exports = {
    obtenerVentas,
    obtenerVentasPorEvento,
    crearVenta,
    obtenerTotalVentas
};