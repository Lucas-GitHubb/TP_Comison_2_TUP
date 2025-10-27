CREATE DATABASE comercio_tp1_prog4;
USE comercio_tp1_prog4;

-- 🔹 Tabla de usuarios (empleados)
CREATE TABLE usuarios (
  idUsuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombreUsuario VARCHAR(50) NOT NULL,
  apellidoUsuario VARCHAR(50) NOT NULL,
  direccionUsuario VARCHAR(100) NOT NULL,
  telefonoUsuario VARCHAR(15) NOT NULL,
  emailUsuario VARCHAR(100) NOT NULL UNIQUE,
  contrasenaUsuario VARCHAR(100) NOT NULL,  
  isActive TINYINT DEFAULT 1
);

-- 🔹 Tabla de proveedores
CREATE TABLE proveedores (
  idProveedor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombreProveedor VARCHAR(50) NOT NULL,
  direccionProveedor VARCHAR(100),
  telefonoProveedor VARCHAR(15),
  isActive TINYINT DEFAULT 1
);

-- 🔹 Tabla de productos
CREATE TABLE productos (
  idProducto INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombreProducto VARCHAR(50) NOT NULL,
  codigoProducto INT UNIQUE NOT NULL,
  precioCompraProducto DECIMAL(10,2) NOT NULL,
  precioVentaProducto DECIMAL(10,2) NOT NULL, 
  stockProducto INT DEFAULT 0,   -- cambia a INT (no texto)
  descripcionProducto TEXT,
  idProveedor INT,
  isActive TINYINT DEFAULT 1,
  CONSTRAINT fk_producto_proveedor FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor)
);

-- 🔹 Tabla de ventas
CREATE TABLE ventas (
  idVenta INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  idUsuario INT,  -- quién realizó la venta (empleado)
  fechaVenta DATETIME DEFAULT CURRENT_TIMESTAMP,
  totalVenta DECIMAL(10,2),
  CONSTRAINT fk_venta_usuario FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
);

-- 🔹 Tabla intermedia entre ventas y productos
CREATE TABLE detalle_ventas (
  idDetalle INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  idVenta INT NOT NULL,
  idProducto INT NOT NULL,
  cantidad INT NOT NULL,
  precioUnitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precioUnitario) STORED,
  CONSTRAINT fk_detalle_venta FOREIGN KEY (idVenta) REFERENCES ventas(idVenta) ON DELETE CASCADE,
  CONSTRAINT fk_detalle_producto FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
);

-- 🔹 Tabla de métricas
CREATE TABLE metricas (
  idMetrica INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  detalleMetrica VARCHAR(100) NOT NULL,
  valorMetrica varchar(50),
  fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP
);
