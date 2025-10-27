const conection = require("./../config/db")

const getAllVentas = (req, res) => {
    const consulta = `select * from ventas v join usuarios u
    on v.id_usuario = u.id_usuario`

    conection.query(consulta, (error, result) => {
        if (error) return res.status(500).json({ message: "error al traer las ventas" })

        return res.json(result)
    })
}

const getVentas = (req, res) => {
    const { id } = req.params

    const consulta = `select * from ventas where id_venta=?`

    conection.query(consulta, [id], (error, result) => {
        if (error) return res.status(500).json({ message: "error al traer la venta" })

        return res.status(201).json(result)
    })
}

const getVentasUsuario = (req, res) => {
    const { id } = req.params

    const consulta = `select * from ventas where id_usuario=?`

    conection.query(consulta, [id], (error, results) => {
        if (error) return res.status(500).json({ message: "error al traer la venta" })

        return res.status(201).json(results)
    })
}



const createVentas = (req, res) => {
  const {
    id_usuario,
    precio_total,
    productos,
  } = req.body;

  const consultaVenta = `INSERT INTO ventas (id_usuario, precio_total) VALUES (?, ?)`;

  conection.query(consultaVenta, [id_usuario, precio_total], (error, result) => {
    if (error) return res.status(500).json({ message: "Error al crear la venta" });

    const id_venta = result.insertId;

    const consultaDetalle = `INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario, subtotal)
      VALUES (?, ?, ?, ?, ?)`;
      
    const consultaStock = `UPDATE stock SET cantidad = cantidad - ? WHERE id_producto = ?`;

    let productosCargados = 0;
    let errorOcurrido = false;

    productos.forEach((p) => {
      const subtotal = p.cantidad * p.precio_venta;

      conection.query(
        consultaDetalle,
        [id_venta, p.id_producto, p.cantidad, p.precio_venta, subtotal],
        (error1) => {
          if (error1 && !errorOcurrido) {
            errorOcurrido = true;
            return res.status(500).json({ message: "Error al agregar producto al detalle" });
          }

          conection.query(consultaStock, [p.cantidad, p.id_producto], (error2) => {
            if (error2 && !errorOcurrido) {
              errorOcurrido = true;
              return res.status(500).json({ message: "Error al actualizar el stock" });
            }

            productosCargados++;
            if (productosCargados === productos.length && !errorOcurrido) {
              res.status(201).json({
                message: "Venta registrada exitosamente",
                id_venta,
                precio_total,
              });
            }
          });
        }
      );
    });
  });
};

const updateVentaEstado = (req, res) => {
  const { id_venta } = req.params;
  const { estado_venta } = req.body; 

  const consultaEstado = `UPDATE ventas SET estado_venta = ? WHERE id_venta = ?`;
  const consultaStock = `
    UPDATE stock s
    JOIN detalle_ventas dv ON s.id_producto = dv.id_producto
    SET s.cantidad = s.cantidad + dv.cantidad
    WHERE dv.id_venta = ?`;

  if (estado_venta === "anulada") {
    conection.query(consultaStock, [id_venta], (error1) => {
      if (error1) return res.status(500).json({ message: "Error al devolver el stock" });

      conection.query(consultaEstado, [estado_venta, id_venta], (error2, result2) => {
        if (error2) return res.status(500).json({ message: "Error al actualizar la venta" });
        res.status(200).json({ message: "Venta anulada correctamente" });
      });
    });
  } else {
 
    conection.query(consultaEstado, [estado_venta, id_venta], (error, result) => {
      if (error) return res.status(500).json({ message: "Error al actualizar el estado" });
      res.status(200).json({ message: "Estado de venta actualizado correctamente" });
    });
  }
};

const updateVentaCompleta = (req, res) => {
  const { id_venta } = req.params;
  const { id_usuario, precio_total, productos } = req.body;

  const consultaUpdateVenta = `UPDATE ventas SET id_usuario = ?, precio_total = ? WHERE id_venta = ?`;

  const consultaDeleteDetalles = `DELETE FROM detalle_ventas WHERE id_venta = ?`;

  const consultaInsertDetalle = `INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario, subtotal)
    VALUES (?, ?, ?, ?, ?)`;

  const consultaStock = `UPDATE stock SET cantidad = cantidad - ? WHERE id_producto = ?`;

  conection.query(consultaUpdateVenta, [id_usuario, precio_total, id_venta], (error, result) => {
    if (error) return res.status(500).json({ message: "Error al actualizar venta" });


    conection.query(consultaDeleteDetalles, [id_venta], (error2) => {
      if (error2) return res.status(500).json({ message: "Error al eliminar detalles anteriores" });

      let productosCargados = 0;
      let errorOcurrido = false;

      productos.forEach((p) => {
        const subtotal = p.cantidad * p.precio_venta;

        conection.query(
          consultaInsertDetalle,
          [id_venta, p.id_producto, p.cantidad, p.precio_venta, subtotal],
          (error3) => {
            if (error3 && !errorOcurrido) {
              errorOcurrido = true;
              return res.status(500).json({ message: "Error al insertar detalle" });
            }

            conection.query(consultaStock, [p.cantidad, p.id_producto], (error4) => {
              if (error4 && !errorOcurrido) {
                errorOcurrido = true;
                return res.status(500).json({ message: "Error al actualizar stock" });
              }

              productosCargados++;
              if (productosCargados === productos.length && !errorOcurrido) {
                res.status(200).json({
                  message: "Venta actualizada correctamente",
                  id_venta,
                  precio_total,
                });
              }
            });
          }
        );
      });
    });
  });
};

module.exports={
    getAllVentas,
    getVentas,
    getVentasUsuario,
    createVentas,
    updateVentaCompleta,
    updateVentaEstado
}