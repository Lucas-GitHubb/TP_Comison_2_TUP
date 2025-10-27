const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'secreto123';

// Verificar token general (solo usuarios autenticados)
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }

    req.user = decoded; // Guardamos los datos del token en req.user
    next();
  });
};

// Verificar si el usuario es admin
exports.verifyAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: requiere rol de administrador' });
  }
  next();
};
