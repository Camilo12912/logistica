import envioTerrestreRepositorio from "../../db/repositorios/envioTerrestreRepositorio.js";
import clienteRepositorio from "../../db/repositorios/clienteRepositorio.js";
import productoRepositorio from "../../db/repositorios/productoRepositorio.js";
import { EnvioTerrestreDatosResModel } from "../models/envioTerrestreModel.js";
import crypto from "crypto";

const crearEnvioTerrestre = async (envio) => {
    try {
        console.log("📦 Datos recibidos en el servicio:", envio);

        // Asegurar que almacen_id se obtiene correctamente
        envio.almacen_id = envio.almacen_id || envio.almacenEntity?.id;
        
        // 🚨 Verificación de datos obligatorios
        if (!envio.cantidad || !envio.fecha_registro || !envio.fecha_entrega ||
            !envio.almacen_id || !envio.precio_envio || 
            !envio.placa_vehiculo || !envio.numero_rastreo || 
            !envio.clienteEntity?.id || !envio.productoEntity?.id) {

            console.error("❌ Error: Datos faltantes o incorrectos");
            console.log("❓ Datos actuales recibidos:", envio);
            throw new Error("Datos incorrectos");
        }

        // 🔍 Buscar cliente en la base de datos
        console.log("🔍 Buscando cliente con ID:", envio.clienteEntity.id);
        let cliente = await clienteRepositorio.detalle(envio.clienteEntity.id);

        // Validar si `detalle()` devolvió un array vacío
        if (Array.isArray(cliente) && cliente.length > 0) {
            cliente = cliente[0];
        }

        if (!cliente || typeof cliente !== "object") {
            throw new Error("Cliente no encontrado");
        }
        console.log("✅ Cliente encontrado:", cliente);

        // 🔍 Buscar producto en la base de datos
        console.log("🔍 Buscando producto con ID:", envio.productoEntity.id);
        let producto = await productoRepositorio.detalle(envio.productoEntity.id);

        // Validar si `detalle()` devolvió un array vacío
        if (Array.isArray(producto) && producto.length > 0) {
            producto = producto[0];
        }

        if (!producto || typeof producto !== "object") {
            throw new Error("Producto no encontrado");
        }
        console.log("✅ Producto encontrado:", producto);

        // 🔑 Generar ID único
        envio.idEnvioTerrestre = crypto.randomUUID();
        envio.clienteEntity = cliente; // 🔥 Aseguramos que es un objeto válido
        envio.productoEntity = producto; // 🔥 Aseguramos que es un objeto válido

        // 📌 **Nuevo Debug: Ver estructura final antes de guardar**
        console.log("🔍 Envío listo para insertar en DB:", envio);

        // 📦 Guardar en la base de datos
        await envioTerrestreRepositorio.crear(envio);

        console.log("✅ Envío terrestre creado correctamente");
        return envio;
    } catch (error) {
        console.error("❌ Error al crear el envío terrestre:", error.message);
        throw new Error(error.message);
    }
};

const leerEnviosTerrestres = async () => {
    const envios = await envioTerrestreRepositorio.leer();
    
    console.log("Datos obtenidos de la BD:", envios); // Depuración
    
    return envios.map(envio => new EnvioTerrestreDatosResModel({
        id_envio: envio.id_envio,
        cliente: envio.cliente_id ? {
            id: envio.cliente_id,
            nombre: envio.cliente_nombre,
            email: envio.cliente_email,
            telefono: envio.cliente_telefono,
            direccion: envio.cliente_direccion
        } : null,
        producto: envio.producto_id ? {
            id: envio.producto_id,
            nombre: envio.producto_nombre,
            descripcion: envio.producto_descripcion,
            precio: envio.producto_precio
        } : null,
        cantidad: envio.cantidad,
        fecha_registro: envio.fecha_registro,
        fecha_entrega: envio.fecha_entrega,
        almacen: envio.almacen_id ? {
            id: envio.almacen_id,
            nombre: envio.almacen_nombre,
            ubicacion: envio.almacen_ubicacion
        } : null,
        precio_envio: envio.precio_envio,
        descuento: envio.descuento,
        precio_final: envio.precio_final,
        placa_vehiculo: envio.placa_vehiculo,
        numero_rastreo: envio.numero_rastreo
    }));
};

const detalleEnvioTerrestre = (id) => envioTerrestreRepositorio.detalle(id);

export default { crearEnvioTerrestre, leerEnviosTerrestres, detalleEnvioTerrestre };
