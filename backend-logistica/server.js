import express from "express";
import { conectar } from "./db/conexionDB.js";
import { variables } from "./src/utils/variables.js";
import { configuracionSeguridad } from "./security/configuracionSeguridad.js";
import clienteRoutes from "./src/routes/clienteRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import enviosMaritimosRoutes from "./src/routes/enviosMaritimosRoutes.js";
import enviosTerrestresRoutes from "./src/routes/enviosTerrestresRoutes.js";
import cors from 'cors';


const app = express();
const PORT = variables.EXPRESS_PORT;
const HOST = variables.EXPRESS_HOST;

// Conectar a la base de datos
conectar();
app.use(cors({
    origin: 'http://localhost:5173',  // Solo permite este origen
    credentials: true  // Habilita el intercambio de credenciales
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configuracionSeguridad(app);

// Rutas de la aplicación
app.use("/api/clientes", clienteRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usuarioRoutes);
app.use("/api/envios-terrestres", enviosTerrestresRoutes);  // 📌 Rutas de envíos marítimos
app.use("/api/envios-maritimos", enviosMaritimosRoutes);  // 📌 Rutas de envíos terrestres

// Iniciar servidor
app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
});
