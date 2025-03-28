class ClienteCrearReqModel {
    constructor(cliente) {
        this.nombre = cliente.nombre;
        this.email = cliente.email;
        this.telefono = cliente.telefono;
        this.direccion = cliente.direccion;
    }
}

class ClienteLeerDatosResModel {
    constructor(cliente) {
        if (!cliente) {
            throw new Error("El objeto cliente es undefined");
        }

        this.id = cliente.id || null; 
        this.nombre = cliente.nombre || "Desconocido";
        this.email = cliente.email || "No disponible";
        this.telefono = cliente.telefono || "No registrado";
        this.direccion = cliente.direccion || "No registrada";
    }
}

export { ClienteCrearReqModel, ClienteLeerDatosResModel };
