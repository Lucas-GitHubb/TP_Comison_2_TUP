import { crearServicio, listarServicios, obtenerServicio, actualizarServicio, eliminarServicioModel } from '../models/servicioModel.js';

export async function postServicio(req, res, next) {
  try {
    const out = await crearServicio(req.body);
    res.status(201).json(out);
  } catch (e) { next(e); }
}

export async function getServicios(_req, res, next) {
  try {
    res.json(await listarServicios());
  } catch (e) { next(e); }
}

export async function getServicio(req, res, next) {
  try {
    const s = await obtenerServicio(Number(req.params.id));
    if (!s) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(s);
  } catch (e) { next(e); }
}

export async function putServicio(req, res, next) {
  try {
    const id = Number(req.params.id);
    const s = await obtenerServicio(id);
    if (!s) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(await actualizarServicio(id, req.body));
  } catch (e) { next(e); }
}

export async function eliminarServicio(req, res, next) {
  try {
    const id = Number(req.params.id);
    const s = await obtenerServicio(id);
    if (!s) return res.status(404).json({ error: 'Servicio no encontrado' });
    await eliminarServicioModel(id);
    res.status(204).end();
  } catch (e) { next(e); }
}

