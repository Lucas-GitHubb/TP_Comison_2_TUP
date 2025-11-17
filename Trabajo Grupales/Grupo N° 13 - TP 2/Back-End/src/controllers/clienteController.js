import { crearCliente, listarClientes, obtenerCliente, actualizarCliente, eliminarClienteModel } from '../models/clienteModel.js';

export async function postCliente(req, res, next) {
  try {
    const out = await crearCliente(req.body);
    res.status(201).json(out);
  } catch (e) { next(e); }
}

export async function getClientes(_req, res, next) {
  try {
    const out = await listarClientes();
    res.json(out);
  } catch (e) { next(e); }
}

export async function getCliente(req, res, next) {
  try {
    const c = await obtenerCliente(Number(req.params.id));
    if (!c) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(c);
  } catch (e) { next(e); }
}

export async function putCliente(req, res, next) {
  try {
    const id = Number(req.params.id);
    const c = await obtenerCliente(id);
    if (!c) return res.status(404).json({ error: 'Cliente no encontrado' });
    const out = await actualizarCliente(id, req.body);
    res.json(out);
  } catch (e) { next(e); }
}

export async function eliminarCliente(req, res, next) {
  try {
    const id = Number(req.params.id);
    const c = await obtenerCliente(id);
    if (!c) return res.status(404).json({ error: 'Cliente no encontrado' });
    await eliminarClienteModel(id);
    res.status(204).end();
  } catch (e) { next(e); }
}