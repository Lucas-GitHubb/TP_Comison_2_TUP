CREATE DATABASE IF NOT EXISTS tp_gc_db;
USE tp_gc_db;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  cuit VARCHAR(20) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(12,2) NOT NULL DEFAULT 0,
  id_proveedor INT,
  stock_minimo INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_proveedor) REFERENCES proveedores(id)
);


CREATE TABLE IF NOT EXISTS stock_movimientos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_producto INT NOT NULL,
  tipo ENUM('ENTRADA','SALIDA') NOT NULL,
  cantidad INT NOT NULL,
  motivo VARCHAR(50),
  ref_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);


CREATE TABLE IF NOT EXISTS ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


CREATE TABLE IF NOT EXISTS venta_detalle (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_venta INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (id_venta) REFERENCES ventas(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);


INSERT INTO usuarios (nombre,email) VALUES
('Emiliano Sumerinde','esumerinde@gmail.com'), ('Lucas Guerrero','lguerrero@gmail.com');

INSERT INTO proveedores (nombre,cuit) VALUES
('Carlos Sumerinde','20-40695711-0'), ('Abril Silvestro','20-43592372-1');

INSERT INTO productos (nombre,precio,id_proveedor,stock_minimo) VALUES
('Helado',1200,1,5), ('Torta',2500,1,3), ('Café',900,2,10);

INSERT INTO stock_movimientos (id_producto,tipo,cantidad,motivo) VALUES
(1,'ENTRADA',50,'ajuste'), (2,'ENTRADA',40,'ajuste'), (3,'ENTRADA',60,'ajuste');

SHOW DATABASES;
USE tp_gc_db;
SHOW TABLES;
