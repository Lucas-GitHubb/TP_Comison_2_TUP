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

instalacion de ORM prisma
---------------------------------------------
```bash
npm install @prisma/client //instala el cliente de prisma esto se usa en lugar de hacer consultas directas a la base de datos, ya no se usa mysql2 o pg
```
```bash
npm install prisma --save-dev //instala prisma como dependencia de desarrollo
```
```bash
npx prisma init //crea la carpeta prisma y el archivo schema.prisma
```
creacion de la base de datos en el archivo .env
---------------------------------------------
```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" //ejemplo de conexion a mysql
```
```env
DATABASE_URL="mysql://root:password@localhost:3306/mydatabase" //ejemplo de conexion a mysql
```
comando para crear la base de datos con prisma
---------------------------------------------
```bash
npx prisma migrate dev --name init //crea la base de datos y ejecuta las migraciones
```
Leer la db con prisma
---------------------------------------------
```bash
npx prisma db pull //lee la base de datos y actualiza el archivo schema.prisma  
```
manipular la base de datos con prisma
---------------------------------------------
```bash
npx prisma migrate dev --name <nombre_de_la_migracion> //crea una nueva migracion y la ejecuta
```
```bash
comando para abrir la consola de prisma
---------------------------------------------
```bash
npx prisma studio
```
```bash
npx prisma generate //genera el cliente de prisma
```
comando para instalar bcrypt
---------------------------------------------
```bash
npm install bcrypt
```
```bash
npm install dotenv
```
```bash
npm install express
```
```bash
npm install cors
```
```bash
npm install body-parser
```
```bash
npm install nodemon
```
```bash
npm install mysql2
```
```bash
npm install sequelize
npm install sequelize-cli
npx sequelize init
```
```bash
npx sequelize db:create
```
```bash
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
```
```bash
npx sequelize db:migrate
```
```bash
npm install mysql
```
```bash
npx prisma studio
```
comando para generar el cliente de prisma
---------------------------------------------
```bash
npx prisma generate
```
comando para instalar bcrypt
---------------------------------------------
```bash
npm install bcrypt
```
comando para instalar dotenv
---------------------------------------------
```bash
npm install dotenv
```
comando para instalar express
---------------------------------------------
```bash
npm install express
```
comando para instalar cors
---------------------------------------------
```bash
npm install cors
```
comando para instalar body-parser
---------------------------------------------
```bash
npm install body-parser
``` 
comando para instalar nodemon
---------------------------------------------
```bash
npm install nodemon
```
comando para instalar mysql2
---------------------------------------------
```bash 
npm install mysql2
```
comando para instalar sequelize ORM
---------------------------------------------
```bash
npm install sequelize
npm install sequelize-cli
npx sequelize init
```
comando para crear la base de datos con sequelize
---------------------------------------------
```bash
npx sequelize db:create
``` 
comando para crear un modelo con sequelize


---------------------------------------------
```bash
npx sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string
    
```
comando para ejecutar las migraciones con sequelize
---------------------------------------------
```bash
npx sequelize db:migrate
``` 
comando para instalar mysql
---------------------------------------------
```bash 
npm install mysql
```