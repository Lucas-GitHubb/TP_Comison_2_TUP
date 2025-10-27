const { connection } = require("../config/db");

const getAllVentas = (req, res) => {
  const consulta = `
    SELECT v.*, u.nombre as vendedor_nombre 
    FROM ventas v 
    LEFT JOIN usuarios u ON v.vendedor_id = u.id 
    ORDER BY v.fecha_venta DESC
  `;
  
  connection.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getVentaById = (req, res) => {
  const { id } = req.params;
  
  const consultaVenta = `
    SELECT v.*, u.nombre as vendedor_nombre 
    FROM ventas v 
    LEFT JOIN usuarios u ON v.vendedor_id = u.id 
    WHERE v.id = ?
  `;
  
  const consultaDetalles = `
    SELECT dv.*, p.nombre as producto_nombre 
    FROM detalle_ventas dv 
    LEFT JOIN productos p ON dv.producto_id = p.id 
    WHERE dv.venta_id = ?
  `;
  
  connection.query(consultaVenta, [id], (err, ventaResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (ventaResults.length === 0) return res.status(404).json({ error: "Venta no encontrada" });
    
    connection.query(consultaDetalles, [id], (err2, detallesResults) => {
      if (err2) return res.status(500).json({ error: err2.message });
      
      res.json({
        ...ventaResults[0],
        detalles: detallesResults
      });
    });
  });
};

const createVenta = (req, res) => {
  const { cliente_nombre, cliente_documento, cliente_email, cliente_telefono, vendedor_id, detalles } = req.body;
  
  let subtotal = 0;
  detalles.forEach(detalle => {
    subtotal += detalle.cantidad * detalle.precio_unitario;
  });
  
  const impuesto = subtotal * 0.21;
  const total = subtotal + impuesto;
  
  const consultaVenta = `
    INSERT INTO ventas (cliente_nombre, cliente_documento, cliente_email, cliente_telefono, subtotal, impuesto, total, vendedor_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  connection.query(consultaVenta, 
    [cliente_nombre, cliente_documento, cliente_email, cliente_telefono, subtotal, impuesto, total, vendedor_id],
    (err, ventaResults) => {
      if (err) return res.status(500).json({ error: err.message });
      
      const ventaId = ventaResults.insertId;
      
      const consultaDetalle = `
        INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal) 
        VALUES (?, ?, ?, ?, ?)
      `;
      
      let detallesInsertados = 0;
      
      detalles.forEach(detalle => {
        const subtotalDetalle = detalle.cantidad * detalle.precio_unitario;
        
        connection.query(consultaDetalle, 
          [ventaId, detalle.producto_id, detalle.cantidad, detalle.precio_unitario, subtotalDetalle],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            
            detallesInsertados++;
            
            if (detallesInsertados === detalles.length) {
              res.status(201).json({ id: ventaId, mensaje: "Venta creada exitosamente" });
            }
          }
        );
      });
    }
  );
};

const updateEstadoVenta = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const consulta = "UPDATE ventas SET estado = ? WHERE id = ?;";

  connection.query(consulta, [estado, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Venta no encontrada" });
    res.json({ mensaje: "Estado de venta actualizado exitosamente" });
  });
};

module.exports = {
  getAllVentas,
  getVentaById,
  createVenta,
  updateEstadoVenta
};