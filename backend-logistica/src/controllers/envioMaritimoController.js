import respuestasHttp from "../utils/respuestasHttp.js";
import envioMaritimoService from "../services/envioMaritimoService.js";
import { EnvioMaritimoCrearReqModel, EnvioMaritimoDatosResModel } from "../models/envioMaritimoModel.js";

const postEnvioMaritimo = async (req, res) => {
    
    try {
        const envio = new EnvioMaritimoCrearReqModel(req.body);
        console.log("📦 JSON recibido:", req.body);
        const nuevoEnvio = await envioMaritimoService.crearEnvioMaritimo(envio);
        
        respuestasHttp.exito(req, res, new EnvioMaritimoDatosResModel(nuevoEnvio), 201);
    } catch (err) {
        respuestasHttp.error(req, res, err, "❌ Error al crear el envío marítimo", 400);
    }
};

const getEnvioMaritimo = async (req, res) => {
    try {
        const envios = await envioMaritimoService.leerEnviosMaritimos();
        const response = envios.map(envio => new EnvioMaritimoDatosResModel(envio));

        respuestasHttp.exito(req, res, response, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "❌ Error al obtener los envíos marítimos", 500);
    }
};

export default {
    postEnvioMaritimo,
    getEnvioMaritimo,
};
