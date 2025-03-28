import bcrypt from "bcryptjs";
import usuarioRepositorio from "../../db/repositorios/usuarioRepositorio.js";

const registrarUsuario = async (usuario) => {
    const usuarioExistente = await usuarioRepositorio.buscarPorEmail(usuario.email);
    if (usuarioExistente) throw new Error("El email ya está registrado");

    const hashedPassword = await bcrypt.hash(usuario.password, 10);
    return await usuarioRepositorio.crearUsuario({ ...usuario, password: hashedPassword });
};

export default { registrarUsuario };
