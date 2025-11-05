const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const SECRET_KEY = process.env.JWT_SECRET;//  JWT_SECRET (igual que en login)

const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];//obtener el token del encabezado Authorization
    
    if (!SECRET_KEY) {
        return res.status(500).json({ message: 'Clave secreta no configurada en el servidor' });//regresar error 500 si no hay clave secreta
    }
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token' });//cambiar mensaje de error para indicar que no se proporcionó token
    }
    
   
    const tokenParts = authHeader.split(' ');
    
    
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {//verificar que el esquema sea Bearer y que el token exista
        return res.status(401).json({ message: 'Acceso denegado. Token malformado' });//cambiar mensaje de error para indicar que el token está malformado
    }
    
    const token = tokenParts[1];
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {//verificar el token
        if (err) {
            if (err.name === 'TokenExpiredError') {//verificar si el token ha expirado
                return res.status(401).json({ message: 'Acceso denegado. El token ha expirado' });
            }
            return res.status(403).json({ message: 'Token inválido' });
        }
        
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;



