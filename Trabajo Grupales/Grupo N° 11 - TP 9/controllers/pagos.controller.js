import pool from '../config/DB.js';

export const listar = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT p.id, s.nombre AS socio, p.monto, p.mes, p.anio, p.fecha_pago
        FROM pagos p
        JOIN socios s ON s.id = p.socio_id
        ORDER BY p.fecha_pago DESC
      `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const registrar = async (req, res) => {
    const { socio_id, monto, mes, anio } = req.body;
    if (!socio_id || !monto || !mes || !anio)
        return res.status(400).json({ error: 'Datos incompletos para registrar el pago' });

    try {
        const [result] = await pool.query(
            'INSERT INTO pagos (socio_id, monto, mes, anio, fecha_pago) VALUES (?, ?, ?, ?, NOW())',
            [socio_id, monto, mes, anio]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deudas = async (req, res) => {
    const socioId = req.params.socioId;
    try {
        const [pagos] = await pool.query(
            'SELECT mes, anio FROM pagos WHERE socio_id=? ORDER BY anio DESC, mes DESC',
            [socioId]
        );
        // Ejemplo de lógica: mostrar los meses faltantes de este año
        const mesesPagados = pagos.map(p => `${p.mes}/${p.anio}`);
        res.json({ socio_id: socioId, mesesPagados });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
