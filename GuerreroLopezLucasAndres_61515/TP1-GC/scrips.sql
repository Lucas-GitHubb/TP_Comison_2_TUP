create table Usuario(
id_usuario  int not null auto_increment,
nombre_usuario varchar(20) not null,
apellido_usuario varchar(20) not null,
email_usuario varchar(20) not null,
fecha_usuario datetime not null default current_timestamp,
contraseña_usuario varchar(60) not null,
primary key (id_usuario)
); 


create table Proveedores(
id_proveedor int not null auto_increment,
nombre_proveedor varchar(20) not null,
apellido_proveedor varchar(20) not null,
email_proveedor varchar(20) not null,
contraseña_proveedor varchar(60) not null,
fecha_proveedor datetime not null default current_timestamp,
categoria_proveedor VARCHAR(50) NOT NULL DEFAULT 'General'
primary key (id_proveedor)
);

create table Producto(
id_producto int not null auto_increment,
id_proveedor int not null,
nombre_producto varchar(20) not null,
precio_de_compra int not null,
precio_de_venta int not null,
fecha_producto datetime not null default current_timestamp,
estado_del_producto boolean,
primary key (id_producto),
foreign key (id_proveedor) references Proveedores(id_proveedor)
);

create table Ventas(
id_venta int not null auto_increment,
id_usuario int not null,
id_producto int not null,
venta_total int not null ,
fecha_de_venta datetime not null default current_timestamp,
primary key(id_venta),
foreign key (id_usuario) references Usuario(id_usuario)
);

create table Detalle_Venta (
  id_detalle int not null auto_increment,
  id_venta int not null,
  id_producto int not null,
  cantidad int not null,
  precio_unitario decimal(10,2) not null,
  primary key (id_detalle),
  foreign key (id_venta) references Ventas(id_venta),
  foreign key (id_producto) references Producto (id_producto)
);

create table Stock(
id_stock int not null auto_increment,
id_producto int not null,
fecha_de_stock datetime not null default current_timestamp,
estado_del_stock boolean default true,
primary key(id_stock),
foreign key (id_producto) references Producto(id_producto)
);