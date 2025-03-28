import { conectar } from "../conexionDB.js";

const crear = async (puerto) => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query(
            "INSERT INTO puertos (nombre, pais) VALUES (?, ?)",
            [puerto.nombre, puerto.pais]
        );
        console.log("✅ Puerto creado con éxito");
        return { id: results.insertId, ...puerto };
    } catch (err) {
        console.error("❌ Error al crear el puerto:", err.message);
        throw new Error("No se pudo crear el puerto");
    }
};

const leer = async () => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query("SELECT * FROM puertos");
        return results;
    } catch (err) {
        console.error("❌ Error al obtener los puertos:", err.message);
        throw new Error("No se pudieron obtener los puertos");
    }
};

const detalle = async (puertoId) => {
    try {
        const conexion = await conectar();
        const [resultado] = await conexion.query("SELECT * FROM puertos WHERE id = ?", [puertoId]);
        return resultado.length > 0 ? resultado[0] : null;
    } catch (error) {
        console.error("❌ Error en la consulta de detalle del puerto:", error.message);
        throw new Error("No se pudo obtener el puerto");
    }
};

const actualizar = async (puerto) => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query(
            "UPDATE puertos SET nombre = ?, pais = ? WHERE id = ?",
            [puerto.nombre, puerto.pais, puerto.id]
        );
        if (results.affectedRows === 0) return null;
        console.log("✅ Puerto actualizado con éxito");
        return { id: puerto.id, ...puerto };
    } catch (err) {
        console.error("❌ Error al actualizar el puerto:", err.message);
        throw new Error("No se pudo actualizar el puerto");
    }
};

const eliminar = async (id) => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query("DELETE FROM puertos WHERE id = ?", [id]);
        if (results.affectedRows === 0) return null;
        console.log("✅ Puerto eliminado con éxito");
        return { mensaje: "Puerto eliminado con éxito" };
    } catch (err) {
        console.error("❌ Error al eliminar el puerto:", err.message);
        throw new Error("No se pudo eliminar el puerto");
    }
};

export default { crear, leer, detalle, actualizar, eliminar };
