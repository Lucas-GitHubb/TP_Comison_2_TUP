-- =============================================
-- CREACIÓN DE BASE DE DATOS
-- =============================================
CREATE DATABASE IF NOT EXISTS sistema_pagos;
USE sistema_pagos;

-- =============================================
-- TABLA: clientes
-- =============================================
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: servicios
-- =============================================
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_total DECIMAL(10,2) NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLA: planes_pago
-- =============================================
CREATE TABLE planes_pago (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    servicio_id INT NOT NULL,
    numero_cuotas INT NOT NULL CHECK (numero_cuotas IN (1,3,6)),
    fecha_inicio DATETIME NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (servicio_id) REFERENCES servicios(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- =============================================
-- TABLA: cuotas
-- =============================================
CREATE TABLE cuotas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_pago_id INT NOT NULL,
    numero_cuota INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    estado ENUM('PENDIENTE', 'PAGADO') DEFAULT 'PENDIENTE',
    fecha_pago DATETIME NULL,
    FOREIGN KEY (plan_pago_id) REFERENCES planes_pago(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- =============================================
-- ÍNDICES OPCIONALES (para optimizar consultas)
-- =============================================
CREATE INDEX idx_cliente_id ON planes_pago (cliente_id);
CREATE INDEX idx_servicio_id ON planes_pago (servicio_id);
CREATE INDEX idx_plan_pago_id ON cuotas (plan_pago_id);
