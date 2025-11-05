const conection = require("../config/database");

// Entrada de stock
const entradaStock = (req, res) => {
  console.log("Entre en entrada de stock");

  //Recibo el id del stock desde los parametros
  const { id_stock } = req.params;
  //Recibo desde el cuero la cantidad y un comentario
  const { cantidad, comentario } = req.body;

  //Hago una consulta para traer la cantidad y el id del producto con el id del stock de los parametros
  const consultaStock =
    "SELECT cantidad, id_producto FROM stock WHERE id_stock = ?";

  conection.query(consultaStock, [id_stock], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al traer el stock", err });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Stock no encontrado" });
    }

    //Guardo la cantidad actual para luego sumarle la nueva
    const cantidadActual = Number(results[0].cantidad);
    //Guardo el id del producto para luego usarlo en la consulta del movimiento
    const id_producto = results[0].id_producto;

    //Hago una consulta para actualizar el stock del producto
    const updateStock =
      "UPDATE stock SET cantidad = cantidad + ? WHERE id_stock = ?";

    conection.query(updateStock, [cantidad, id_stock], (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar el stock", err });
      }

      //Hago una consulta para crear el reiciente movimiento
      const consultaMovimiento =
        "INSERT INTO movimientos_stock (id_producto, tipo, comentario, cantidad, stock_total) VALUES (?,?,?,?,?)";

      //Guardo la suma de la cantidad actual del principio con la nueva cantidad asi guardar el stock total
      const stock_total = cantidadActual + Number(cantidad);

      conection.query(
        consultaMovimiento,
        [
          id_producto,
          "Entrada",
          comentario || "Sin comentarios",
          cantidad,
          stock_total,
        ],
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al registrar el movimiento", err });
          }

          return res
            .status(201)
            .json({ message: "Stock actualizado con éxito" });
        }
      );
    });
  });
};

// Salida de stock
const salidaStock = (req, res) => {
  // Recibo el id del stock desde los parámetros
  const { id_stock } = req.params;
  // Recibo desde el cuerpo la cantidad y un comentario
  const { cantidad, comentario } = req.body;

  // Traigo la cantidad actual y el id del producto del stock
  const consultaStock =
    "SELECT cantidad, id_producto FROM stock WHERE id_stock = ?";

  conection.query(consultaStock, [id_stock], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al traer el stock", err });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Stock no encontrado" });
    }

    const cantidadActual = Number(results[0].cantidad);
    const id_producto = results[0].id_producto;

    //Si es menor a 0 tira error
    if (cantidadActual - Number(cantidad) < 0) {
      return res
        .status(400)
        .json({ message: "No hay suficiente stock para realizar la salida" });
    }

    // Actualizo el stock
    const updateStock =
      "UPDATE stock SET cantidad = cantidad - ? WHERE id_stock = ?";

    conection.query(updateStock, [cantidad, id_stock], (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al actualizar el stock", err });
      }

      // Registro el movimiento
      const consultaMovimiento =
        "INSERT INTO movimientos_stock (id_producto, tipo, comentario, cantidad, stock_total) VALUES (?,?,?,?,?)";

      const stock_total = cantidadActual - Number(cantidad);

      conection.query(
        consultaMovimiento,
        [
          id_producto,
          "Salida",
          comentario || "Sin comentarios",
          cantidad,
          stock_total,
        ],
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al registrar el movimiento", err });
          }

          return res
            .status(201)
            .json({ message: "Stock actualizado con éxito" });
        }
      );
    });
  });
};

//Traer todos los movimientos
const getAllMovimientos = (req, res) => {
  const consulta =
    "SELECT * FROM movimientos_stock mv JOIN productos p ON mv.id_producto = p.id_producto";

  conection.query(consulta, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al traer los movimientos" });
    }

    return res.status(200).json(results);
  });
};

//Traer movimientos por producto
const getMovimientoPorProducto = (req, res) => {
  const { id_producto } = req.params;

  const consulta =
    "SELECT * FROM movimientos_stock mv JOIN productos p ON mv.id_producto = p.id_producto WHERE mv.id_producto = ? ORDER BY mv.fecha_movimiento ASC";

  conection.query(consulta, [id_producto], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al traer los movimientos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Movimientos no encontrados" });
    }

    return res.status(200).json(results);
  });
};

module.exports = {
  entradaStock,
  salidaStock,
  getAllMovimientos,
  getMovimientoPorProducto,
};
