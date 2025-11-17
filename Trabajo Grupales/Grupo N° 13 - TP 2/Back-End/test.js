// Back-End/test.js
import { prisma } from "./src/prisma/client.js";

async function test() {
  const clientes = await prisma.clientes.findMany();
  console.log(clientes);
}

test();