import express from 'express';
import envioTerrestreController from '../controllers/envioTerrestreController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const enviosTerrestresRoutes = express.Router();

enviosTerrestresRoutes.post("/", authMiddleware, envioTerrestreController.postEnvioTerrestre);
enviosTerrestresRoutes.get("/", authMiddleware, envioTerrestreController.getEnvioTerrestre);
enviosTerrestresRoutes.get("/:id", authMiddleware, envioTerrestreController.getDetalleEnvioTerrestre);
enviosTerrestresRoutes.put("/:id", authMiddleware, envioTerrestreController.putEnvioTerrestre);
enviosTerrestresRoutes.delete("/:id", authMiddleware, envioTerrestreController.deleteEnvioTerrestre);

export default enviosTerrestresRoutes;