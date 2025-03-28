import puertoRepositorio from "../db/repositorios/puertoRepositorio.js";
import crypto from "crypto";

const crearPuerto = (puerto) => {
    return new Promise(async (resolver, rechazar) => {
        if (!puerto.nombre || !puerto.ubicacion) {
            rechazar("Datos incorrectos");
        } else {
            puerto.idPuerto = crypto.randomUUID();
            await puertoRepositorio.crear(puerto);
            resolver(puerto);
        }
    });
};

const leerPuertos = () => {
    return new Promise((resolver) => {
        resolver(puertoRepositorio.leer());
    });
};

const detallePuerto = (id) => {
    return new Promise((resolver) => {
        resolver(puertoRepositorio.detalle(id));
    });
};

export default { crearPuerto, leerPuertos, detallePuerto };
