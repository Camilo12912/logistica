import respuestasHttp from "../utils/respuestasHttp.js";
import productoServicio from "../services/productoServicio.js";
import { ProductoCrearReqModel, ProductoLeerDatosResModel } from "../models/productoModel.js";

const postProducto = (req, res) => {
    productoServicio.crearProducto(new ProductoCrearReqModel(req.body), req.user.sub)
        .then(producto => {
            respuestasHttp.exito(req, res, new ProductoLeerDatosResModel(producto), 201);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al crear el producto", 400);
        });
};

const getProducto = (req, res) => {
    productoServicio.leerProductos()
        .then(array => {
            let productos = array.map(producto => new ProductoLeerDatosResModel(producto));
            respuestasHttp.exito(req, res, productos, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al obtener los productos", 500);
        });
};

const getDetalleProducto = (req, res) => {
    productoServicio.detalleProducto(req.params.id)
        .then(producto => {
            respuestasHttp.exito(req, res, new ProductoLeerDatosResModel(producto), 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al obtener el detalle del producto", 500);
        });
};

export default { postProducto, getProducto, getDetalleProducto };
