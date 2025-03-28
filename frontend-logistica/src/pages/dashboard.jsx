import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Recuperar token desde localStorage o sessionStorage
        const token = localStorage.getItem("token"); // O sessionStorage.getItem("token");

        if (!token) {
          throw new Error("No hay token disponible");
        }
        console.log("Token en uso:", token);
        // Hacer la petición con el token en los headers
        const response = await axios.get("http://localhost:3000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Asegurar que el token se envía correctamente
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error("Error al verificar el usuario", err);
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {user ? <p>Bienvenido, {user.name}</p> : <p>Cargando usuario...</p>}
    </div>
  );
};

export default Dashboard;
