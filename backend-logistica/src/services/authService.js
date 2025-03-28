import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { variables } from "../utils/variables.js";
import usuarioRepositorio from "../../db/repositorios/usuarioRepositorio.js";

const login = async (email, password) => {
    const usuario = await usuarioRepositorio.buscarPorEmail(email);
    if (!usuario) throw new Error("Usuario no encontrado");

    const esValido = await bcrypt.compare(password, usuario.password);

    if (!esValido) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ sub: usuario.id, email: usuario.email }, variables.JWT_SECRET, { expiresIn: "2h" });

    return { token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } };
};


export default { login };
