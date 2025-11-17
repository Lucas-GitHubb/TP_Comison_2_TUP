import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black custom-navbar fixed-top">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Sistema De Turnos
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-4">

            <li className="nav-item">
              <Link className="nav-link" to="/clientes">
                Clientes
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/servicios">
                Servicios
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/turnos">
                Turnos
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
