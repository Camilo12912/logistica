import respuestasHttp from "../utils/respuestasHttp.js";
import puertoServicio from "../services/puertoService.js";
import { PuertoCrearReqModel, PuertoLeerDatosResModel } from "../models/puertoModel.js";

const postPuerto = (req, res) => {
    puertoServicio.crearPuerto(new PuertoCrearReqModel(req.body), req.user.sub)
        .then(puerto => {
            respuestasHttp.exito(req, res, new PuertoLeerDatosResModel(puerto), 201);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al crear el puerto", 400);
        });
};

const getPuerto = (req, res) => {
    puertoServicio.leerPuertos()
        .then(array => {
            let puertos = array.map(puerto => new PuertoLeerDatosResModel(puerto));
            respuestasHttp.exito(req, res, puertos, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al obtener los puertos", 500);
        });
};

export default { postPuerto, getPuerto };
