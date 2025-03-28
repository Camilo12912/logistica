import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login enviado:", { email, password });
  
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      console.log("Respuesta del backend:", response.data); 
  
      // Acceder al token correctamente si está dentro de body
      const token = response.data.body?.token;
      
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        console.error("No se recibió un token válido");
      }
    } catch (error) {
      console.error("Error de inicio de sesión", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Iniciar Sesión</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Iniciar sesión</Button>
      </Form>
    </Container>
  );
};

export default Login;
