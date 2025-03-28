import express from "express";
import usuarioController from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/register", usuarioController.registrarUsuario);

export default router;
