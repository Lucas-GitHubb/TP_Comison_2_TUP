import pool from '../config/db.js'

export const getEntregas = async (req, res) => {
  try{
    const [result] = await pool.query('SELECT * FROM entregas WHERE deleted_at IS NULL')
    res.json({status: 200, payload: result})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al obtener las entregas'})
  }
}

export const getOneEntrega = async (req, res) => {
  const id = req.params.id
  try{
    const [result] = await pool.query('SELECT * FROM entregas WHERE deleted_at IS NULL AND id = ?', [id])
    if(result.length === 0) return res.json({status: 404, message: 'Entrega no encontrada o eliminada'})
    res.json({status: 200, payload: result})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al obtener la entrega'})
  }
}

export const postEntrega = async (req, res) => {
  const {id_donador, id_producto, id_comedor, cantidad, observaciones} = req.body
  try{
    const result = await pool.query(`INSERT INTO entregas (id_donador, id_producto, id_comedor, cantidad, observaciones) VALUES (?, ?, ?, ?, ?);`, [id_donador, id_producto, id_comedor, cantidad, observaciones])
    if(result.affectedRows === 0) return res.json({status: 404, message: 'No se pudo crear la entrega'})
    res.json({status: 201, payload: `Entrega creada con éxito`})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al crear la Entrega'})
  }
}

export const putEntrega = async (req, res) => {
  const id = req.params.id
  const {id_donador, id_producto, id_comedor, cantidad, observaciones} = req.body
  try{
    const result = await pool.query('UPDATE entregas SET id_donador = ?, id_producto = ?, id_comedor = ?, cantidad = ?, observaciones = ? WHERE id = ?;', [id_donador, id_producto, id_comedor, cantidad, observaciones, id])
    if(result.affectedRows === 0) return res.json({status: 404, message: 'No se pudo actualizar la entrega'})
    res.json({status: 200, payload: result})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al actualizar la entrega'})
  }
}

export const deleteEntrega = async (req, res) => {
  const id = req.params.id
  try{
    const result = await pool.query('UPDATE entregas SET deleted_at = NOW() WHERE id = ?;', [id])
    if(result.affectedRows === 0) return res.json({status: 404, message: 'No se pudo actualizar la entrega'})
    res.json({status: 200, payload: `La entrega fue dada de baja`})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al eliminar la entrega'})
  }
}