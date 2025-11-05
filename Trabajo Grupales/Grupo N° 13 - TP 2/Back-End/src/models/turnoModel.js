import { pool } from '../config/DB.js';

export async function haySolape({ fecha, hora, duracion_min }) {
  const [rows] = await pool.execute(
    `SELECT t.id,
            t.hora,
            ADDTIME(t.hora, SEC_TO_TIME(s.duracion_min*60)) AS hora_fin
     FROM turnos t
     JOIN servicios s ON s.id = t.servicio_id
     WHERE t.fecha = :fecha AND t.estado <> 'cancelado'`,
    { fecha }
  );

  const [h, m, s = 0] = hora.split(':').map(Number);
  const nuevoInicio = h*3600 + m*60 + s;
  const nuevoFin = nuevoInicio + duracion_min*60;

  return rows.some(({ hora: eHora, hora_fin }) => {
    const [eh, em, es = 0] = String(eHora).split(':').map(Number);
    const eInicio = eh*3600 + em*60 + es;
    const [fh, fm, fs = 0] = String(hora_fin).split(':').map(Number);
    const eFin = fh*3600 + fm*60 + fs;
    return (eInicio < nuevoFin) && (nuevoInicio < eFin);
  });
}

export async function crearTurno({ cliente_id, servicio_id, fecha, hora, observaciones }) {
  const [[{ duracion_min }]] = await pool.query(
    `SELECT duracion_min FROM servicios WHERE id = ?`, [servicio_id]
  );
  if (!duracion_min) throw new Error('Servicio inválido');

  const solapa = await haySolape({ fecha, hora, duracion_min });
  if (solapa) {
    const err = new Error('Turno solapado en ese horario');
    err.status = 409;
    throw err;
  }

  const [r] = await pool.execute(
    `INSERT INTO turnos (cliente_id, servicio_id, fecha, hora, observaciones) 
     VALUES (:cliente_id, :servicio_id, :fecha, :hora, :observaciones)`,
    { cliente_id, servicio_id, fecha, hora, observaciones }
  );
  return obtenerTurno(r.insertId);
}

export async function obtenerTurno(id) {
  const [rows] = await pool.execute(
    `SELECT t.*, c.nombre AS cliente_nombre, s.nombre AS servicio_nombre, s.duracion_min
       FROM turnos t
       JOIN clientes c ON c.id = t.cliente_id
       JOIN servicios s ON s.id = t.servicio_id
      WHERE t.id = :id`,
    { id }
  );
  return rows[0] || null;
}

export async function listarTurnosPorFecha(fecha) {
  const [rows] = await pool.execute(
    `SELECT t.*, c.nombre AS cliente_nombre, s.nombre AS servicio_nombre
       FROM turnos t
       JOIN clientes c ON c.id = t.cliente_id
       JOIN servicios s ON s.id = t.servicio_id
      WHERE t.fecha = :fecha AND t.estado <> 'cancelado'
      ORDER BY t.hora ASC`,
    { fecha }
  );
  return rows;
}

export async function cambiarEstado(id, estado) {
  await pool.execute(`UPDATE turnos SET estado = :estado WHERE id = :id`, { id, estado });
  return obtenerTurno(id);
}

export async function reprogramarTurno(id, { fecha, hora, servicio_id, observaciones }) {
  const turnoActual = await obtenerTurno(id);
  if (!turnoActual) {
    const e = new Error('Turno no encontrado'); e.status = 404; throw e;
  }

  const nuevo = {
    fecha: fecha ?? turnoActual.fecha,
    hora: hora ?? turnoActual.hora,
    servicio_id: servicio_id ?? turnoActual.servicio_id
  };

  const [[{ duracion_min }]] = await pool.query(
    `SELECT duracion_min FROM servicios WHERE id = ?`, [nuevo.servicio_id]
  );
  const solapa = await haySolape({ fecha: nuevo.fecha, hora: nuevo.hora, duracion_min });
  if (solapa) { const e = new Error('Turno solapado en ese horario'); e.status = 409; throw e; }

  await pool.execute(
    `UPDATE turnos 
        SET fecha = :fecha, hora = :hora, servicio_id = :servicio_id, observaciones = :observaciones
      WHERE id = :id`,
    { id, ...nuevo, observaciones: observaciones ?? turnoActual.observaciones }
  );
  return obtenerTurno(id);
}

export async function historialPorCliente(cliente_id) {
  const [rows] = await pool.execute(
    `SELECT t.*, s.nombre AS servicio_nombre
       FROM turnos t
       JOIN servicios s ON s.id = t.servicio_id
      WHERE t.cliente_id = :cliente_id
      ORDER BY t.fecha DESC, t.hora DESC`,
    { cliente_id }
  );
  return rows;
}