
import bcrypt from 'bcrypt';

// Número de rondas de sal (salt)
const RONDAS_SALT = parseInt(process.env.SALT_ROUNDS || '10', 10);

/**
 * Hashea una contraseña
 * @param {string} password - La contraseña en texto plano
 * @returns {Promise<string>} - La contraseña hasheada
 */
export async function hashearContrasena(password) {
  if (!password) throw new Error('La contraseña es obligatoria');
  const salt = await bcrypt.genSalt(RONDAS_SALT);
  return bcrypt.hash(password, salt);
}

/**
 * Compara una contraseña con su hash
 * @param {string} password - La contraseña en texto plano
 * @param {string} hash - El hash almacenado
 * @returns {Promise<boolean>} - true si coinciden, false si no
 */
export async function compararContrasena(password, hash) {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
}
