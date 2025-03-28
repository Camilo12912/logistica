import mysql from "mysql2/promise";
import { variables } from "../src/utils/variables.js";

export async function conectar() {
    try {
        const conexion = await mysql.createConnection({
            host: variables.DB_HOST,
            user: variables.DB_USER,
            password: variables.DB_PASSWORD,
            database: variables.DB_NAME
        });
        console.log("✅ Conexión a la base de datos establecida.");
        return conexion;
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error);
        process.exit(1);
    }
}
