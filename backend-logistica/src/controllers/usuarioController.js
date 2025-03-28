import usuarioService from "../services/usuarioService.js";
import respuestasHttp from "../utils/respuestasHttp.js";

const registrarUsuario = (req, res) => {
    usuarioService.registrarUsuario(req.body)
        .then((usuario) => respuestasHttp.exito(req, res, usuario, 201))
        .catch((err) => respuestasHttp.error(req, res, err, "Error al registrar usuario", 400));
};

export default { registrarUsuario };
