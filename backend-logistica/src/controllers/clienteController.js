import respuestasHttp from "../utils/respuestasHttp.js";
import clienteService from "../services/clienteService.js";
import { ClienteCrearReqModel, ClienteLeerDatosResModel  } from "../models/clienteModel.js";

const postCliente = (req, res) => {
    clienteService.crearCliente(new ClienteCrearReqModel(req.body), req.user.sub)
        .then(cliente => {
            respuestasHttp.exito(req, res, new ClienteLeerDatosResModel(cliente), 201);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al crear el cliente", 400);
        });
};

const getCliente = (req, res) => {
    clienteService.leerClientes()
        .then(array => {
            let clientes = array.map(cliente => new ClienteLeerDatosResModel(cliente));
            respuestasHttp.exito(req, res, clientes, 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al obtener los clientes", 500);
        });
};

const getDetalleCliente = (req, res) => {
    clienteService.detalleCliente(req.params.id)
        .then(cliente => {
            respuestasHttp.exito(req, res, new ClienteLeerDatosResModel(cliente), 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al obtener el detalle del cliente", 500);
        });
};


const deleteCliente = (req, res) => {
    clienteService.eliminarCliente(req.params.id, req.user.sub)
        .then(() => {
            respuestasHttp.exito(req, res, "Cliente eliminado con éxito", 200);
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "No se pudo eliminar el cliente", 400);
        });
};

export default { postCliente, getCliente, getDetalleCliente,  deleteCliente };
