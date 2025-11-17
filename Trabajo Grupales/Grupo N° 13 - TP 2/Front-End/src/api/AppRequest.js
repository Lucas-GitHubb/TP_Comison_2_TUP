const BASE_URL = "http://localhost:3000";

class AppRequest {
  constructor(baseURL = BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      method: options.method || "GET",
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    const res = await fetch(this.baseURL + endpoint, config);

    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      const message =
        data?.error ||
        data?.message ||
        `Error HTTP ${res.status}`;
      const error = new Error(message);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  post(endpoint, body) {
    return this.request(endpoint, { method: "POST", body });
  }

  put(endpoint, body) {
    return this.request(endpoint, { method: "PUT", body });
  }

  patch(endpoint, body) {
    return this.request(endpoint, { method: "PATCH", body });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

const api = new AppRequest();
export default api;
