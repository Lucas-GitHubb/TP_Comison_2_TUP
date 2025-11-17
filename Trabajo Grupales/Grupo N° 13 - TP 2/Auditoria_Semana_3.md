# 🧾 Auditoría — Semana 3  
### Grupo Nº: 13  
### Tema asignado: Turnos para Contratación de servicio  
### Integrantes (Nombre completo + Legajo):
- Zottola Lucas Mateo - 61746
- Guillermo Carrero - 62169
- Lopez Bruno - 61485

---

## 1) RELEVAMIENTO — Antes de comenzar a trabajar

Describir brevemente lo encontrado al abrir el proyecto:

 Datos mal logrados que encontramos:
 - A simple vista en el proyecto se puede ver que habían creado 2 archivos que no se utilizaban y 
confundían para levantar el servidor, el archivo app.js y server.js 

- Otro error que encontramos es que estaban mal importadas las rutas, porque el archivo index.js
no estaba teniendo en cuenta de que estos archivos estaban dentro de la carpeta src/ entonces
la importación de las rutas se estaban haciendo mal.

> Este apartado debe completarse **ANTES** de modificar el código.


## 2) SOLUCIONES IMPLEMENTADAS + NUEVO AGREGADO

Elegir un solo archivo principal para iniciar el servidor.
Usualmente se usa:

server.js para levantar el server

app.js para configurar la app (rutas, middlewares, etc.)

O directamente usar uno solo si el proyecto es simple.

Solución concreta:

Elegir cuál archivo queda.

Borrar el que no se usa.
---

## Observaciones finales (opcional)
- Comentarios sobre el flujo de trabajo, dificultades o acuerdos del equipo.
