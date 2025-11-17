import Navbar from "./components/navbar/navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Cliente from "./pages/clientes/Clientes";
import Servicios from "./pages/servicios/Servicios";
import Turnos from "./pages/turnos/Turnos";

function App() {
  return (
    <>
      <Navbar />

      <div style={{ marginTop: "90px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Cliente />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/turnos" element={<Turnos />} />
          {/* Agregarás Servicios y Turnos después */}
        </Routes>
      </div>
    </>
  );
}

export default App;
