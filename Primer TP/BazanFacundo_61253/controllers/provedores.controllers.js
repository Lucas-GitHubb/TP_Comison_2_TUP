const { conection } = require("../config/database");

const crearProvedor = (req, res) => {
  const { nombreProvedor, contraProvedor, email, rol } = req.body;

  const consulta = `INSERT INTO Provedors 
    (nombreProvedor, contraProvedor, email, rol)
    VALUES (?, ?, ?, ?)`;

  conection.query(
    consulta,
    [nombreProvedor, contraProvedor, email, rol],
    (err, results) => {
      if (err) {
        console.error("Error al crear el Provedor:", err);
        return res.status(500).json({ error: "Error al crear el Provedor" });
      }
      res.status(201).json({ message: "Provedor creado correctamente" });
    }
  );
};


const borrarProvedor = (req, res) => {
  const idProvedor = req.params.idProvedor;
  const consulta = "DELETE FROM Provedors WHERE idProvedor = ?";

  conection.query(consulta, [idProvedor], (err, results) => {
    if (err) {
      console.error("Error al borrar Provedor:", err);
      return res.status(500).json({ error: "Error al borrar Provedor" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Provedor no encontrado" });
    }

    res.status(200).json({ message: "Provedor eliminado correctamente" });
  });
};

const getProvedors = (req, res) => {
  const consulta = "SELECT * FROM Provedors";

  conection.query(consulta, (err, results) => {
    if (err) {
      console.error("Error al obtener los Provedors:", err);
      return res.status(500).json({ error: "Error al obtener los Provedors" });
    }
    
    res.status(200).json(results);
  });
};

const updateProvedor = (req, res) => {
  const idProvedor = req.params.idProvedor;
  const { nombreProvedor, contraProvedor, email, rol } = req.body;
  const consulta =
    "UPDATE ProvedorS  SET NOMBREProvedor = ?, CONTRAProvedor = ?, EMAIL = ?, ROL= ? WHERE IDProvedor = ?";

  conection.query(
    consulta,
    [nombreProvedor, contraProvedor, email, rol, idProvedor],
    (err, results) => {
      if (err) {
        console.error("Error al actulizar el Provedor", err);
        return res
          .status(500)
          .json({ error: "Error al querer actualizar un Provedor" });
      }
      return res.status(200).json(results);
    }
  );
};


module.exports = {
    crearProvedor,
    getProvedors,
    updateProvedor,
    borrarProvedor
}