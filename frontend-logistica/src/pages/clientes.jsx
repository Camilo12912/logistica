import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/clientes")
      .then(response => setClientes(response.data))
      .catch(error => console.error("Error al obtener clientes", error));
  }, []);

  return (
    <div className="bg-dark text-light vh-100">
      <Container className="mt-5">
        <h2>Clientes</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="success">Agregar Cliente</Button>
      </Container>
    </div>
  );
};

export default Clientes;
