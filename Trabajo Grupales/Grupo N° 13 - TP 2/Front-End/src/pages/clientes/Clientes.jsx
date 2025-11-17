import { useEffect, useState } from "react";
import clientesAPI from "../../api/clientes";
import "bootstrap/dist/css/bootstrap.min.css";

import ModalExito from "../../components/common/ModalExito";
import ModalActualizado from "../../components/common/ModalActualizado";
import ModalEliminar from "../../components/common/ModalEliminar";

export default function Cliente() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "" });

  const [error, setError] = useState(null);

  // Modal edición
  const [editMode, setEditMode] = useState(false);
  const [clienteEdit, setClienteEdit] = useState({
    id: null,
    nombre: "",
    telefono: "",
    email: ""
  });

  // Modal éxito
  const [modalExito, setModalExito] = useState({
    show: false,
    mensaje: ""
  });

  // Modal actualizado
  const [modalActualizado, setModalActualizado] = useState({
    show: false,
    mensaje: ""
  });

  // Modal eliminar
  const [modalEliminar, setModalEliminar] = useState({
    show: false,
    id: null,
    mensaje: ""
  });

  function mostrarExito(mensaje) {
    setModalExito({ show: true, mensaje });
  }

  function mostrarActualizado(mensaje) {
    setModalActualizado({ show: true, mensaje });
  }

  function pedirConfirmacionEliminar(id) {
    setModalEliminar({
      show: true,
      id,
      mensaje: "¿Seguro que deseas eliminar este cliente?"
    });
  }

  useEffect(() => {
    cargarClientes();
  }, []);

  async function cargarClientes() {
    try {
      const data = await clientesAPI.listar();
      setClientes(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Error desconocido al cargar clientes");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function crearCliente(e) {
    e.preventDefault();
    if (!form.nombre.trim()) return;

    try {
      await clientesAPI.crear(form);
      setForm({ nombre: "", telefono: "", email: "" });
      cargarClientes();
      mostrarExito("Cliente creado correctamente");
    } catch (err) {
      setError(err.message || "Error al crear cliente");
    }
  }

  function abrirModal(cliente) {
    setClienteEdit(cliente);
    setEditMode(true);
  }

  async function actualizarCliente() {
    try {
      await clientesAPI.actualizar(clienteEdit.id, clienteEdit);
      setEditMode(false);
      cargarClientes();
      mostrarActualizado("Cliente actualizado con éxito");
    } catch (err) {
      setError(err.message || "Error al actualizar cliente");
    }
  }

  // Confirmación del modal antes de borrar
  async function confirmarEliminar() {
    try {
      await clientesAPI.eliminar(modalEliminar.id);
      cargarClientes();
      setModalEliminar({ show: false, id: null, mensaje: "" });
      mostrarExito("Cliente eliminado correctamente");
    } catch (err) {
      setError(err.message || "Error al eliminar cliente");
    }
  }

  const clientesFiltrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-4">

      {/* ALERTA DE ERROR */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* FORMULARIO CREAR CLIENTE */}
      <div className="card p-3 mb-4 shadow-sm">
        <h4>Crear Cliente</h4>

        <form onSubmit={crearCliente}>
          <div className="row">
            <div className="col-md-4 mb-2">
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                type="text"
                name="telefono"
                className="form-control"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4 mb-2">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
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
          placeholder="Buscar cliente por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* LISTA DE CLIENTES */}
      <div className="card p-3 shadow-sm">
        <h4>Lista de Clientes</h4>

        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => abrirModal(cliente)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => pedirConfirmacionEliminar(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}

            {clientesFiltrados.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  Sin resultados
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
                <h5 className="modal-title">Editar Cliente</h5>
                <button className="btn-close" onClick={() => setEditMode(false)}></button>
              </div>

              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={clienteEdit.nombre}
                  onChange={(e) =>
                    setClienteEdit({ ...clienteEdit, nombre: e.target.value })
                  }
                  placeholder="Nombre"
                />

                <input
                  type="text"
                  className="form-control mb-2"
                  value={clienteEdit.telefono}
                  onChange={(e) =>
                    setClienteEdit({ ...clienteEdit, telefono: e.target.value })
                  }
                  placeholder="Teléfono"
                />

                <input
                  type="email"
                  className="form-control mb-2"
                  value={clienteEdit.email}
                  onChange={(e) =>
                    setClienteEdit({ ...clienteEdit, email: e.target.value })
                  }
                  placeholder="Email"
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cerrar
                </button>

                <button className="btn btn-success" onClick={actualizarCliente}>
                  Guardar cambios
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODALES */}
      <ModalExito
        show={modalExito.show}
        mensaje={modalExito.mensaje}
        onClose={() => setModalExito({ show: false, mensaje: "" })}
      />

      <ModalActualizado
        show={modalActualizado.show}
        mensaje={modalActualizado.mensaje}
        onClose={() => setModalActualizado({ show: false, mensaje: "" })}
      />

      <ModalEliminar
        show={modalEliminar.show}
        mensaje={modalEliminar.mensaje}
        onClose={() => setModalEliminar({ show: false, id: null, mensaje: "" })}
        onConfirm={confirmarEliminar}
      />

    </div>
  );
}
