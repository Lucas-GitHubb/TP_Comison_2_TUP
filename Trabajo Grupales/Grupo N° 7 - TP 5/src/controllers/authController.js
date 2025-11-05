
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { conection } = require("../config/DB");

const login = (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT * FROM usuarios WHERE email = ?";
    conection.query(query, [email], async (err, result) => {
        if (err) return res.status(500).json({ message: "Error en el servidor" });
        if (result.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const usuario = result[0];
        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido)
            return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET || "clave_secreta",
            { expiresIn: "2h" }
        );

        res.json({ message: "Login exitoso", token });
    });
};

module.exports = { login };
