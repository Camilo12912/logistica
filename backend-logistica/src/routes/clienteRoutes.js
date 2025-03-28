import express from 'express';
import clienteController from '../controllers/clienteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const clienteRoutes = express.Router();

clienteRoutes.post("/", authMiddleware, clienteController.postCliente);
clienteRoutes.get("/", authMiddleware, clienteController.getCliente);
clienteRoutes.get("/:id", authMiddleware, clienteController.getDetalleCliente);
clienteRoutes.delete("/:id", authMiddleware, clienteController.deleteCliente);

export default clienteRoutes;
