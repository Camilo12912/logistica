import { conectar } from "../conexionDB.js";

const crear = async (envio) => {
    try {
        const conexion = await conectar();
        const [result] = await conexion.query(
            `INSERT INTO envios_terrestres 
                (cliente_id, producto_id, cantidad, fecha_registro, fecha_entrega, almacen_id, precio_envio, placa_vehiculo, numero_rastreo) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            // 🔥 Se usa `envio.almacen_id` en vez de `envio.almacenEntity.id`
            [
                envio.clienteEntity.id, 
                envio.productoEntity.id, 
                envio.cantidad, 
                envio.fecha_registro, 
                envio.fecha_entrega, 
                envio.almacen_id,  
                envio.precio_envio, 
                envio.placa_vehiculo, 
                envio.numero_rastreo
            ]
        );

        console.log("✅ Envío terrestre insertado correctamente:", result);
        return { id: result.insertId, ...envio };
    } catch (err) {
        console.error("❌ Error al crear el envío terrestre:", err.message);
        throw new Error("No se pudo crear el envío terrestre");
    }
};

const leer = async () => {
    try {
        const conexion = await conectar();  // Esperar la conexión antes de usarla
        const consulta = "SELECT * FROM envios_terrestres";
        const [resultados] = await conexion.query(consulta); // Ahora sí funciona
        return resultados;
    } catch (error) {
        console.error("Error al leer envíos terrestres:", error);
        throw error;
    }
};

export { leer };

const leerPorId = (id) => {
    return new Promise((resolve, reject) => {
        conectar.query("SELECT * FROM envios_terrestres WHERE id = ?", [id], (err, results) => {
            if (err) {
                console.error("Error al obtener el envío terrestre", err);
                reject(err);
            } else {
                resolve(results.length > 0 ? results[0] : null);
            }
        });
    });
};

const actualizar = (id, envio) => {
    return new Promise((resolve, reject) => {
        const query = `UPDATE envios_terrestres SET cliente_id=?, producto_id=?, cantidad=?, fecha_registro=?, 
                        fecha_entrega=?, almacen_id=?, precio_envio=?, placa_vehiculo=?, numero_rastreo=?, descuento=? 
                        WHERE id = ?`;
        const values = [
            envio.cliente_id,
            envio.producto_id,
            envio.cantidad,
            envio.fecha_registro,
            envio.fecha_entrega,
            envio.almacen_id,
            envio.precio_envio,
            envio.placa_vehiculo,
            envio.numero_rastreo,
            envio.descuento,
            id
        ];
        conectar.query(query, values, (err, results) => {
            if (err) {
                console.error("Error al actualizar el envío terrestre", err);
                reject(err);
            } else {
                resolve(results.affectedRows > 0 ? { id, ...envio } : null);
            }
        });
    });
};

const eliminar = (id) => {
    return new Promise((resolve, reject) => {
        conectar.query("DELETE FROM envios_terrestres WHERE id = ?", [id], (err, results) => {
            if (err) {
                console.error("Error al eliminar el envío terrestre", err);
                reject(err);
            } else {
                resolve(results.affectedRows > 0);
            }
        });
    });
};

export default { crear, leer, leerPorId, actualizar, eliminar };