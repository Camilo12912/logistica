import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShip, FaTruck, FaUsers, FaHome } from "react-icons/fa";
import { Navbar, Nav } from "react-bootstrap";
import "../styles/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate(); // Hook para redirecciones

  return (
    <Navbar bg="dark" variant="dark" className="sidebar d-flex flex-column p-3">
      <Navbar.Brand className="mb-4 text-light">🚛 Logística</Navbar.Brand>
      <Nav className="flex-column w-100">
        <Nav.Link onClick={() => navigate("/dashboard")} className="text-light">
          <FaHome className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/dashboard/envios-maritimos")} className="text-light">
          <FaShip className="me-2" /> Envíos Marítimos
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/dashboard/envios-terrestres")} className="text-light">
          <FaTruck className="me-2" /> Envíos Terrestres
        </Nav.Link>
        <Nav.Link onClick={() => navigate("/dashboard/clientes")} className="text-light">
          <FaUsers className="me-2" /> Clientes
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
