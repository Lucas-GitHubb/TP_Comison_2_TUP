const pool = require('../config/DB');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ================================
//  Obtener todos los socios
// ================================
exports.getAll = (req, res) => {
  const sql = 'SELECT id, nombre, dni, telefono, email FROM socios ORDER BY id DESC';
  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ================================
//  Obtener un socio por ID
// ================================
exports.getById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT id, nombre, dni, telefono, email FROM socios WHERE id = ?';
  pool.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Socio no encontrado' });
    res.json(results[0]);
  });
};

// ================================
//  Crear socio (con hash de contraseña)
// ================================
exports.create = async (req, res) => {
  try {
    const { nombre, dni, telefono, email, password } = req.body;
    if (!nombre || !dni || !email || !password) {
      return res.status(400).json({ error: 'Nombre, DNI, email y password son obligatorios' });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = 'INSERT INTO socios (nombre, dni, telefono, email, password) VALUES (?,?,?,?,?)';
    pool.query(sql, [nombre, dni, telefono, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, nombre, dni, email });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear socio' });
  }
};

// ================================
//  Actualizar socio
// ================================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, dni, telefono, email, password } = req.body;

    let sql, params;

    if (password) {
      // Si envían password, hashéala
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      sql = 'UPDATE socios SET nombre=?, dni=?, telefono=?, email=?, password=? WHERE id=?';
      params = [nombre, dni, telefono, email, hashedPassword, id];
    } else {
      sql = 'UPDATE socios SET nombre=?, dni=?, telefono=?, email=? WHERE id=?';
      params = [nombre, dni, telefono, email, id];
    }

    pool.query(sql, params, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Socio no encontrado' });
      res.json({ ok: true, mensaje: 'Socio actualizado correctamente' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar socio' });
  }
};

// ================================
//  Eliminar socio
// ================================
exports.remove = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM socios WHERE id = ?';
  pool.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Socio no encontrado' });
    res.json({ ok: true, mensaje: 'Socio eliminado correctamente' });
  });
};

// ================================
//  Login de socio (generar JWT)
// ================================
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email y password son obligatorios' });

  const sql = 'SELECT * FROM socios WHERE email = ?';
  pool.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email } });
  });
};
