import respuestasHttp from "../utils/respuestasHttp.js";
import envioTerrestreService  from "../services/envioTerrestreService.js";
import { EnvioTerrestreCrearReqModel, EnvioTerrestreDatosResModel } from "../models/envioTerrestreModel.js";

export const postEnvioTerrestre = async (req, res) => {
    try {
        console.log("✅ Cuerpo de la petición recibido:", req.body);
        const envio = await envioTerrestreService.crearEnvioTerrestre(req.body);
        res.status(201).json(envio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getEnvioTerrestre = (req, res) => {
    envioTerrestreService.leerEnviosTerrestres()
        .then(array => {
            let envios = array.map(envio => new EnvioTerrestreDatosResModel(envio));
            respuestasHttp.exito(req, res, envios, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al obtener los envíos terrestres", 500);
        });
};

const getDetalleEnvioTerrestre = (req, res) => {
    const { id } = req.params;
    envioTerrestreService.detalleEnvioTerrestre(id)
        .then(envio => {
            if (!envio) {
                return respuestasHttp.error(req, res, "Envío terrestre no encontrado", 404);
            }
            respuestasHttp.exito(req, res, new EnvioTerrestreDatosResModel(envio), 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al obtener el envío terrestre", 500);
        });
};

const putEnvioTerrestre = (req, res) => {
    const { id } = req.params;
    const datosActualizados = new EnvioTerrestreCrearReqModel(req.body);
    
    envioTerrestreService.actualizarEnvio(id, datosActualizados)
        .then(envioActualizado => {
            if (!envioActualizado) {
                return respuestasHttp.error(req, res, "Envío terrestre no encontrado", 404);
            }
            respuestasHttp.exito(req, res, new EnvioTerrestreDatosResModel(envioActualizado), 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al actualizar el envío terrestre", 500);
        });
};

const deleteEnvioTerrestre = (req, res) => {
    const { id } = req.params;
    
    envioTerrestreService.eliminarEnvio(id)
        .then(resultado => {
            if (!resultado) {
                return respuestasHttp.error(req, res, "Envío terrestre no encontrado", 404);
            }
            respuestasHttp.exito(req, res, { mensaje: "Envío terrestre eliminado correctamente" }, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al eliminar el envío terrestre", 500);
        });
};

export default {
    postEnvioTerrestre,
    getEnvioTerrestre, 
    getDetalleEnvioTerrestre,
    putEnvioTerrestre,
    deleteEnvioTerrestre
};