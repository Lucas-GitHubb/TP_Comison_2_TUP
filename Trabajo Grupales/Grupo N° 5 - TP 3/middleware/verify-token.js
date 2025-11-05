const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  jwt.verify(token, secret, (err, user) => {
    if(err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    req.user = user.data.username;
    
    next();
  })
}

module.exports = { verifyToken };