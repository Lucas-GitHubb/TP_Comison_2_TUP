create database grupo11db;

use grupo11db;

create table usuarios(
id_usuario int  primary key auto_increment,
usuario_nombre varchar(50) not null,
usuario_dni varchar(50) not null,
usuario_curso varchar(20) not null,
activo_usuario BOOLEAN DEFAULT 1
);

create table categorias(
id_categoria int primary key auto_increment,
nombre_categoria varchar (100) not null,
activo_categoria boolean default 1
);

create table libros (
id_libro int primary key auto_increment,
id_categoria int not null,
libro_titulo varchar(100) not null,
libro_stock int not null,
autor varchar(100) not null,
activo_libro BOOLEAN DEFAULT 1,
foreign key (id_categoria) references categorias(id_categoria)
);

create table prestamos (
id_prestamo int primary key auto_increment,
id_libro int not null,
id_usuario int not null,
fecha_prestamo DATETIME DEFAULT CURRENT_TIMESTAMP ,
fecha_devolucion DATETIME ,
activo_prestamo BOOLEAN DEFAULT 1,
FOREIGN KEY (id_libro) REFERENCES libros(id_libro) ,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) 
);

