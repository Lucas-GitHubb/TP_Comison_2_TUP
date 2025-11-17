import { useState, useEffect } from "react";
import turnosAPI from "../../api/turnos";
import clientesAPI from "../../api/clientes";
import serviciosAPI from "../../api/servicios";
import { toFechaISO, toHoraHM } from "../../utils/time";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Turnos() {
  const [fecha, setFecha] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [turnos, setTurnos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);

  // Crear turno
  const [form, setForm] = useState({
    cliente_id: "",
    servicio_id: "",
    fecha: "",
    hora: "",
    observaciones: ""
  });

  // Modal Reprogramar
  const [editMode, setEditMode] = useState(false);
  const [turnoEdit, setTurnoEdit] = useState({
    id: null,
    fecha: "",
    hora: "",
    servicio_id: "",
    observaciones: ""
  });

  // Historial cliente
  const [historial, setHistorial] = useState([]);
  const [showHistorial, setShowHistorial] = useState(false);

  // ==========================
  // CARGA INICIAL
  // ==========================
  useEffect(() => {
    cargarTurnos();
    cargarClientes();
    cargarServicios();
  }, [fecha]);

  async function cargarTurnos() {
    try {
      const data = await turnosAPI.listar(fecha);
      setTurnos(data);
    } catch (error) {
      alert(error.message);
    }
  }

  async function cargarClientes() {
    try {
      const data = await clientesAPI.listar();
      setClientes(data);
    } catch (error) {
      alert(error.message);
    }
  }

  async function cargarServicios() {
    try {
      const data = await serviciosAPI.listar();
      setServicios(data);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function crearTurno(e) {
    e.preventDefault();

    if (!form.cliente_id || !form.servicio_id || !form.fecha || !form.hora) {
      alert("Faltan campos obligatorios");
      return;
    }

    try {
      await turnosAPI.crear({
        cliente_id: Number(form.cliente_id),
        servicio_id: Number(form.servicio_id),
        fecha: form.fecha,
        hora: form.hora, // ya viene como HH:mm
        observaciones: form.observaciones
      });

      setForm({
        cliente_id: "",
        servicio_id: "",
        fecha: "",
        hora: "",
        observaciones: ""
      });

      cargarTurnos();
    } catch (error) {
      alert(error.message);
    }
  }

  // ==========================
  // CAMBIAR ESTADO
  // ==========================
  async function cambiarEstado(id, estado) {
    try {
      await turnosAPI.cambiarEstado(id, estado);
      cargarTurnos();
    } catch (error) {
      alert(error.message);
    }
  }

  // ==========================
  // ABRIR MODAL EDITAR
  // ==========================
  function abrirModal(t) {
    setTurnoEdit({
      id: t.id,
      fecha: toFechaISO(t.fecha),
      hora: toHoraHM(t.hora),
      servicio_id: t.servicio_id,
      observaciones: t.observaciones || ""
    });

    setEditMode(true);
  }

  // ==========================
  // GUARDAR CAMBIOS (REPROGRAMAR)
  // ==========================
  async function guardarReprogramar() {
    try {
      await turnosAPI.reprogramar(turnoEdit.id, {
        fecha: turnoEdit.fecha,
        hora: turnoEdit.hora, // ya va con HH:mm gracias al modal y utils
        servicio_id: Number(turnoEdit.servicio_id),
        observaciones: turnoEdit.observaciones
      });

      setEditMode(false);
      cargarTurnos();
    } catch (error) {
      alert(error.message);
    }
  }

  // ==========================
  // HISTORIAL POR CLIENTE
  // ==========================
  async function verHistorial(cliente_id) {
    try {
      const data = await turnosAPI.historialPorCliente(cliente_id);
      setHistorial(data);
      setShowHistorial(true);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="container mt-4 turnos-container">

      {/* SELECCIÓN DE FECHA */}
      <div className="card p-3 shadow-sm mb-4">
        <h4>Turnos del día</h4>

        <input
          type="date"
          className="form-control mt-2"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
      </div>

      {/* FORM CREAR TURNOS */}
      <div className="card p-3 shadow-sm mb-4">
        <h4>Crear Turno</h4>

        <form onSubmit={crearTurno}>
          <div className="row">

            <div className="col-md-3 mb-2">
              <select
                name="cliente_id"
                className="form-control"
                value={form.cliente_id}
                onChange={handleChange}
              >
                <option value="">Seleccionar cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.nombre} {c.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3 mb-2">
              <select
                name="servicio_id"
                className="form-control"
                value={form.servicio_id}
                onChange={handleChange}
              >
                <option value="">Seleccionar servicio</option>
                {servicios.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2 mb-2">
              <input
                type="date"
                name="fecha"
                className="form-control"
                value={form.fecha}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-2 mb-2">
              <input
                type="time"
                name="hora"
                className="form-control"
                value={form.hora}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12 mb-2">
              <textarea
                name="observaciones"
                className="form-control"
                placeholder="Observaciones (opcional)"
                value={form.observaciones}
                onChange={handleChange}
              />
            </div>

          </div>

          <button className="btn btn-dark mt-2">Crear Turno</button>
        </form>
      </div>

      {/* LISTA DE TURNOS */}
      <div className="card p-3 shadow-sm">
        <h4>Turnos de {fecha}</h4>

        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {turnos.map(t => (
              <tr key={t.id}>
                <td>{t.clientes.nombre} {t.clientes.apellido}</td>
                <td>{t.servicios.nombre}</td>
                <td>{toHoraHM(t.hora)}</td>

                <td>
                  <span className={`badge bg-${
                    t.estado === "pendiente"
                      ? "warning"
                      : t.estado === "completado"
                      ? "success"
                      : "danger"
                  }`}>
                    {t.estado}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => abrirModal(t)}
                  >
                    Reprogramar
                  </button>

                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => cambiarEstado(t.id, "confirmado")}
                  >
                    Completar
                  </button>

                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => cambiarEstado(t.id, "cancelado")}
                  >
                    Cancelar
                  </button>

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => verHistorial(t.cliente_id)}
                  >
                    Historial
                  </button>
                </td>
              </tr>
            ))}

            {turnos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay turnos para esta fecha
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL REPROGRAMAR */}
      {editMode && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Reprogramar turno</h5>
                <button className="btn-close" onClick={() => setEditMode(false)}></button>
              </div>

              <div className="modal-body">
                <input
                  type="date"
                  className="form-control mb-2"
                  value={turnoEdit.fecha}
                  onChange={(e) =>
                    setTurnoEdit({ ...turnoEdit, fecha: e.target.value })
                  }
                />

                <input
                  type="time"
                  className="form-control mb-2"
                  value={turnoEdit.hora}
                  onChange={(e) =>
                    setTurnoEdit({ ...turnoEdit, hora: e.target.value })
                  }
                />

                <select
                  className="form-control mb-2"
                  value={turnoEdit.servicio_id}
                  onChange={(e) =>
                    setTurnoEdit({ ...turnoEdit, servicio_id: e.target.value })
                  }
                >
                  {servicios.map(s => (
                    <option key={s.id} value={s.id}>{s.nombre}</option>
                  ))}
                </select>

                <textarea
                  className="form-control"
                  placeholder="Observaciones"
                  value={turnoEdit.observaciones}
                  onChange={(e) =>
                    setTurnoEdit({ ...turnoEdit, observaciones: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cerrar
                </button>

                <button className="btn btn-success" onClick={guardarReprogramar}>
                  Guardar cambios
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* HISTORIAL */}
      {showHistorial && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Historial del cliente</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowHistorial(false)}
                ></button>
              </div>

              <div className="modal-body">
                {historial.length === 0 ? (
                  <p>No tiene historial</p>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Servicio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historial.map((h) => (
                        <tr key={h.id}>
                          <td>{toFechaISO(h.fecha)}</td>
                          <td>{toHoraHM(h.hora)}</td>
                          <td>{h.servicios.nombre}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
