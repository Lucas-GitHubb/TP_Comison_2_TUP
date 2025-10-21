import pool from '../config/db.js'

export const getDonadores = async (req, res) => {
  try{
    const [result] = await pool.query('SELECT * FROM donadores WHERE deleted_at IS NULL')
    res.json({status: 200, payload: result})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al obtener los donadores'})
  }
}

export const getOneDonador = async (req, res) => {
  const id = req.params.id
  try{
    const [result] = await pool.query('SELECT * FROM donadores WHERE deleted_at IS NULL AND id = ?', [id])
    if(result.length === 0) return res.json({status: 404, message: 'Donador no encontrado o eliminado'})
    res.json({status: 200, payload: result})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al obtener el donador'})
  }
}

export const postDonadores = async (req, res) => {
  const {nombre, apellido, contacto} = req.body
  try{
    const result = await pool.query(`INSERT INTO donadores (nombre, apellido, contacto) VALUES (?, ?, ?);`, [nombre, apellido, contacto])
    if(result.affectedRows === 0) return res.json({status: 404, message: 'No se pudo crear el donador'})
    res.json({status: 201, payload: `Donador ${apellido} ${nombre} creado con éxito`})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al crear el donador'})
  }
}

export const putDonadores = async (req, res) => {
  const id = req.params.id
  const {nombre, apellido, contacto} = req.body
  try{
    const result = await pool.query('UPDATE donadores SET nombre = ?, apellido = ?, contacto = ? WHERE id = ?;', [nombre, apellido, contacto, id])
    if(result.affectedRows === 0) return res.json({status: 404, message: 'No se pudo actualizar el donador'})
    res.json({status: 200, payload: result})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al actualizar el donador'})
  }
}

export const deleteDonadores = async (req, res) => {
  const id = req.params.id
  try{
    const result = await pool.query('UPDATE donadores SET deleted_at = NOW() WHERE id = ?;', [id])
    if(result.affectedRows === 0) return res.json({status: 404, message: 'No se pudo actualizar el donador'})
    res.json({status: 200, payload: `El donador fue dado de baja`})
  }
  catch(error){
    console.log(error)
    res.json({status: 400, message: error.sqlMessage || 'Error al eliminar el donador'})
  }
}