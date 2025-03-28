import { conectar } from "../conexionDB.js";

const crear = (producto) => {
    conectar.query(
        "INSERT INTO productos SET ?",
        { nombre: producto.nombre, tipo: producto.tipo, descripcion: producto.descripcion },
        (err, results) => {
            if (err) {
                console.error("Error al crear el producto:", err);
            } else {
                console.log("Producto creado con éxito");
            }
        }
    );
};

const leer = () => {
    return new Promise((resolve, reject) => {
        conectar.query("SELECT * FROM productos", (err, results) => {
            if (err) {
                console.error("Error al obtener los productos", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const detalle = async (id) => {
    try {
        const conexion = await conectar(); // Conéctate a la BD
        const [rows] = await conexion.query("SELECT * FROM productos WHERE id = ?", [id]);
        await conexion.end(); // Cierra la conexión después de la consulta
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("❌ Error al buscar producto:", error);
        return null;
    }
};



export default { crear, leer, detalle };
