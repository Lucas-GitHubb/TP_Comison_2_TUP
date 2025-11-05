# TP9 - Sistema de Gestión de Club Deportivo (Grupo 12)

## Integrantes
- Diaz Lucas - rama: diaz_lucas
- Stekelberg Augusto - rama: augustostekelberg-61852
- Tosi Juan - rama: grupo12


## Requisitos
- Node.js
- MySQL

## Instalación rápida
1. Clonar el repo del líder.
2. Copiar `.env.example` a `.env` y completar datos.
3. npm install
4. Crear base y tablas:
   - Ejecutar `db_schema.sql` en MySQL
   - Ejecutar `db_seeds.sql` (opcional)
5. npm run dev
6. Endpoints:
   - POST /api/socios
   - GET /api/socios
   - POST /api/deportes
   - POST /api/membresias
   - POST /api/pagos
   - GET  /api/reportes/deudas?mes=9&anio=2025

## Observaciones
- No subir `.env`
- branch entregada: `grupo12`
