// Convierte una hora "HH:mm" en segundos y calcula fin según duración
export function calcularRangoHorario(hora, duracionMin) {
  const [h, m] = hora.split(':').map(Number);
  const inicio = h * 3600 + m * 60;
  const fin = inicio + duracionMin * 60;
  return { inicio, fin };
}
