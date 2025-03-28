import envioMaritimoRepositorio from "../../db/repositorios/envioMaritimoRepositorio.js";
import clienteRepositorio from "../../db/repositorios/clienteRepositorio.js";
import productoRepositorio from "../../db/repositorios/productoRepositorio.js";
import puertoRepositorio from "../../db/repositorios/puertoRepositorio.js";
import crypto from "crypto";


const crearEnvioMaritimo = (envio) => {
    return new Promise(async (resolver, rechazar) => {
        console.log("📦 JSON recibido en el servicio:", envio);

        if (
            !envio.cliente_id || !envio.producto_id || !envio.cantidad ||
            !envio.fecha_registro || !envio.fecha_entrega || !envio.puerto_id ||
            !envio.precio_envio || envio.descuento === undefined || envio.precio_final === undefined ||
            !envio.numero_flota || !envio.numero_guia
        ) {
            console.error("❌ Error: Datos incorrectos - JSON recibido:", envio);
            rechazar("Datos incorrectos");
            return;
        }

        try {
            const cliente = await clienteRepositorio.detalle(envio.cliente_id);
            const producto = await productoRepositorio.detalle(envio.producto_id);
            const puerto = await puertoRepositorio.detalle(envio.puerto_id);

            console.log("🔍 Cliente encontrado:", cliente);
            console.log("🔍 Producto encontrado:", producto);
            console.log("🔍 Puerto encontrado:", puerto);

            if (!cliente.length || !producto.id || !puerto.id) {
                console.error("❌ Error: Cliente, producto o puerto no encontrados.");
                throw new Error("Cliente, producto o puerto no encontrados.");
            }

            envio.idEnvioMaritimo = crypto.randomUUID();
            envio.clienteEntity = cliente[0];
            envio.productoEntity = producto[0];
            envio.puertoEntity = puerto[0];

            console.log("✅ Datos validados correctamente. Procediendo a guardar en la BD...");
            await envioMaritimoRepositorio.crear(envio);
            resolver(envio);
        } catch (error) {
            console.error("❌ Error en la base de datos:", error);
            rechazar("Error en la base de datos");
        }
    });
};



const leerEnviosMaritimos = async () => {
    return await envioMaritimoRepositorio.leer();
};

export default { crearEnvioMaritimo, leerEnviosMaritimos };
