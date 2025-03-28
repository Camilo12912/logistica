function ProductoCrearReqModel(producto) {
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.stock = producto.stock;
}

function ProductoDatosResModel(producto) {
    this.id_producto = producto.id_producto;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.stock = producto.stock;
}

export { ProductoCrearReqModel, ProductoDatosResModel };