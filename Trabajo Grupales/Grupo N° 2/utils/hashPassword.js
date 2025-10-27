import bcrypt from "bcryptjs";

export const hashPassword = async (contraseñaUsuario) => {
  // función asíncrona para hashear una contraseña
  return await bcrypt.hash(contraseñaUsuario, 10); 
};

export const comparePassword = async (contraseñaUsuario, hashedPassword) => {
  // función asíncrona para comparar una contraseña con su hash
  return await bcrypt.compare(contraseñaUsuario, hashedPassword); 
};
