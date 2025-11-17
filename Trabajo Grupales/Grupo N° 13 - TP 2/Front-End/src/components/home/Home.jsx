import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";

export default function Home() {
  return (
    <div className="home-wrapper d-flex align-items-center justify-content-center">
      <div className="container text-center">

        <div className="card shadow-lg p-4 rounded-4 border-0" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div className="card-body">

            <h1 className="display-5 fw-bold mb-2 text-primary">
              Sistema de Gestión de Turnos
            </h1>

            <p className="text-muted fs-5 mb-4">
              Administrá clientes, servicios y reservas de forma simple y rápida.
            </p>

            <hr />

            <div className="mt-4">
              <p className="mb-4">
                Usá el menú para comenzar.  
                Podés crear clientes, gestionar servicios, cargar turnos y revisar el historial.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
