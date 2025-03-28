import { conectar } from "../conexionDB.js";

const crear = async (envio) => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query(
            "INSERT INTO envios_maritimos (cliente_id, producto_id, cantidad, fecha_registro, fecha_entrega, puerto_id, precio_envio, descuento, precio_final, numero_flota, numero_guia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                envio.cliente_id,
                envio.producto_id,
                envio.cantidad,
                envio.fecha_registro,
                envio.fecha_entrega,
                envio.puerto_id,
                envio.precio_envio,
                envio.descuento,
                envio.precio_final,
                envio.numero_flota,
                envio.numero_guia
            ]
        );

        conexion.end(); // Cerramos la conexión después de la consulta
        console.log("✅ Envío marítimo creado con éxito");
        return { id: results.insertId, ...envio };

    } catch (err) {
        console.error("❌ Error al crear el envío marítimo:", err.message);
        throw new Error("No se pudo crear el envío marítimo");
    }
};

const leer = async () => {
    try {
        const conexion = await conectar();
        const [results] = await conexion.query("SELECT * FROM envios_maritimos");

        conexion.end(); // Cerramos la conexión después de la consulta
        return results;

    } catch (err) {
        console.error("❌ Error al obtener los envíos marítimos:", err.message);
        throw new Error("No se pudieron obtener los envíos marítimos");
    }
};

export default { crear, leer };
