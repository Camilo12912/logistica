import { ClienteLeerDatosResModel } from "./clienteModel.js";
import { ProductoDatosResModel } from "./productoModel.js";
import { PuertoDatosResModel } from "./puertoModel.js";

function EnvioMaritimoCrearReqModel(envio) {
    this.cliente_id = envio.cliente_id;
    this.producto_id = envio.producto_id;
    this.cantidad = envio.cantidad;
    this.fecha_registro = envio.fecha_registro;
    this.fecha_entrega = envio.fecha_entrega;
    this.precio_envio = envio.precio_envio;
    this.descuento = envio.descuento;
    this.precio_final = envio.precio_final;
    this.puerto_id = envio.puerto_id;
    this.numero_flota = envio.numero_flota;
    this.numero_guia = envio.numero_guia;
}

function EnvioMaritimoDatosResModel(envio) {
    this.idEnvio = envio.idEnvio;
    this.cliente = envio.cliente ? new ClienteLeerDatosResModel(envio.cliente) : null;
    this.producto = envio.producto ? new ProductoDatosResModel(envio.producto) : null;
    this.cantidad = envio.cantidad;
    this.fecha_registro = envio.fecha_registro;
    this.fecha_entrega = envio.fecha_entrega;
    this.puerto = envio.puerto ? new PuertoDatosResModel(envio.puerto): null;
    this.precio_envio = envio.precio_envio;
    this.descuento = envio.descuento;
    this.precio_final = envio.precio_final;
    this.numero_flota = envio.numero_flota;
    this.numero_guia = envio.numero_guia;
}

export { EnvioMaritimoCrearReqModel, EnvioMaritimoDatosResModel };
