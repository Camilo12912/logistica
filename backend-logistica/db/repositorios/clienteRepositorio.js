import { conectar } from "../conexionDB.js";

const crear = async (cliente) => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query(
            "INSERT INTO clientes (nombre, email, telefono, direccion) VALUES (?, ?, ?, ?)",
            [cliente.nombre, cliente.email, cliente.telefono, cliente.direccion]
        );
        console.log("✅ Cliente creado con éxito");
        return { id: results.insertId, ...cliente };
    } catch (err) {
        console.error("❌ Error al crear el cliente:", err.message);
        throw new Error("No se pudo crear el cliente");
    }
};

const leer = async () => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query("SELECT * FROM clientes");
        return results;
    } catch (err) {
        console.error("❌ Error al obtener los clientes:", err.message);
        throw new Error("No se pudieron obtener los clientes");
    }
};

const detalle = async (id) => {
    try {
        const conexion = await conectar();  // Llamamos a la función para obtener la conexión
        const [resultado] = await conexion.query("SELECT * FROM clientes WHERE id = ?", [id]);
        conexion.end();  // Cerramos la conexión después de usarla
        return resultado;
    } catch (error) {
        console.error("❌ Error al buscar cliente:", error);
        return [];
    }
};


const actualizar = async (cliente) => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query(
            "UPDATE clientes SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?",
            [cliente.nombre, cliente.email, cliente.telefono, cliente.direccion, cliente.id]
        );
        if (results.affectedRows === 0) return null;
        console.log("✅ Cliente actualizado con éxito");
        return { id: cliente.id, ...cliente };
    } catch (err) {
        console.error("❌ Error al actualizar el cliente:", err.message);
        throw new Error("No se pudo actualizar el cliente");
    }
};

const eliminar = async (id) => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query("DELETE FROM clientes WHERE id = ?", [id]);
        if (results.affectedRows === 0) return null;
        console.log("✅ Cliente eliminado con éxito");
        return { mensaje: "Cliente eliminado con éxito" };
    } catch (err) {
        console.error("❌ Error al eliminar el cliente:", err.message);
        throw new Error("No se pudo eliminar el cliente");
    }
};

export default { crear, leer, detalle, actualizar, eliminar };
