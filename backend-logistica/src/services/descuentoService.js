import descuentoRepositorio from "../db/repositorios/descuentoRepositorio.js";
import envioRepositorio from "../db/repositorios/envioRepositorio.js";
import crypto from "crypto";

const aplicarDescuento = (idEnvio, porcentaje) => {
    return new Promise(async (resolver, rechazar) => {
        if (!idEnvio || porcentaje <= 0 || porcentaje > 100) {
            rechazar("Datos incorrectos");
        } else {
            const envio = await envioRepositorio.detalle(idEnvio);
            if (!envio) {
                rechazar("El envío no existe");
            } else {
                const descuento = (envio.tarifa * porcentaje) / 100;
                envio.tarifa -= descuento;

                await envioRepositorio.actualizar(envio);
                resolver({ idEnvio, descuentoAplicado: descuento, nuevaTarifa: envio.tarifa });
            }
        }
    });
};

const listarDescuentos = () => {
    return new Promise((resolver) => {
        resolver(descuentoRepositorio.leer());
    });
};

export default { aplicarDescuento, listarDescuentos };
