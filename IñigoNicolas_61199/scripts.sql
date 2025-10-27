create database programacion_TP1_empresaComercio;

use programacion_TP1_empresaComercio;

create table usuarios (
	id_usuario int not null auto_increment primary key,
    nombre_usuario varchar(50) not null,
    apellido_usuario varchar(50) not null,
    dni_usuario char(8) not null,
    email_usuario varchar(50) not null,
    contraseña varchar(50) not null,
    rol_usuario enum("admin", "empleado") not null,
    fecha_creacion_usuario datetime not null default current_timestamp,
    estado_usuario boolean not null default true
);

create table proveedores(
	id_proveedor int not null auto_increment primary key,
    nombre_proveedor varchar(50) not null,
    email_proveedor varchar(50) not null,
    telefono_proveedor varchar(50) not null,
    direccion_proveedor varchar(50) not null,
    fecha_creacion_proveedor datetime not null default current_timestamp,
    estado_proveedor boolean not null default true
);

create table productos(
	id_producto int not null auto_increment primary key,
    id_proveedor int not null,
    nombre_producto varchar(50) not null,
    descripcion_producto text,
    precio_venta decimal(10,2) not null,
    precio_compra decimal(10,2) not null, 
    fecha_creacion_producto datetime not null default current_timestamp,
    estado_producto boolean not null default true,
    foreign key (id_proveedor) references proveedores(id_proveedor)
);

create table stock(
	id_stock int not null auto_increment primary key,
    id_producto int not null,
    cantidad int not null,
    foreign key (id_producto) references productos(id_producto)
);

create table ventas(
	id_venta int not null auto_increment primary key,
    id_usuario int not null,
    fecha_venta timestamp default current_timestamp,
    precio_total decimal(10,2) not null,
    estado_venta enum("completada", "anulada") default "completada",
    foreign key (id_usuario) references usuarios(id_usuario)
);

create table detalle_ventas(
	id_detalle int not null auto_increment primary key,
    id_venta int not null,
    id_producto int not null,
    cantidad int not null,
    precio_unitario decimal(10,2) not null,
    subtotal decimal(10,2) not null,
	foreign key (id_venta) references ventas(id_venta),
    foreign key (id_producto) references productos(id_producto)
);