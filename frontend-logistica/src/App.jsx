import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/dashboard.jsx";
import EnviosMaritimos from "./pages/enviosMaritimos.jsx";
import EnviosTerrestres from "./pages/enviosTerrestres.jsx";
import Clientes from "./pages/clientes.jsx";
import "./styles/sidebar.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="envios-maritimos" element={<EnviosMaritimos />} />
          <Route path="envios-terrestres" element={<EnviosTerrestres />} />
          <Route path="clientes" element={<Clientes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
