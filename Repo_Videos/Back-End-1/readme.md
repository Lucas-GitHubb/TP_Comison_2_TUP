Instalacion de JWT en Node.js
=============================
comando para instalar JWT en Node.js

```bash
npm install jsonwebtoken
```


index global ( este esta en la raiz del proyecto levanta el servidor)

app.js esta dentro de la carpeta src y sirve para manejar las rutas y la logica del servidor

index.js que esta dentro de la caperta router sirve para manejar las rutas de la aplicacion


la combinacion de estos tres archivos es la que permite manejar la autenticacion y autorizacion de usuarios en una aplicacion web utilizando JWT (JSON Web Tokens).

nodemailer es una libreria de Node.js que permite enviar correos electronicos desde una aplicacion web.

como conseguir contraseña de aplicacion en gmail
---------------------------------
1. Inicia sesion en tu cuenta de Gmail.
2. Ve a la seccion de "Seguridad" de tu cuenta.  https://myaccount.google.com/security
3. Busca la opcion de "Contraseñas de aplicaciones" y selecciona "Generar nueva contraseña".
4. Sigue las instrucciones para generar la contraseña y asegurate de guardarla en un lugar seguro.  
5. Utiliza esta contraseña en lugar de tu contraseña normal al configurar nodemailer para enviar correos electronicos desde tu aplicacion web.


comando de instalacion de nodemailer
---------------------------------------------
```bash 
npm install nodemailer
```

instalacion de ORM prisma es un ORM ( Object Relational Mapper) que facilita la interaccion con bases de datos en aplicaciones Node.js.
---------------------------------------------
1°) Instalacion de ORM prisma
```bash
npm install prisma @prisma/client # instalacion de ORM prisma
``` 
2°) Inicializacion de prisma
```bash
npx prisma init # inicializacion de prisma, genera la carpeta /prisma con un archivo schema.prisma y actualiza el archivo .env con la variable de entorno DATABASE_URL
```
3°) configuracion del .env
```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```
4°) conectar prisma a la base de datos existente
```bash
npx prisma db pull # conecta prisma a la base de datos existente y genera el modelo en schema.prisma
```
5°) generar el cliente de prisma
```bash
npx prisma generate # genera el cliente de prisma, genera la carpeta /node_modules/.prisma/client
``` 
6°) crear archivo de configuracion de prisma (opcional)
```ts   