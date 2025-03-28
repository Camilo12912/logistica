import articuloRepositorio from "../db/repositorios/articuloRepositorio.js";
import crypto from "crypto";

const crearArticulo = (articulo) => {
    return new Promise(async (resolver, rechazar) => {
        if (!articulo.nombre || !articulo.tarifa || !articulo.codigo) {
            rechazar("Datos incorrectos");
        } else {
            const puc = await pucRepositorio.detalle(articulo.codigo);
            const sucursal = await sucursalRepositorio.detalle(articulo.idSucursal);

            articulo.idArticulo = crypto.randomUUID();
            articulo.pucEntity = puc[0];
            articulo.sucursalEntity = sucursal[0];

            await articuloRepositorio.crear(articulo);
            resolver(articulo);
        }
    });
};

const leerArticulo = () => {
    return new Promise((resolver) => {
        resolver(articuloRepositorio.leer());
    });
};

const detalleArticulo = (id) => {
    return new Promise((resolver) => {
        resolver(articuloRepositorio.detalle(id));
    });
};

const actualizarArticulo = (id, articulo) => {
    return new Promise(async (resolver, rechazar) => {
        if (!articulo.nombre || !articulo.tarifa || !articulo.codigo) {
            rechazar("Datos incorrectos");
        }

        const articuloDetalle = await articuloRepositorio.detalle(id);

        articuloDetalle.nombre = articulo.nombre;
        articuloDetalle.tarifa = articulo.tarifa;
        articuloDetalle.codigo = articulo.codigo;

        const articuloActualizado = await articuloRepositorio.actualizar(articuloDetalle);
        resolver(articuloActualizado);
    });
};

const eliminarArticulo = (id) => {
    return new Promise((resolver) => {
        resolver(articuloRepositorio.eliminar(id));
    });
};

export default { crearArticulo, leerArticulo, detalleArticulo, actualizarArticulo, eliminarArticulo };
