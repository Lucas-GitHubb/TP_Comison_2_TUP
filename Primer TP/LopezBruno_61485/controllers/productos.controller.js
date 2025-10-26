exports.getProductos = (req, res) => {
  res.json({ message: "Listado de productos" });
};

exports.createProducto = (req, res) => {
  res.json({ message: "Producto creado correctamente" });
};
