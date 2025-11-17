import "bootstrap/dist/css/bootstrap.min.css";

export default function ModalEliminar({ show, mensaje, onConfirm, onClose }) {
  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)"
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Confirmar eliminación</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <p>{mensaje}</p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Eliminar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
