const conection = require("./../config/db")

const getMetricasVentas = async (req, res) => {

    const consultaTotalVentas = `SELECT SUM(precio_total) AS total_ventas_mes
    FROM ventas
       WHERE MONTH(fecha_venta) = MONTH(CURRENT_DATE())
       AND YEAR(fecha_venta) = YEAR(CURRENT_DATE())
       AND estado_venta = 'completada'`


    conection.query(consultaTotalVentas, (error, result) => {
        if (error) return res.status(500).json({ message: "Error al llamar a las metricas de venta" })

        return res.status(201).json(result)
    })
}

const getMetricasProductos = (req,res)=> {
    const consultaMasVendidos = `SELECT p.nombre_producto, SUM(dv.cantidad) AS total_vendidos
       FROM detalle_ventas dv
       JOIN productos p ON dv.id_producto = p.id_producto
       GROUP BY dv.id_producto
       ORDER BY total_vendidos DESC
       LIMIT 5`
    
    conection.query(consultaMasVendidos,(error,result)=>{
        if(error) return res.status(500).json({message:"error al traer las metricas de productos"})

         return res.status(201).json({result})
    })
}


module.exports = { getMetricasVentas,getMetricasProductos}