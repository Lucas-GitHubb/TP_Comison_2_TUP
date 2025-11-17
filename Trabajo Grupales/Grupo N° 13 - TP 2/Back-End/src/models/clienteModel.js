import prisma from '../../prisma/client.js';

export async function crearCliente({ nombre, telefono, email }) {
  return prisma.clientes.create({
    data: { nombre, telefono, email },
  });
}

export async function listarClientes() {
  return prisma.clientes.findMany({
    orderBy: { id: 'desc' }
  });
}

export async function obtenerCliente(id) {
  return prisma.clientes.findUnique({
    where: { id: Number(id) }
  });
}

export async function actualizarCliente(id, data) {
  return prisma.clientes.update({
    where: { id: Number(id) },
    data
  });
}
