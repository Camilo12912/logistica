import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

const EnviosTerrestres = () => {
  const [envios, setEnvios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/envios-terrestres")
      .then(response => setEnvios(response.data))
      .catch(error => console.error("Error al obtener envíos", error));
  }, []);

  return (
    <div className="bg-dark text-light vh-100">
      <Container className="mt-5">
        <h2>Envíos Terrestres</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Fecha Registro</th>
              <th>Fecha Entrega</th>
              <th>Destino</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {envios.map(envio => (
              <tr key={envio.id}>
                <td>{envio.id}</td>
                <td>{envio.cliente_id}</td>
                <td>{envio.producto_id}</td>
                <td>{envio.cantidad}</td>
                <td>{envio.fecha_registro}</td>
                <td>{envio.fecha_entrega}</td>
                <td>{envio.destino}</td>
                <td>{envio.precio_envío}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success">Agregar Envío</Button>
      </Container>
    </div>
  );
};

export default EnviosTerrestres;
