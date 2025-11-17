import prisma from '../../prisma/client.js';
import { validarDisponibilidad } from '../helpers/turnos/validarDisponibilidad.js';
import { combinarFechaYHora } from '../utils/time.js';

// ===============================
// Crear turno
// ===============================
export async function crearTurno({ cliente_id, servicio_id, fecha, hora, observaciones }) {

  const fechaDate = new Date(fecha);
  if (isNaN(fechaDate)) {
    const e = new Error('Fecha inválida');
    e.status = 400;
    throw e;
  }

  // Combinar fecha + hora
  const horaDate = combinarFechaYHora(fecha, hora);

  // Obtener servicio
  const servicio = await prisma.servicios.findUnique({
    where: { id: servicio_id }
  });

  if (!servicio) {
    const e = new Error('Servicio inválido');
    e.status = 400;
    throw e;
  }

  const duracionMin = servicio.duracion_min;

  // Obtener turnos del día
  const turnosDelDia = await prisma.turnos.findMany({
    where: {
      fecha: fechaDate,
      estado: { not: 'cancelado' }
    },
    include: { servicios: true }
  });

  // Validar disponibilidad
  const conflicto = validarDisponibilidad(turnosDelDia, hora, duracionMin);
  if (conflicto) {
    const e = new Error('Ya existe un turno en ese horario');
    e.status = 409;
    throw e;
  }

  // Crear turno
  return prisma.turnos.create({
    data: {
      cliente_id,
      servicio_id,
      fecha: fechaDate,
      hora: horaDate,          // ← AHORA SÍ: Date
      observaciones
    },
    include: {
      clientes: true,
      servicios: true
    }
  });
}

// ===============================
// Obtener turno por ID
// ===============================
export async function obtenerTurno(id) {
  return prisma.turnos.findUnique({
    where: { id: Number(id) },
    include: {
      clientes: true,
      servicios: true
    }
  });
}

// ===============================
// Listar turnos por fecha
// ===============================
export async function listarTurnosPorFecha(fecha) {

  const fechaDate = new Date(fecha);
  if (isNaN(fechaDate)) {
    const e = new Error('Fecha inválida');
    e.status = 400;
    throw e;
  }

  return prisma.turnos.findMany({
    where: {
      fecha: fechaDate,
      estado: { not: 'cancelado' }
    },
    include: {
      clientes: true,
      servicios: true
    },
    orderBy: { hora: 'asc' }
  });
}

// ===============================
// Cambiar estado
// ===============================
export async function cambiarEstado(id, estado) {
  return prisma.turnos.update({
    where: { id: Number(id) },
    data: { estado },
    include: {
      clientes: true,
      servicios: true
    }
  });
}

// ===============================
// Reprogramar turno
// ===============================
export async function reprogramarTurno(id, { fecha, hora, servicio_id, observaciones }) {

  const turnoActual = await obtenerTurno(id);
  if (!turnoActual) {
    const e = new Error('Turno no encontrado');
    e.status = 404;
    throw e;
  }

  const nuevaFecha = fecha ? new Date(fecha) : turnoActual.fecha;
  if (isNaN(nuevaFecha)) {
    const e = new Error('Fecha inválida');
    e.status = 400;
    throw e;
  }

  const nuevaHoraDate = hora
    ? combinarFechaYHora(nuevaFecha.toISOString().slice(0,10), hora)
    : turnoActual.hora;

  const nuevoServicio = servicio_id ?? turnoActual.servicio_id;

  // Datos del servicio
  const servicio = await prisma.servicios.findUnique({
    where: { id: nuevoServicio }
  });

  if (!servicio) {
    const e = new Error('Servicio inválido');
    e.status = 400;
    throw e;
  }

  // Turnos del día exceptuando este
  const turnosDelDia = await prisma.turnos.findMany({
    where: {
      fecha: nuevaFecha,
      estado: { not: 'cancelado' },
      id: { not: id }
    },
    include: { servicios: true }
  });

  // Validar disponibilidad
  const conflicto = validarDisponibilidad(
    turnosDelDia,
    hora ?? turnoActual.hora.toISOString().slice(11,16),
    servicio.duracion_min
  );

  if (conflicto) {
    const e = new Error('Ya existe un turno en ese horario');
    e.status = 409;
    throw e;
  }

  // Actualizar
  return prisma.turnos.update({
    where: { id: Number(id) },
    data: {
      fecha: nuevaFecha,
      hora: nuevaHoraDate,     // ← Date válido
      servicio_id: nuevoServicio,
      observaciones: observaciones ?? turnoActual.observaciones
    },
    include: {
      clientes: true,
      servicios: true
    }
  });
}

// ===============================
// Historial por cliente
// ===============================
export async function historialPorCliente(cliente_id) {
  return prisma.turnos.findMany({
    where: { cliente_id },
    include: { servicios: true },
    orderBy: [
      { fecha: 'desc' },
      { hora: 'desc' }
    ]
  });
}
