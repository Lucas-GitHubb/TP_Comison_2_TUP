import pool from "../config/DB.js";

// Obtener todos los productos
export const getAllProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.idProducto, p.nombreProducto, p.descripcion, p.precio, p.stock,
             pr.nombreProveedor AS proveedor
      FROM productos p
      LEFT JOIN proveedores pr ON p.idProveedor = pr.idProveedor
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

// Obtener un producto por ID
export const getOneProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT p.idProducto, p.nombreProducto, p.descripcion, p.precio, p.stock,
             pr.nombreProveedor AS proveedor
      FROM productos p
      LEFT JOIN proveedores pr ON p.idProveedor = pr.idProveedor
      WHERE p.idProducto = ?
      `,
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// Crear un producto
export const createProducto = async (req, res) => {
  const { idProveedor, nombreProducto, descripcion, precio, stock } = req.body;

  try {
    // Validar proveedor existente
    const [prov] = await pool.query(
      "SELECT idProveedor FROM proveedores WHERE idProveedor = ?",
      [idProveedor]
    );
    if (prov.length === 0)
      return res.status(404).json({ message: "Proveedor no encontrado" });

    const [result] = await pool.query(
      `
      INSERT INTO productos (idProveedor, nombreProducto, descripcion, precio, stock)
      VALUES (?, ?, ?, ?, ?)
      `,
      [idProveedor, nombreProducto, descripcion, precio, stock || 0]
    );

    res
      .status(201)
      .json({ message: "Producto creado correctamente", id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

// Actualizar un producto
export const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { idProveedor, nombreProducto, descripcion, precio, stock } = req.body;

  try {
    const [result] = await pool.query(
      `
      UPDATE productos
      SET idProveedor = ?, nombreProducto = ?, descripcion = ?, precio = ?, stock = ?
      WHERE idProducto = ?
      `,
      [idProveedor, nombreProducto, descripcion, precio, stock, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar producto
export const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM productos WHERE idProducto = ?",
      [id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

// Productos más vendidos (consulta desde detalle_venta)
export const productosMasVendidos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.idProducto,
        p.nombreProducto,
        SUM(dv.cantidad) AS cantidadVendida,
        SUM(dv.subtotal) AS totalGenerado
      FROM detalle_venta dv
      JOIN productos p ON dv.idProducto = p.idProducto
      GROUP BY p.idProducto, p.nombreProducto
      ORDER BY cantidadVendida DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos más vendidos" });
  }
};
