const {connection} = require("../config/DB")

const getAllVentas = (req,res) =>{

    const consulta = " select * from Ventas;"

    connection.query(consulta, (err, result) => {

    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).send({ message: "Ocurrió un error al consultar los usuarios." });
    }

    res.status(200).json({message: "usuarios obtenidos correctamente.",
      data: result
    });
  });

}

const updateVenta = (req, res) => {
  console.log("Estoy en updateVenta");

  const id = req.params.id;
  const { id_usuario, id_producto, venta_total, fecha_de_venta } = req.body;


  const consulta = `
    UPDATE Ventas 
    SET id_usuario = ?, 
        id_producto = ?, 
        venta_total = ?, 
    WHERE id_venta = ?;
  `;

  connection.query(
    consulta,
    [id_usuario, id_producto, venta_total , id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar venta:", err);
        return res.status(500).send({ message: "Ocurrió un error en el servidor." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Venta no encontrada." });
      }

      res.status(200).send({ message: "Venta actualizada correctamente." });
    }
  );
};







module.exports = {getAllVentas, updateVenta}