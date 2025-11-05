# 🚀 TP – Semana 3 | Actualización del Back-End a Prisma ORM

---

## 🎯 Objetivo de la semana
Migrar el **back-end existente (Node + Express + MySQL)** al uso del ORM **Prisma**, reemplazando las consultas SQL manuales por un enfoque moderno, seguro y escalable basado en modelos de datos.

---

## 👥 Importante para el líder del grupo

Antes de comenzar, el **líder del grupo** debe **sincronizar el repositorio** para obtener los nuevos archivos base:

```bash
git pull upstream main

🧠 ¿Qué es Prisma ORM?

Prisma ORM (Object Relational Mapper) permite interactuar con bases de datos utilizando código JavaScript en lugar de SQL manual.
Traduce los modelos de la base a objetos de Node.js, generando código más limpio, mantenible y escalable.

Ventajas:

Código más corto y legible

Menos errores de sintaxis SQL

Tipado automático

Soporte multiplataforma (MySQL, PostgreSQL, SQLite, SQL Server)

⚙️ Pasos para la migración a Prisma
1️⃣ Instalación de Prisma

npm install prisma @prisma/client

Instala Prisma y su cliente para que pueda ser utilizado por el servidor Node.js.

2️⃣ Inicialización de Prisma

npx prisma init

Crea la carpeta /prisma con el archivo schema.prisma y agrega la variable DATABASE_URL al .env.

3️⃣ Configuración del archivo .env

Editá tu archivo .env agregando la cadena de conexión correspondiente a tu base MySQL:

DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

Reemplazá USER, PASSWORD, HOST, PORT y DATABASE con tus datos reales.

4️⃣ Conectar Prisma a la base existente

npx prisma db pull   (Prisma lee la estructura de tu base de datos y genera automáticamente los modelos dentro de schema.prisma.)

Genera el archivo schema.prisma basado en la estructura actual de la base de datos. (recordar que si no le esta funcionado verifiquen que el archivo prisma.config.ts este importado el dotenv/config)

5️⃣ Generar el cliente de Prisma

npx prisma generate

Crea el cliente Prisma dentro de node_modules/@prisma/client, permitiendo realizar consultas con sintaxis moderna:

const usuarios = await prisma.usuarios.findMany();

6️⃣ (✅ Opcional) Crear archivo de configuración de Prisma

Para centralizar la conexión, podés crear un archivo:

📁 /config/prisma.js

const { PrismaClient } = require('@prisma/client');  (recuerden que aqui tiene que apuntar a la carpeta generada)
const prisma = new PrismaClient();

module.exports = prisma;

🧾 Auditoría del trabajo

Cada grupo deberá incluir un archivo AUDITORIA.md dentro de su carpeta con:

Breve descripción de los cambios realizados.

Capturas del resultado de los comandos:

npx prisma db pull

npx prisma generate

Ejemplo funcional de un controlador usando Prisma (findMany, create, update, etc).

🧑‍💻 Resumen de comandos
Propósito	Comando	Descripción
💾 Instalar ORM	npm install prisma @prisma/client	Añade Prisma al proyecto
⚙️ Inicializar	npx prisma init	Crea la configuración base
🧩 Leer DB existente	npx prisma db pull	Importa la estructura de la base
🏗️ Generar cliente	npx prisma generate	Compila el cliente Prisma
🧹 Formatear schema	npx prisma format	Ordena el archivo schema.prisma
👀 Visualizar datos	npx prisma studio	Abre interfaz gráfica para explorar tablas
🎯 Resultado esperado

Al finalizar la Semana 3:

El back-end debe utilizar Prisma ORM en lugar de consultas SQL con mysql2.

Los controladores principales (usuarios, clientes, ventas, productos, etc.) deben usar los métodos Prisma (findMany, findUnique, create, update, delete).

El proyecto debe correr correctamente con:

npm run dev  o nodemon


sin errores de conexión a base de datos.

💡 Consejo :
Recordá que Prisma no usa variables sueltas como DB_HOST o DB_USER.
Usa una sola cadena de conexión DATABASE_URL, lo que simplifica la configuración y evita errores comunes.

📚 UTN – Programación 4 | Comisión 2
Profesor: Matías Chocobar