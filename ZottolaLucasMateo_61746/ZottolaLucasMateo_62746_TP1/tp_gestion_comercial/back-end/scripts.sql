CREATE DATABASE gestion_comercial;

USE gestion_comercial;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  rol VARCHAR(50)
);

CREATE TABLE proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  contacto VARCHAR(100)
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  precio DECIMAL(10,2),
  stock INT
);

CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT,
  id_producto INT,
  cantidad INT,
  total DECIMAL(10,2),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);
