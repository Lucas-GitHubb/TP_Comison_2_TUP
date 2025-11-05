📘 Trabajos Prácticos – Programación Back-End con Node.js y MySQL

Bienvenidos al repositorio de Trabajos Prácticos de Programación.
Cada alumno deberá trabajar de forma individual siguiendo las reglas de este repositorio.

🚀 Instrucciones Generales
1. Hacer Fork

Entrar a este repositorio en GitHub.

Presionar el botón Fork (arriba a la derecha).

Ahora tendrás una copia del repo en tu cuenta de GitHub.

2. Clonar tu Fork

En tu computadora, clonar tu fork:

git clone https://github.com/TU-USUARIO/trabajos-practicos.git
cd trabajos-practicos

3. Crear Carpeta Personal

Cada alumno debe crear una carpeta con el siguiente formato:

ApellidoNombre_Legajo/


📌 Ejemplo:

PerezJuan_12345/


Dentro de esa carpeta vas a trabajar tu back-end y base de datos para cada TP.

4. Crear tu Rama

Para cada trabajo práctico, deberás crear una rama con este formato:

ApellidoNombre_Legajo_TP#


📌 Ejemplo:

PerezJuan_12345_TP1


Crear la rama:

git checkout -b ApellidoNombre_Legajo_TP1

5. Subir tus Cambios

Cada vez que termines un TP:

git add .
git commit -m "Entrega TP1 - Perez Juan - Legajo 12345"
git push origin ApellidoNombre_Legajo_TP1

6. Enviar Pull Request (PR)

Ir a tu fork en GitHub.

Presionar Contribute → Open Pull Request.

Elegir que los cambios vayan al repo del profesor.

El título debe ser:

Entrega TP1 - Apellido Nombre - Legajo


Enviar el PR.

7. Actualizar tu Fork (cuando se publiquen nuevos TPs)

Si el profesor sube nuevos trabajos al repo original, sincronizá tu fork:

git fetch upstream
git checkout main
git merge upstream/main
git push origin main


(Si aún no configuraste el remoto upstream, hacelo una sola vez con:)

git remote add upstream https://github.com/PROFE-USER/trabajos-practicos.git

✅ Resumen del Flujo de Trabajo

Fork del repo.

Clonar tu fork.

Crear carpeta personal (ApellidoNombre_Legajo).

Crear rama (ApellidoNombre_Legajo_TP#).

Resolver TP dentro de tu carpeta.

Commit & Push a tu rama.

Pull Request al repo del profesor.

👉 Siguiendo estas reglas, cada alumno tendrá su espacio identificado y las entregas quedarán ordenadas en ramas y PRs.

¿Querés que además te arme un ejemplo visual en el README (tipo árbol de carpetas y ramas de ejemplo) para que les quede todavía más claro?

Dijiste:
si porfavor 
ChatGPT dijo:

¡Excelente! 🙌 Te dejo el README final mejorado, con un ejemplo visual de cómo deben quedar las carpetas y las ramas. Esto ayuda a que los alumnos lo vean más claro y no haya confusiones.

📘 Trabajos Prácticos – Programación Back-End con Node.js y MySQL

Bienvenidos al repositorio de Trabajos Prácticos de Programación.
Cada alumno deberá trabajar de forma individual siguiendo las reglas de este repositorio.

🚀 Instrucciones Generales
1. Hacer Fork

Entrar a este repositorio en GitHub.

Presionar el botón Fork (arriba a la derecha).

Ahora tendrás una copia del repo en tu cuenta de GitHub.

2. Clonar tu Fork

En tu computadora, clonar tu fork:

git clone https://github.com/TU-USUARIO/trabajos-practicos.git
cd trabajos-practicos

3. Crear Carpeta Personal

Cada alumno debe crear una carpeta con el siguiente formato:

ApellidoNombre_Legajo/


📌 Ejemplo:

PerezJuan_12345/


Dentro de esa carpeta vas a trabajar tu back-end y base de datos para cada TP.

4. Crear tu Rama

Para cada trabajo práctico, deberás crear una rama con este formato:

ApellidoNombre_Legajo_TP#


📌 Ejemplo:

PerezJuan_12345_TP1


Crear la rama:

git checkout -b ApellidoNombre_Legajo_TP1

5. Subir tus Cambios

Cada vez que termines un TP:

git add .
git commit -m "Entrega TP1 - Perez Juan - Legajo 12345"
git push origin ApellidoNombre_Legajo_TP1

6. Enviar Pull Request (PR)

Ir a tu fork en GitHub.

Presionar Contribute → Open Pull Request.

Elegir que los cambios vayan al repo del profesor.

El título debe ser:

Entrega TP1 - Apellido Nombre - Legajo


Enviar el PR.

7. Actualizar tu Fork (cuando se publiquen nuevos TPs)

Si el profesor sube nuevos trabajos al repo original, sincronizá tu fork:

git fetch upstream
git checkout main
git merge upstream/main
git push origin main


(Si aún no configuraste el remoto upstream, hacelo una sola vez con:)

git remote add upstream https://github.com/PROFE-USER/trabajos-practicos.git

📂 Ejemplo Visual
🔹 Estructura de carpetas esperada
trabajos-practicos/
│   README.md
│   package.json
│   .gitignore
│   .env.example
│   index.js
│
├── config/
│   DB.js
│
├── controllers/
│   userController.js
│
├── routes/
│   userRoutes.js
│
├── utils/
│   errorHandler.js
│
├── PerezJuan_12345/
│   ├── index.js
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   └── scripts.sql
│
└── RodriguezMaria_67890/
    ├── index.js
    ├── config/
    ├── controllers/
    ├── routes/
    └── scripts.sql

🔹 Ejemplo de ramas esperadas
main                        -> Rama principal del profesor
PerezJuan_12345_TP1         -> Rama del alumno Juan Pérez para TP1
PerezJuan_12345_TP2         -> Rama del alumno Juan Pérez para TP2
RodriguezMaria_67890_TP1    -> Rama de la alumna María Rodríguez para TP1

✅ Resumen del Flujo de Trabajo

Fork del repo.

Clonar tu fork.

Crear carpeta personal (ApellidoNombre_Legajo).

Crear rama (ApellidoNombre_Legajo_TP#).

Resolver TP dentro de tu carpeta.

Commit & Push a tu rama.

Pull Request al repo del profesor.

👉 Siguiendo estas reglas, cada alumno tendrá su espacio identificado y las entregas quedarán ordenadas en ramas y PRs.
