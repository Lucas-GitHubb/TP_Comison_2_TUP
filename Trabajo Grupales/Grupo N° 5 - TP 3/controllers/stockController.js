const conection = require("../config/database");

//Traer todos los stock
const getAllStock = (req, res) => {
  const consulta =
    "SELECT * FROM stock s JOIN productos p ON s.id_producto = p.id_producto WHERE s.estado_stock = 1";

  conection.query(consulta, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al traer los stock" });
    }

    return res.status(200).json(results);
  });
};

//Traer un el stock de un producto
const getOneStock = (req, res) => {
  const { id } = req.params;

  const consulta =
    "SELECT * FROM stock s JOIN productos p ON s.id_producto = p.id_producto WHERE s.id_producto = ? AND s.estado_stock = 1";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al traer el stock" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontro el stock del producto" });
    }

    return res.status(200).json(results);
  });
};

//Traer los productos con stock mínimo
const getStockMinimo = (req, res) => {
  const consulta = `
    SELECT * 
    FROM stock s 
    JOIN productos p ON s.id_producto = p.id_producto 
    WHERE s.estado_stock = 1 
    AND s.cantidad < (SELECT AVG(cantidad) FROM stock WHERE estado_stock = 1)
  `;

  conection.query(consulta, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al traer los stock mínimos" });
    }

    if (results.length === 0) {
      return res
        .status(200)
        .json({ message: "No hay productos con stock bajo" });
    }

    return res.status(200).json(results);
  });
};

module.exports = {
  getAllStock,
  getOneStock,
  getStockMinimo,
};
