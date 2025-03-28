import authService from "../services/authService.js";
import respuestasHttp from "../utils/respuestasHttp.js";

const login = (req, res) => {
    const { email, password } = req.body;

    authService.login(email, password)
        .then((data) => respuestasHttp.exito(req, res, data, 200))
        .catch((err) => respuestasHttp.error(req, res, err, "Error en el inicio de sesión", 401));
};

const getUser = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No autorizado" });
    }

    try {
        const decoded = jwt.verify(token, variables.JWT_SECRET);
        res.json(decoded);  // Devuelve los datos del usuario
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
}

export default { login, getUser};
