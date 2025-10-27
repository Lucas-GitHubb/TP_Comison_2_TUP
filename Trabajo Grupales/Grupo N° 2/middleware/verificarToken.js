import jwt, { decode } from "jsonwebtoken";

export const verificarToken = (req, res, next) => {

  try {
    
    const authHeader = req.headers['authorization'];
  
    if(!authHeader) {
      return  res.status(401).json({ error: "Token no proporcionado" });
    }
  
    const token = authHeader.split(' ')[1];
  
    if(!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }
  
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
  
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error en verificarToken:", error);
    res.status(401).json({ error: "Token inválido" });
  }
};