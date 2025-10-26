const { conection } = require("../config/database");

const registrarVentaEmpleado = async (req, res) => {
  try {
    const { idEmpleado, totalPago, metodoPago, productos, recetas } = req.body;

    if (!idEmpleado) {
      return res.status(400).json({ error: "Falta el idEmpleado" });
    }

    for (const producto of productos) {
      const { idProducto, cantidad } = producto;

      const stockQuery = "SELECT stock FROM Productos WHERE idProducto = ?";
      const stockResult = await new Promise((resolve, reject) => {
        conection.query(stockQuery, [idProducto], (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        });
      });

      if (!stockResult || stockResult.stock < cantidad) {
        return res
          .status(400)
          .json({ error: `Stock insuficiente para el producto` });
      }
    }

    const consulta = `
      INSERT INTO VentasEmpleados (idEmpleado, totalPago, metodoPago)
      VALUES (?, ?, ?)
    `;
    const resultVenta = await new Promise((resolve, reject) => {
      conection.query(
        consulta,
        [idEmpleado, totalPago, metodoPago],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    const idVentaE = resultVenta.insertId;

    for (const producto of productos) {
      const { idProducto, cantidad, precioUnitario } = producto;

      await new Promise((resolve, reject) => {
        const insertDetalleQuery = `
          INSERT INTO DetalleVentaEmpleado (idVentaE, idProducto, cantidad, precioUnitario)
          VALUES (?, ?, ?, ?)
        `;
        conection.query(
          insertDetalleQuery,
          [idVentaE, idProducto, cantidad, precioUnitario],
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });

      await new Promise((resolve, reject) => {
        const updateStockQuery = `
          UPDATE Productos SET stock = stock - ?
          WHERE idProducto = ? AND stock >= ?
        `;
        conection.query(
          updateStockQuery,
          [cantidad, idProducto, cantidad],
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
    }

    if (recetas && recetas.length > 0) {
      for (const receta of recetas) {
        const { idProducto, cantidad, descripcion } = receta;

        await new Promise((resolve, reject) => {
          const insertRecetaQuery = `
            INSERT INTO receta (idProducto, cantidad, descripcion)
            VALUES (?, ?, ?)
          `;
          conection.query(
            insertRecetaQuery,
            [idProducto, cantidad, descripcion || null],
            (err) => {
              if (err) return reject(err);
              resolve();
            }
          );
        });
      }
    }

    res.status(201).json({
      message: "Venta presencial registrada correctamente",
      idVentaE,
    });
  } catch (error) {
    console.error("Error inesperado:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


module.exports = {registrarVentaEmpleado}