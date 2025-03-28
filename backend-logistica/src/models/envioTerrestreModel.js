import { ClienteLeerDatosResModel } from "./clienteModel.js";
import { ProductoDatosResModel } from "./productoModel.js";
import { AlmacenDatosResModel } from "./almacenModel.js";

class EnvioTerrestreCrearReqModel {
    constructor({ cantidad, fecha_registro, fecha_entrega, almacen_id, precio_envio, placa_vehiculo, numero_rastreo, clienteEntity, productoEntity }) {
        this.cantidad = cantidad;
        this.fecha_registro = fecha_registro;
        this.fecha_entrega = fecha_entrega;
        this.almacen_id = almacen_id;
        this.precio_envio = precio_envio;
        this.placa_vehiculo = placa_vehiculo;
        this.numero_rastreo = numero_rastreo;
        this.clienteEntity = clienteEntity;
        this.productoEntity = productoEntity;
    }
}

function EnvioTerrestreDatosResModel(envio) {
    this.id_envio = envio.id_envio;
    this.cliente = envio.cliente ? new ClienteLeerDatosResModel(envio.cliente) : null;
    this.producto = envio.producto ? new ProductoDatosResModel(envio.producto) : null;
    this.almacen = envio.almacen ? new AlmacenDatosResModel(envio.almacen) : null;
    this.cantidad = envio.cantidad;
    this.fecha_registro = envio.fecha_registro;
    this.fecha_entrega = envio.fecha_entrega;
    this.precio_envio = envio.precio_envio;
    this.descuento = envio.descuento;
    this.precio_final = envio.precio_final;
    this.placa_vehiculo = envio.placa_vehiculo;
    this.numero_rastreo = envio.numero_rastreo;
}


export { EnvioTerrestreCrearReqModel, EnvioTerrestreDatosResModel };