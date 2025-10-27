const { connection } = require("../config/db");

const getAllCompras = (req, res) => {
  const consulta = `
    SELECT c.*, p.nombre as proveedor_nombre, u.nombre as usuario_nombre 
    FROM compras c 
    LEFT JOIN proveedores p ON c.proveedor_id = p.id 
    LEFT JOIN usuarios u ON c.usuario_id = u.id 
    ORDER BY c.fecha_compra DESC
  `;
  
  connection.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const getCompraById = (req, res) => {
  const { id } = req.params;
  
  const consultaCompra = `
    SELECT c.*, p.nombre as proveedor_nombre, u.nombre as usuario_nombre 
    FROM compras c 
    LEFT JOIN proveedores p ON c.proveedor_id = p.id 
    LEFT JOIN usuarios u ON c.usuario_id = u.id 
    WHERE c.id = ?
  `;
  
  const consultaDetalles = `
    SELECT dc.*, pr.nombre as producto_nombre 
    FROM detalle_compras dc 
    LEFT JOIN productos pr ON dc.producto_id = pr.id 
    WHERE dc.compra_id = ?
  `;
  
  connection.query(consultaCompra, [id], (err, compraResults) => {
    if (err) return res.status(500).json({ error: err.message });
    if (compraResults.length === 0) return res.status(404).json({ error: "Compra no encontrada" });
    
    connection.query(consultaDetalles, [id], (err2, detallesResults) => {
      if (err2) return res.status(500).json({ error: err2.message });
      
      res.json({
        ...compraResults[0],
        detalles: detallesResults
      });
    });
  });
};

const createCompra = (req, res) => {
  const { proveedor_id, usuario_id, detalles } = req.body;
  
  let total = 0;
  detalles.forEach(detalle => {
    total += detalle.cantidad * detalle.precio_unitario;
  });
  
  const consultaCompra = "INSERT INTO compras (proveedor_id, total, usuario_id) VALUES (?, ?, ?);";

  connection.query(consultaCompra, [proveedor_id, total, usuario_id], (err, compraResults) => {
    if (err) return res.status(500).json({ error: err.message });
    
    const compraId = compraResults.insertId;
    
    const consultaDetalle = `
      INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio_unitario, subtotal) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    let detallesInsertados = 0;
    
    detalles.forEach(detalle => {
      const subtotal = detalle.cantidad * detalle.precio_unitario;
      
      connection.query(consultaDetalle, 
        [compraId, detalle.producto_id, detalle.cantidad, detalle.precio_unitario, subtotal],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2.message });
          
          detallesInsertados++;
          
          if (detallesInsertados === detalles.length) {
            res.status(201).json({ id: compraId, mensaje: "Compra creada exitosamente" });
          }
        }
      );
    });
  });
};

module.exports = {
  getAllCompras,
  getCompraById,
  createCompra
};