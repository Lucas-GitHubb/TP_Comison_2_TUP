// Importamos la conexión a la base de datos desde la configuración
const conection = require("../config/database");

//   OBTENER TODOS LOS PRODUCTOS
const getAllProducts = (req, res) => {
  // Consulta SQL: selecciona todos los registros de la tabla Producto
  const consulta = " select * from productos";

  // Ejecutamos la consulta en la base de datos
  conection.query(consulta, (err, result) => {
    if (err) throw err; // Si ocurre un error en la consulta, lo mostramos

    // Si no hay resultados, devolvemos un mensaje de error
    if (result.length === 0) {
      res.status(404).send({ message: "Error en los Productos" });
    } else {
      // Si hay resultados, los devolvemos en formato JSON
      res.json(result);
    }
  });
};

//   OBTENER UN PRODUCTO POR SU ID
const getOneProduct = (req, res) => {
  // Obtenemos el ID del producto desde los parámetros de la URL
  const { id } = req.params;

  // Consulta SQL: busca el producto con ese ID
  const consulta = "select * from productos where id_producto=? ";

  // Ejecutamos la consulta con el ID como parámetro
  conection.query(consulta, [id], (err, result) => {
    if (err) throw err; // Si ocurre un error en la consulta, lo mostramos

    // Si no se encuentra el producto, devolvemos un error 404
    if (result.length === 0) {
      res.status(404).send({ message: "No existe el producto" });
    } else {
      // Si hay resultados, los devolvemos en formato JSON
      res.json(result);
    }
  });
};

//   ELIMINAR PRODUCTO (BORRADO LÓGICO)
const deleteProduct = (req, res) => {
  // Obtenemos el ID del producto a eliminar
  const { id } = req.params;

  // Consulta SQL: cambio de estado del producto (0 = inactivo)
  const consulta =
    "UPDATE productos SET estado_producto = 0 WHERE id_producto = ?";

  // Ejecutamos la actualización
  conection.query(consulta, [id], (err, result) => {
    if (err) throw err;

    // Si no se afectó ninguna fila, devolvemos mensaje de error
    if (result.length === 0) {
      res.status(404).send({ message: "Error del producto" });
    } else {
      // Si se actualizó correctamente, enviamos confirmación
      res.status(200).send({ message: "Producto eliminado correctamente" });
    }
  });
};

//   ACTUALIZAR DATOS DE UN PRODUCTO
const updateProduct = (req, res) => {
  // Obtenemos los datos desde el body y los parámetros
  const { id_producto } = req.params;
  const { id_proveedor, nombre_producto, categoria, precio } = req.body;

  // Consulta SQL: actualiza los datos del producto por su ID
  const consulta =
    "UPDATE productos SET id_proveedor=? , nombre_producto=? , categoria=? , precio=? WHERE id_producto=? ";

  conection.query(
    consulta,
    [id_proveedor, nombre_producto, categoria, precio, id_producto],
    (err, result) => {
      if (err) {
        // Si ocurre un error, lo mostramos en consola y devolvemos error 500
        console.error("Error al actualizar producto:", err);
        return res
          .status(500)
          .send({ message: "Ocurrió un error en el servidor." });
      } else {
        // Si todo salió bien, devolvemos mensaje de éxito
        res.status(200).send({ message: "Producto editado correctamente." });
      }
    }
  );
};

//   CREAR UN NUEVO PRODUCTO (crea también el stock inicial)
const createProduct = (req, res) => {
  console.log("Entre en crear producto");

  // Extraemos los datos del producto desde el cuerpo de la solicitud
  const { nombre_producto, categoria, precio, id_proveedor, cantidad_inicial } =
    req.body;

  // Consulta SQL: inserta un nuevo registro en la tabla 'productos'
  const consultaProducto =
    "INSERT INTO productos (id_proveedor, nombre_producto, categoria, precio) VALUES (?, ?, ?, ?);";

  // Ejecutamos la consulta para crear el producto
  conection.query(
    consultaProducto,
    [id_proveedor, nombre_producto, categoria, precio],
    (err, result) => {
      if (err) {
        console.error("Error al cargar el producto:", err);
        return res
          .status(500)
          .send({ message: "Ocurrió un error al cargar el producto." });
      }

      // Obtenemos el id del nuevo producto
      const id_producto = result.insertId;
      const cantidad = Number(cantidad_inicial) || 0;

      // Insertamos el stock inicial
      const consultaStock =
        "INSERT INTO stock (id_producto, cantidad) VALUES (?, ?);";

      conection.query(consultaStock, [id_producto, cantidad], (err2) => {
        if (err2) {
          console.error("Error al crear el stock inicial:", err2);
          return res
            .status(500)
            .send({
              message:
                "Producto creado, pero ocurrió un error al crear el stock.",
            });
        }

        // Si todo salió bien
        res.status(201).send({
          message: "Producto y stock creados correctamente.",
          id_producto,
        });
      });
    }
  );
};

//   EXPORTACIÓN DE FUNCIONES
module.exports = {
  getAllProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
