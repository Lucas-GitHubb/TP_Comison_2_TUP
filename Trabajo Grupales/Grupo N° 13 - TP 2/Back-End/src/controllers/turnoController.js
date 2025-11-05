import { crearTurno, listarTurnosPorFecha, cambiarEstado, reprogramarTurno, historialPorCliente } from '../models/turnoModel.js';

export async function postTurno(req, res, next) {
  try {
    const out = await crearTurno(req.body);
    res.status(201).json(out);
  } catch (e) { next(e); }
}

export async function getTurnosDelDia(req, res, next) {
  try {
    const fecha = req.query.fecha || new Date().toISOString().slice(0,10);
    res.json(await listarTurnosPorFecha(fecha));
  } catch (e) { next(e); }
}

export async function patchEstadoTurno(req, res, next) {
  try {
    const out = await cambiarEstado(Number(req.params.id), req.body.estado);
    res.json(out);
  } catch (e) { next(e); }
}

export async function putReprogramarTurno(req, res, next) {
  try {
    const out = await reprogramarTurno(Number(req.params.id), req.body);
    res.json(out);
  } catch (e) { next(e); }
}

export async function getHistorialCliente(req, res, next) {
  try {
    res.json(await historialPorCliente(Number(req.params.id)));
  } catch (e) { next(e); }
}