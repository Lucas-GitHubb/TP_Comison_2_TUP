import api from "./AppRequest";

const serviciosAPI = {
  crear(data) {
    return api.post("/servicios", data);
  },

  listar() {
    return api.get("/servicios");
  },

  obtener(id) {
    return api.get(`/servicios/${id}`);
  },

  actualizar(id, data) {
    return api.put(`/servicios/${id}`, data);
  },
  eliminar(id) {
    return api.delete(`/servicios/${id}`);
  }
};

export default serviciosAPI;
