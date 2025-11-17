import { useEffect, useState } from "react";
import serviciosAPI from "../../api/servicios";
import "bootstrap/dist/css/bootstrap.min.css";

import ModalExito from "../../components/common/ModalExito";
import ModalEliminar from "../../components/common/ModalEliminar";
import ModalActualizado from "../../components/common/ModalActualizado";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    duracion_min: "",
  });

  const [error, setError] = useState(null);

  // Edit
  const [editMode, setEditMode] = useState(false);
  const [servicioEdit, setServicioEdit] = useState({
    id: null,
    nombre: "",
    precio: "",
    duracion_min: "",
  });

  // MODALES
  const [modalExito, setModalExito] = useState({ show: false, mensaje: "" });
  const [modalEliminar, setModalEliminar] = useState({ show: false, id: null });
  const [modalActualizado, setModalActualizado] = useState({ show: false, mensaje: "" });

  function mostrarExito(msg) {
    setModalExito({ show: true, mensaje: msg });
  }

  useEffect(() => {
    cargarServicios();
  }, []);

  async function cargarServicios() {
    try {
      const data = await serviciosAPI.listar();
      setServicios(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Error al cargar servicios");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function crearServicio(e) {
    e.preventDefault();
    try {
      if (!form.nombre.trim()) return;

      await serviciosAPI.crear({
        nombre: form.nombre,
        precio: Number(form.precio),
        duracion_min: Number(form.duracion_min),
      });

      setForm({ nombre: "", precio: "", duracion_min: "" });
      setError(null);
      cargarServicios();

      mostrarExito("Servicio creado correctamente");

    } catch (err) {
      setError(err.message || "Error al crear servicio");
    }
  }

  function abrirModal(servicio) {
    setServicioEdit(servicio);
    setEditMode(true);
  }

  async function actualizarServicio() {
    try {
      await serviciosAPI.actualizar(servicioEdit.id, {
        nombre: servicioEdit.nombre,
        precio: Number(servicioEdit.precio),
        duracion_min: Number(servicioEdit.duracion_min),
      });

      setEditMode(false);
      setError(null);
      cargarServicios();

      setModalActualizado({
        show: true,
        mensaje: "Servicio actualizado correctamente",
      });

    } catch (err) {
      setError(err.message || "Error al actualizar servicio");
    }
  }

  function confirmarEliminar(id) {
    setModalEliminar({ show: true, id });
  }

  async function eliminarServicioConfirmado() {
    try {
      await serviciosAPI.eliminar(modalEliminar.id);
      setModalEliminar({ show: false, id: null });
      cargarServicios();
      setError(null);

      mostrarExito("Servicio eliminado correctamente");

    } catch (err) {
      setError(err.message || "Error al eliminar servicio");
    }
  }

  const serviciosFiltrados = servicios.filter((s) =>
    s.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="servicios-container container mt-4">

      <ModalExito
        show={modalExito.show}
        mensaje={modalExito.mensaje}
        onClose={() => setModalExito({ show: false, mensaje: "" })}
      />

      <ModalEliminar
        show={modalEliminar.show}
        mensaje="¿Seguro que deseas eliminar este servicio?"
        onClose={() => setModalEliminar({ show: false, id: null })}
        onConfirm={eliminarServicioConfirmado}
      />

      <ModalActualizado
        show={modalActualizado.show}
        mensaje={modalActualizado.mensaje}
        onClose={() => setModalActualizado({ show: false, mensaje: "" })}
      />

      {/* ALERTA DE ERROR */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* FORM CREAR */}
      <div className="card p-3 mb-4 shadow-sm">
        <h4>Crear Servicio</h4>

        <form onSubmit={crearServicio}>
          <div className="row">
            <div className="col-md-4 mb-2">
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Nombre del servicio"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                type="number"
                name="precio"
                className="form-control"
                placeholder="Precio"
                value={form.precio}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                type="number"
                name="duracion_min"
                className="form-control"
                placeholder="Duración (minutos)"
                value={form.duracion_min}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-dark mt-2">Crear</button>
        </form>
      </div>

      {/* BUSCADOR */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar servicios por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* LISTA */}
      <div className="card p-3 shadow-sm">
        <h4>Lista de Servicios</h4>

        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Duración (min)</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {serviciosFiltrados.map((serv) => (
              <tr key={serv.id}>
                <td>{serv.id}</td>
                <td>{serv.nombre}</td>
                <td>${serv.precio}</td>
                <td>{serv.duracion_min} min</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => abrirModal(serv)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmarEliminar(serv.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {serviciosFiltrados.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL EDITAR */}
      {editMode && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Editar Servicio</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditMode(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={servicioEdit.nombre}
                  onChange={(e) =>
                    setServicioEdit({ ...servicioEdit, nombre: e.target.value })
                  }
                />

                <input
                  type="number"
                  className="form-control mb-2"
                  value={servicioEdit.precio}
                  onChange={(e) =>
                    setServicioEdit({ ...servicioEdit, precio: e.target.value })
                  }
                />

                <input
                  type="number"
                  className="form-control mb-2"
                  value={servicioEdit.duracion_min}
                  onChange={(e) =>
                    setServicioEdit({
                      ...servicioEdit,
                      duracion_min: e.target.value,
                    })
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

                <button className="btn btn-success" onClick={actualizarServicio}>
                  Guardar Cambios
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
