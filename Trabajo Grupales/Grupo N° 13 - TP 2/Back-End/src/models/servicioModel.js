import prisma from '../../prisma/client.js';

export async function crearServicio({ nombre, precio, duracion_min }) {
  return prisma.servicios.create({
    data: { nombre, precio, duracion_min }
  });
}

export async function listarServicios() {
  return prisma.servicios.findMany({
    orderBy: { id: 'desc' }
  });
}

export async function obtenerServicio(id) {
  return prisma.servicios.findUnique({
    where: { id: Number(id) }
  });
}

export async function actualizarServicio(id, data) {
  return prisma.servicios.update({
    where: { id: Number(id) },
    data
  });
}
