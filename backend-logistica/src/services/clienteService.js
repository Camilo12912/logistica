import clienteRepositorio from '../../db/repositorios/clienteRepositorio.js';
import crypto from "crypto";

const crearCliente = async (clienteData, userId) => {
    if (!clienteData.nombre || !clienteData.email || !clienteData.telefono || !clienteData.direccion) {
        throw new Error("Datos incorrectos");
    }

    const cliente = {
        id: crypto.randomUUID(),  // Asegúrate de que en la BD el campo es `id`
        nombre: clienteData.nombre,
        email: clienteData.email,
        telefono: clienteData.telefono,
        direccion: clienteData.direccion,
        usuarioId: userId
    };

    return await clienteRepositorio.crear(cliente);
};

const leerClientes = async () => {
    return await clienteRepositorio.leer();
};

const detalleCliente = async (id) => {
    return await clienteRepositorio.detalle(id);
};

const eliminarCliente = async (id, userId) => {
    // Asegurar que solo el dueño pueda eliminar
    const cliente = await clienteRepositorio.detalle(id);
    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }
    if (cliente.usuarioId !== userId) {
        throw new Error("No tienes permisos para eliminar este cliente");
    }

    return await clienteRepositorio.eliminar(id);
};

export default { crearCliente, leerClientes, detalleCliente, eliminarCliente };
