CREATE DATABASE IF NOT EXISTS club_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE club_db;

-- Socios
CREATE TABLE IF NOT EXISTS socios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  telefono VARCHAR(50),
  contrasena varchar(30),
  email VARCHAR(150),
  fecha_alta DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Cambiado a DATETIME
  activo TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Deportes
CREATE TABLE IF NOT EXISTS deportes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Membresias: socio inscrito a un deporte; cuota mensual puede variar por deporte o por socio
CREATE TABLE IF NOT EXISTS membresias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  socio_id INT NOT NULL,
  deporte_id INT NOT NULL,
  cuota_mensual DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  fecha_alta DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Cambiado a DATETIME
  activo TINYINT(1) DEFAULT 1,
  UNIQUE (socio_id, deporte_id),
  FOREIGN KEY (socio_id) REFERENCES socios(id) ON DELETE CASCADE,
  FOREIGN KEY (deporte_id) REFERENCES deportes(id) ON DELETE CASCADE
);

-- Pagos: registro por mes/año (cada pago asocia a una membresía y a un periodo)
CREATE TABLE IF NOT EXISTS pagos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membresia_id INT NOT NULL,
  importe DECIMAL(10,2) NOT NULL,
  fecha_pago DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Cambiado a DATETIME
  cuota_mes TINYINT NOT NULL,   
  cuota_anio SMALLINT NOT NULL, 
  metodo_pago VARCHAR(50),
  comentario VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (membresia_id) REFERENCES membresias(id) ON DELETE CASCADE
);

-- Índices útiles
CREATE INDEX idx_pagos_periodo ON pagos(cuota_anio, cuota_mes);
CREATE INDEX idx_membresias_socio ON membresias(socio_id);

USE club_db;

-- Deportes
INSERT IGNORE INTO deportes (nombre, descripcion) VALUES
('Fútbol','Entrenamientos y partidos'),
('Natación','Clases de natación'),
('Tenis','Clases y alquiler de canchas');

-- Socios
INSERT IGNORE INTO socios (nombre, dni, telefono, email) VALUES
('Lucas Diaz','12345678','381-1234567','lucas@example.com'),
('Sofía Navarro','87654321','381-7654321','sofia@example.com'),
('Juan Perez','23456789','381-2223333','juan@example.com');

-- Membresias (tomamos ids según inserción)
INSERT IGNORE INTO membresias (socio_id, deporte_id, cuota_mensual) VALUES
(1,1,1500.00), -- Lucas - Fútbol
(1,2,2000.00), -- Lucas - Natacion
(2,2,2000.00), -- Sofía - Natacion
(3,1,1500.00); -- Juan - Futbol

-- Pagos: supongamos que pagaron algunos meses
INSERT INTO pagos (membresia_id, importe, fecha_pago, cuota_mes, cuota_anio, metodo_pago)
VALUES
(1,1500.00,'2025-09-05',9,2025,'Efectivo'),  -- Lucas - Futbol - Sept 2025
(2,2000.00,'2025-07-10',7,2025,'Tarjeta'),   -- Lucas - Natacion - Jul 2025
(3,2000.00,'2025-09-15',9,2025,'Transferencia'); -- Sofia - Natacion - Sep 2025
-- Juan no pagó Septiembre => deuda
