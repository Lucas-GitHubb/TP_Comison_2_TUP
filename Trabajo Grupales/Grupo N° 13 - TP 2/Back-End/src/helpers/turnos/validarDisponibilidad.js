import { calcularRangoHorario } from './calcularRangoHorario.js';

function dateToHHMM(date) {
  if (typeof date === "string") return date; // ya viene como "HH:mm"
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

// turnos = array desde base
export function validarDisponibilidad(turnos, horaNueva, duracionMinNueva) {

  const nuevo = calcularRangoHorario(dateToHHMM(horaNueva), duracionMinNueva);

  return turnos.some(t => {
    const horaExistente = dateToHHMM(t.hora);
    const duracion = t.servicios.duracion_min;

    const rango = calcularRangoHorario(horaExistente, duracion);

    const hayConflicto =
      rango.inicio < nuevo.fin && nuevo.inicio < rango.fin;

    return hayConflicto;
  });
}
