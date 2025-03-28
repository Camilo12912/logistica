import respuestasHttp from "../utils/respuestasHttp.js";
import almacenServicio from "../services/almacenServicio.js";
import { AlmacenCrearReqModel, AlmacenLeerDatosResModel } from "../models/almacenModel.js";

const postAlmacen = (req, res) => {
    almacenServicio.crearAlmacen(new AlmacenCrearReqModel(req.body), req.user.sub)
        .then(almacen => {
            respuestasHttp.exito(req, res, new AlmacenLeerDatosResModel(almacen), 201);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al crear el almacén", 400);
        });
};

const getAlmacen = (req, res) => {
    almacenServicio.leerAlmacenes()
        .then(array => {
            let almacenes = array.map(almacen => new AlmacenLeerDatosResModel(almacen));
            respuestasHttp.exito(req, res, almacenes, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al obtener los almacenes", 500);
        });
};

export default { postAlmacen, getAlmacen };
