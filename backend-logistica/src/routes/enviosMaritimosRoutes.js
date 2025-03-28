import express from 'express';
import envioMaritimoController from '../controllers/envioMaritimoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const enviosMaritimosRoutes = express.Router();

enviosMaritimosRoutes.post("/", authMiddleware, envioMaritimoController.postEnvioMaritimo);
enviosMaritimosRoutes.get("/", authMiddleware, envioMaritimoController.getEnvioMaritimo);


export default enviosMaritimosRoutes;
