// Convierte una fecha ISO a "YYYY-MM-DD"
export function toFechaISO(date) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

// Convierte una fecha-hora ISO a "HH:mm"
export function toHoraHM(date) {
  if (!date) return "";
  const d = new Date(date);
  const h = d.getHours().toString().padStart(2, "0");
  const m = d.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

// Combina fecha + hora en un Date (por si lo necesitás del lado del front)
export function combinarFechaYHora(fecha, hora) {
  const [h, m] = hora.split(":").map(Number);
  const d = new Date(fecha);
  d.setHours(h);
  d.setMinutes(m);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}
