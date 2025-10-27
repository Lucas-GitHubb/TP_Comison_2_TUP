const conection = require("./../config/db")

const getAllStock = (req, res) => {
    const consulta = `select pr.nombre_producto, pr.descripcion_producto, pr.precio_venta, pr.precio_compra,
    st.cantidad  from stock st join productos pr
    on st.id_producto=pr.id_producto`

    conection.query(consulta, (error, result) => {
        if (error) return res.status(500).json({ message: "error al traer el sotck" })

        return res.status(201).json(result)
    })
}

const getStock = (req, res) => {
    const { id } = req.params

    const consulta = `select pr.nombre_producto, pr.descripcion_producto, pr.precio_venta, pr.precio_compra,
    st.cantidad  from stock st join productos pr
    on st.id_producto=pr.id_producto
    where st.id_producto=?`

    conection.query(consulta, [id], (error, result) => {
        if (error) return res.status(500).json({ message: "error al traer el stock del producto" })

        return res.status(201).json(result)
    })
}
const createStock = (req, res) => {
    const { id } = req.params

    const { cantidad } = req.body

    const consulta = `insert into stock (id_producto,cantidad) values(?,?)`

    conection.query(consulta, [id, cantidad], (error, result) => {
        if (error) return res.status(500).json({ message: "error al crear sotck para el producto" })

        if (result.affectedRows === 0) return res.status(404).json({ message: "producto no encontrado" })

        return res.status(200).json({ message: "stock del producto creado exitosamente" })
    })
}

const updateStock = (req, res) => {
    const { id } = req.params

    const { cantidad } = req.body

    const consulta = `update stock set cantidad = ? where id_producto=?`

    conection.query(consulta, [cantidad,id], (error, result) => {
        if (error) return res.status(500).json({ message: "error al actualizar el stock del producto" })

        return res.status(200).json({ message: "stock actualizado con exito" })
    })
}

module.exports = {
    getAllStock,
    getStock,
    createStock,
    updateStock
}