const {connection} = require("../config/DB")

const getAllStock = (req,res) =>{

    const consulta = " select * from Stock ;"

    connection.query(consulta, (err, result) => {

    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).send({ message: "Ocurrió un error al consultar el stock." });
    }

    res.status(200).json({message: "stock",
      data: result
    });
  });

}





module.exports = {getAllStock}