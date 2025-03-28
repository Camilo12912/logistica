import { conectar  } from "../conexionDB.js";

const crear = (almacen) => {
    conectar.query(
        "INSERT INTO almacenes SET ?",
        { nombre: almacen.nombre, ubicacion: almacen.ubicacion },
        (err, results) => {
            if (err) {
                console.error("Error al crear el almacén:", err);
            } else {
                console.log("Almacén creado con éxito");
            }
        }
    );
};


const leer = () => {
    return new Promise((resolve, reject) => {
        conectar.query("SELECT * FROM almacenes", (err, results) => {
            if (err) {
                console.error("Error al obtener los almacenes", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

export default { crear, leer };
