import { conectar } from "../conexionDB.js";

const crearUsuario = async (usuario) => {
    try {
        const conexion = await conectar();
        const hashedPassword = await bcrypt.hash(usuario.password, 10); // 🔹 Encriptar contraseña antes de guardar
        const [results] = await conexion.query(
            "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
            [usuario.nombre, usuario.email, hashedPassword]
        );
        return { id: results.insertId, ...usuario };
    } catch (err) {
        console.error("❌ Error al registrar usuario:", err.message);
        throw new Error("No se pudo registrar el usuario");
    }
};

const buscarPorEmail = async (email) => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        return results.length > 0 ? results[0] : null;
    } catch (err) {
        console.error("❌ Error al buscar usuario:", err.message);
        throw new Error("Error al buscar usuario");
    }
};

export default { crearUsuario, buscarPorEmail };
