const bcrypt = require('bcryptjs');
const pool = require('../config/db');

console.log('USER:', process.env.DB_USER);
console.log('DB:', process.env.DB_DATABASE);

(async () => {
  try {
    const nombre = 'mateo';
    const email = 'lucaszottoladev@gmail.com';
    const password = '1234567';
    const rol = 'admin';

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, hashedPassword, rol]
    );

    console.log(' Usuario admin creado con éxito');
    process.exit(0);
  } catch (error) {
    console.error(' Error al crear admin:', error);
    process.exit(1);
  }
})();
