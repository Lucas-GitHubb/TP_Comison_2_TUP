import api from "./AppRequest";

const clientesAPI = {
  crear(data) {
    return api.post("/clientes", data);
  },

  listar() {
    return api.get("/clientes");
  },

  obtener(id) {
    return api.get(`/clientes/${id}`);
  },

  actualizar(id, data) {
    return api.put(`/clientes/${id}`, data);
  },
  eliminar(id) {
    return api.delete(`/clientes/${id}`);
  },
  
};

export default clientesAPI;
