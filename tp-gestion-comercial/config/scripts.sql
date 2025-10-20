-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS tp_gestion_comercial;
USE tp_gestion_comercial;

-- Usuarios/empleados
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  rol VARCHAR(50) DEFAULT 'empleado',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Proveedores
DROP TABLE IF EXISTS proveedores;
CREATE TABLE proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  contacto VARCHAR(150),
  telefono VARCHAR(50),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Productos
DROP TABLE IF EXISTS productos;
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(200) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 0,
  proveedor_id INT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (proveedor_id) REFERENCES proveedores(id) ON DELETE SET NULL
);

-- Ventas (cabecera)
DROP TABLE IF EXISTS ventas;
CREATE TABLE ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT, -- quien registró la venta
  total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Detalle de ventas
DROP TABLE IF EXISTS venta_items;
CREATE TABLE venta_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unit DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT
);

-- Métricas simples (registro de KPI manual si hace falta)
DROP TABLE IF EXISTS metricas;
CREATE TABLE metricas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  clave VARCHAR(100) NOT NULL,
  valor DECIMAL(20,2) NOT NULL,
  descripcion VARCHAR(255),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed ejemplo
INSERT INTO usuarios (nombre, email, rol) VALUES
('Admin Demo', 'admin@demo.com', 'admin'),
('Vendedor 1', 'vendedor1@demo.com', 'vendedor');

INSERT INTO proveedores (nombre, contacto, telefono) VALUES
('Proveedor A', 'Contacto A', '111-1111'),
('Proveedor B', 'Contacto B', '222-2222');

INSERT INTO productos (nombre, descripcion, precio, stock, proveedor_id) VALUES
('Camisa', 'Camisa algodón', 1500.00, 20, 1),
('Pantalón', 'Pantalón jean', 3200.00, 10, 2),
('Gorra', 'Gorra deportiva', 700.00, 50, 1);

INSERT INTO metricas (clave, valor, descripcion) VALUES
('ventas_diarias', 0, 'Ventas acumuladas del día');
