import { calcularRangoHorario } from './calcularRangoHorario.js';

// turnos = array desde base
export function validarDisponibilidad(turnos, horaNueva, duracionMinNueva) {
  const nuevo = calcularRangoHorario(horaNueva, duracionMinNueva);

  return turnos.some(t => {
    const rango = calcularRangoHorario(t.hora, t.servicio.duracion_min);

    const hayConflicto =
      rango.inicio < nuevo.fin && nuevo.inicio < rango.fin;

    return hayConflicto;
  });
}
