📘 TP – Sistema de Gestión Comercial (Node + Express + MySQL)
🎯 Objetivo

Construir un back-end monolítico para una empresa de comercio/ventas que gestione usuarios/empleados, proveedores, productos, stock, ventas y métricas básicas.
El foco está en:

Modelado relacional correcto en MySQL.

Controllers CRUD limpios (sin auth, sin cifrado, sin middlewares personalizados).

Endpoints de métricas que consulten y agreguen datos reales.

🧱 Stack y librerías

Obligatorias: node, express, dotenv, mysql2, cors, helmet

Sugeridas (diagnóstico/logs): morgan (logs HTTP), nodemon (dev)

NO usar: JWT, bcrypt, middlewares propios de autorización, ORMs.

Tip: usar mysql2 con callbacks o async/await sin complicarla. El foco es que entiendan controllers y SQL.

📂 Estructura mínima
/tp-gestion-comercial
│  index.js                 # servidor
│  .env                     # variables (NO subir credenciales reales)
│  .env.example             # ejemplo de variables
│  package.json
│
├─ config/
│   └─ DB.js                # pool/conexión MySQL
│
├─ routes/
│   ├─ usuarios.routes.js
│   ├─ proveedores.routes.js
│   ├─ productos.routes.js
│   ├─ ventas.routes.js
│   └─ metricas.routes.js
│
└─ controllers/
    ├─ usuarios.controller.js
    ├─ proveedores.controller.js
    ├─ productos.controller.js
    ├─ ventas.controller.js
    └─ metricas.controller.js
