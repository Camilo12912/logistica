function AlmacenCrearReqModel(almacen) {
    this.nombre = almacen.nombre;
    this.ubicacion = almacen.ubicacion;
}

function AlmacenDatosResModel(almacen) {
    this.id_almacen = almacen.id_almacen;
    this.nombre = almacen.nombre;
    this.ubicacion = almacen.ubicacion;
}

export { AlmacenCrearReqModel, AlmacenDatosResModel };