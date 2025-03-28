import jwt from "jsonwebtoken";
import { variables } from "../utils/variables.js";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, variables.JWT_SECRET);
        req.user = decoded; // Guarda los datos del usuario autenticado en req.user
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido" });
    }
};

export default authMiddleware;