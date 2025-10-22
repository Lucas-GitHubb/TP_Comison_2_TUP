const { connection } = require("../config/DB");

const getAllProducts = (req, res) => {
  console.log("Entre a traer todos los productos");
  const consulta = " select * from Producto";

  connection.query(consulta, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const getOneProduct = (req, res) => {

  const id = req.params.id;

  const consulta = "select * from Producto where id_producto=? ";

  connection.query(consulta, [id], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      res.status(404).send({ message: "No existe el producto" });
    } else {
      res.json(result);
    }
  });
};

const deleteProduct = (req, res) => {

  const id = req.params.id;

  const consulta = "UPDATE Producto SET estado_del_producto = 0 WHERE id_producto = ?";

  connection.query(consulta, [id], (err, result) => {
    if (err) throw err;
    else {
      res.status(200).send({ message: "Producto eliminado correctamente" });
    }
  });
};

const updateProduct = (req, res) => {

  console.log("estoy en update")

  const id = req.params.id;
  const nombre_producto = req.body.nombre_producto;
  const precio_de_compra = req.body.precio_de_compra;
  const precio_de_venta = req.body.precio_de_venta;
  const estado_del_producto = req.body.estado_del_producto;

  const consulta =
    "UPDATE Producto SET nombre_producto=? , precio_de_compra=? , precio_de_venta=? , estado_del_producto=? WHERE id_producto=? ";

  connection.query(
    consulta,
    [
      nombre_producto,
      precio_de_compra,
      precio_de_venta,
      estado_del_producto,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar producto:", err);
        return res
          .status(500)
          .send({ message: "Ocurrió un error en el servidor." });
      } else {
        res.status(200).send({ message: "Producto editado correctamente." });
      }
    }
  );
};

const createProduct = (req, res) => {
  console.log("Entre a create product");

  const nombre_producto = req.body.nombre_producto;
  const precio_de_compra = req.body.precio_de_compra;
  const precio_de_venta = req.body.precio_de_venta;
  const estado_del_producto = req.body.estado_del_producto;

  const consulta =
    "INSERT INTO Producto ( nombre_producto, precio_de_compra, precio_de_venta, estado_del_producto) VALUES ( ?, ?, ?, ?);";

  connection.query(
    consulta,
    [nombre_producto, precio_de_compra, precio_de_venta, estado_del_producto],
    (err, result) => {
      if (err) {
        console.error("Error al cargar el producto:", err);
        return res
          .status(500)
          .send({ message: "Ocurrió un error en el servidor." });
      } else {
        res.status(200).send({ message: "Producto cargado correctamente." });
      }
    }
  );
};

const getBestSellingProduct = (req, res) => {
  console.log("entre en mejor venta");

  const consulta =
    "SELECT p.id_producto, p.nombre_producto, SUM(dv.cantidad) AS total_vendido, SUM(dv.cantidad * dv.precio_unitario) AS monto_total_vendido FROM Detalle_Venta dv JOIN Producto p ON dv.id_producto = p.id_producto GROUP BY p.id_producto, p.nombre_producto ORDER BY total_vendido DESC LIMIT 1;";
  connection.query(consulta, (err, result) => {
    if (err) {
      console.error("Error al obtener el producto más vendido:", err);
      return res.status(500).send({
        message: "Ocurrió un error al consultar el producto más vendido.",
      });
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  getBestSellingProduct,
};