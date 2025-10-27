-- Crear base de datos
CREATE DATABASE gestion_comercial;
USE gestion_comercial;

-- Tabla: usuarios (empleados del sistema)
CREATE TABLE usuarios (
  idUsuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefono VARCHAR(30),
  rol ENUM('admin','empleado') DEFAULT 'empleado',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: proveedores
CREATE TABLE proveedores (
  idProveedor INT AUTO_INCREMENT PRIMARY KEY,
  nombreProveedor VARCHAR(120) NOT NULL,
  contactoProveedor VARCHAR(100),
  telefonoProveedor VARCHAR(40),
  direccionProveedor VARCHAR(255),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: productos
CREATE TABLE productos (
  idProducto INT AUTO_INCREMENT PRIMARY KEY,
  nombreProducto VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  stock INT DEFAULT 0,
  idProveedor INT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idProveedor) REFERENCES proveedores(idProveedor)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla: ventas (cabecera)
CREATE TABLE ventas (
  idVenta INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT,
  total DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  fechaVenta DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla: detalle_venta (detalle por producto)
CREATE TABLE detalle_venta (
  idDetalle INT AUTO_INCREMENT PRIMARY KEY,
  idVenta INT NOT NULL,
  idProducto INT NOT NULL,
  cantidad INT NOT NULL,
  precioUnitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(12,2) GENERATED ALWAYS AS (cantidad * precioUnitario) STORED,
  FOREIGN KEY (idVenta) REFERENCES ventas(idVenta)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (idProducto) REFERENCES productos(idProducto)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- Inserts de ejemplo
-- Usuarios
INSERT INTO usuarios (nombre, email, telefono, rol) VALUES
('Administrador', 'admin@empresa.com', '381-5555555', 'admin'),
('Empleado Juan', 'juan@empresa.com', '381-4444444', 'empleado');

-- Proveedores
INSERT INTO proveedores (nombreProveedor, contactoProveedor, telefonoProveedor, direccionProveedor) VALUES
('Proveedor Central', 'María López', '381-1111111', 'Av. Belgrano 100'),
('Proveedor Norte', 'Carlos Rojas', '381-2222222', 'San Martín 250');

-- Productos
INSERT INTO productos (nombreProducto, descripcion, precio, stock, idProveedor) VALUES
('Monitor 24"', 'Monitor LED de 24 pulgadas', 95000.00, 8, 1),
('Mouse Inalámbrico', 'Mouse óptico con conexión USB', 12000.00, 15, 2),
('Teclado Mecánico', 'Teclado retroiluminado azul', 35000.00, 10, 1);

-- Venta y detalle de ejemplo
INSERT INTO ventas (idUsuario, total) VALUES (2, 107000.00);

INSERT INTO detalle_venta (idVenta, idProducto, cantidad, precioUnitario)
VALUES
(1, 1, 1, 95000.00),
(1, 2, 1, 12000.00);
