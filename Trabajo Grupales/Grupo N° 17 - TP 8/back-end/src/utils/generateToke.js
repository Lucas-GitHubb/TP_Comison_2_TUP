import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      rol: user.rol, // si manejas roles
    },
    process.env.JWT_SECRET, // clave secreta definida en tu .env
    { expiresIn: "7d" } // expira en 7 días (puedes ajustar)
  );
};
