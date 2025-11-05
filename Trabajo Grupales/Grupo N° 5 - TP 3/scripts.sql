CREATE DATABASE controlStockDB;
USE controlStockDB;

-- TABLA PROVEEDORES
CREATE TABLE proveedores (
  id_proveedor INT NOT NULL AUTO_INCREMENT,
  nombre_proveedor VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(30) NOT NULL,
  pais VARCHAR(50) NOT NULL,
  provincia VARCHAR(50) NOT NULL,
  calle VARCHAR(100) NOT NULL,
  codigo_postal VARCHAR(10),
  estado_proveedor TINYINT NOT NULL DEFAULT 1,
  fecha_creacion_proveedor DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_proveedor)
);

-- TABLA PRODUCTOS
CREATE TABLE productos (
  id_producto INT NOT NULL AUTO_INCREMENT,
  id_proveedor INT NOT NULL,
  nombre_producto VARCHAR(50) NOT NULL,
  categoria VARCHAR(80),
  precio DECIMAL(10,2) NOT NULL,
  estado_producto TINYINT NOT NULL DEFAULT 1,
  fecha_creacion_producto DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_producto),
  FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor)
);

-- TABLA STOCK
CREATE TABLE stock (
  id_stock INT NOT NULL AUTO_INCREMENT,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  estado_stock TINYINT NOT NULL DEFAULT 1,
  fecha_creacion_stock DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_stock),
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- TABLA MOVIMIENTOS DE STOCK 
CREATE TABLE movimientos_stock (
  id_movimiento INT NOT NULL AUTO_INCREMENT,
  id_producto INT NOT NULL,
  tipo ENUM('Entrada','Salida') NOT NULL,
  cantidad INT NOT NULL,
  stock_total INT NOT NULL,
  comentario VARCHAR(255),
  estado TINYINT NOT NULL DEFAULT 1,
  fecha_movimiento DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_movimiento),
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

