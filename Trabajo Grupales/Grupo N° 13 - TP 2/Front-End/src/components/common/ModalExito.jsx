import "bootstrap/dist/css/bootstrap.min.css";

export default function ModalExito({ show, mensaje, onClose }) {
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

      <div className="modal-header bg-success text-white">
        <h5 className="modal-title">Operación exitosa</h5>
        <button className="btn-close" onClick={onClose}></button>
      </div>

      <div className="modal-body">
        <p className="mb-0">{mensaje}</p>
      </div>

      <div className="modal-footer">
        <button className="btn btn-success" onClick={onClose}>
          Aceptar
        </button>
      </div>

    </div>
  </div>
</div>


);
}