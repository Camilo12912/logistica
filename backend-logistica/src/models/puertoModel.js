function PuertoCrearReqModel(puerto) {
    this.nombre = puerto.nombre;
    this.ubicacion = puerto.ubicacion;
}

function PuertoDatosResModel(puerto) {
    this.id_puerto = puerto.id_puerto;
    this.nombre = puerto.nombre;
    this.ubicacion = puerto.ubicacion;
}

export { PuertoCrearReqModel, PuertoDatosResModel };