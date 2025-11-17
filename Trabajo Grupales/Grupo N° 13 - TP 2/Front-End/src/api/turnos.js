import api from "./AppRequest";

const turnosAPI = {
  crear(data) {
    return api.post("/turnos", data);
  },

  listar(fecha) {
    const query = fecha ? `?fecha=${fecha}` : "";
    return api.get(`/turnos${query}`);
  },

  obtener(id) {
    return api.get(`/turnos/${id}`);
  },

  cambiarEstado(id, estado) {
    return api.patch(`/turnos/${id}/estado`, { estado });
  },

  reprogramar(id, data) {
    return api.put(`/turnos/${id}`, data);
  },

  historialPorCliente(cliente_id) {
    return api.get(`/turnos/cliente/${cliente_id}`);
  },
};

export default turnosAPI;
