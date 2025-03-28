import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./sidebar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        {/* Sidebar fijo en la izquierda */}
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>
        
        {/* Contenido principal ajustado sin desordenar */}
        <Col md={10} className="content p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
