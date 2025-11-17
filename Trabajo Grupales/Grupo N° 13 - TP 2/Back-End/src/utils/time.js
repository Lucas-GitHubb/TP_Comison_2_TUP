export const hoyISO = () => new Date().toISOString().slice(0,10);

export function combinarFechaYHora(fecha, hora) {
  const [h, m] = hora.split(':');
  const d = new Date(fecha); 
  d.setHours(h);
  d.setMinutes(m);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}
