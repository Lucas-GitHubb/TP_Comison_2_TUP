create database gestion_comercial;
use gestion_comercial;

create table productos(
id_producto int auto_increment primary key,
nombre_producto varchar(30) not null,
descripcion_producto text,
precio decimal(10,2) not null,
stock int not null default 0,
fecha_creacion timestamp default current_timestamp,
activo boolean default true
);

create table usuarios(
id_usuario int auto_increment primary key,
nombre_usuario varchar(50) not null,
apellido_usuario varchar(50) not null,
dni_usuario varchar(20) not null unique,
telefono varchar(20),
email varchar(100),
email varchar(100),
tipo_usuario enum("cliente","proovedor") default "cliente",
fecha_registro timestamp default current_timestamp,
activo boolean default true
);

create table ventas(
id_venta int auto_increment primary key,
id_usuario int not null,
id_producto int not null,
fecha_venta timestamp default current_timestamp,
cantidad_total int not null,
precio_unitario decimal(10,2),
total_venta decimal(11,2) not null,
estado_venta enum("pendiente", "completada", "cancelada") default "pendiente",
foreign key (id_usuario) references usuarios(id_usuario),
foreign key (id_producto) references productos(id_producto)
);

create table proveedores(
id_proveedor int auto_increment primary key,
id_usuario int not null,
nombre_empresa varchar(100),
contacto_empresa varchar(100),
telefono_empresa varchar(100),
email_empresa varchar(100),
direccion_empresa text,
foreign key (id_usuario) references usuarios(id_usuario)
);

create table compras_proveedor(
id_compra int auto_increment primary key,
id_proveedor int not null,
id_producto int not null,
fecha_compra timestamp default current_timestamp,
cantidad int not null,
precio_unitario decimal(10,2) not null,
total_compra decimal(11,2) not null,
estado_compra enum("pendiente","pagada", "cancelada") default "pendiente",
foreign key (id_proveedor) references proveedores(id_proveedor),
foreign key (id_producto) references productos(id_producto)
);

create table metricas(
id_metrica int auto_increment primary key,
fecha_metrica date not null unique,
total_ventas_dia decimal(11,2) default 0,
cantidad_ventas_dia_ int default 0,
productos_vendidos_dia int default 0,
total_compras_dia decimal (11,2) default 0,
cantidad_compras_dia int default 0,
stock_total int default 0,
nuevos_clientes_dia int default 0,
ganancia_neta decimal(11,2) default 0,
porcentaje_ganancia decimal(5,2) default 0
);