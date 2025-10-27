
-- ============================================================
--  Club Deportivo - Scripts de Base de Datos (MySQL 8+)
--  Semana 2 - TP Grupales (Arquitectura + Auth + Reset Pass)
-- ============================================================

-- 1) Crear Base de Datos (si no existe)
CREATE DATABASE IF NOT EXISTS club_deportivo_tp
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE club_deportivo_tp;

-- 2) Usuario de MySQL dedicado (con contraseña) - opcional pero recomendado
--    *Si no tenés permisos de SUPER para CREATE USER, omití esta sección.*
--    Cambiá el host '%' por 'localhost' si corresponde a tu entorno.
CREATE USER IF NOT EXISTS 'club_user'@'%' IDENTIFIED BY 'Club2025*';
GRANT ALL PRIVILEGES ON club_deportivo_tp.* TO 'club_user'@'%';
FLUSH PRIVILEGES;

-- 3) Tablas principales
-- ------------------------------------------------------------
-- 3.1) Usuarios del sistema (admin/operador) - usada por auth.controller.js
DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  usuario_id   INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(100) NOT NULL,
  apellido     VARCHAR(100) NULL,
  correo       VARCHAR(150) NOT NULL UNIQUE,
  -- Nota: el controlador actual compara texto plano en 'contrasena'.
  --       Cuando migren a bcrypt, creen/usen 'password_hash' y deprecen 'contrasena'.
  contrasena   VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NULL,
  rol          ENUM('admin','operador') NOT NULL DEFAULT 'admin',
  creado_en    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3.2) Socios (usada por socios.controller.js con bcrypt en 'password')
DROP TABLE IF EXISTS socios;
CREATE TABLE socios (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(120) NOT NULL,
  dni         VARCHAR(20)  NULL UNIQUE,
  telefono    VARCHAR(30)  NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,  -- bcrypt hash
  creado_en   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3.3) Deportes
DROP TABLE IF EXISTS deportes;
CREATE TABLE deportes (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(120) NOT NULL UNIQUE,
  cuota_mensual  DECIMAL(10,2) NOT NULL CHECK (cuota_mensual >= 0)
) ENGINE=InnoDB;

-- 3.4) Relación Socios <-> Deportes
DROP TABLE IF EXISTS socios_deportes;
CREATE TABLE socios_deportes (
  id                 INT AUTO_INCREMENT PRIMARY KEY,
  socio_id           INT NOT NULL,
  deporte_id         INT NOT NULL,
  fecha_inscripcion  DATE NOT NULL DEFAULT (CURRENT_DATE),
  UNIQUE KEY uq_socio_deporte (socio_id, deporte_id),
  CONSTRAINT fk_sd_socio   FOREIGN KEY (socio_id)  REFERENCES socios(id)    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_sd_deporte FOREIGN KEY (deporte_id) REFERENCES deportes(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3.5) Pagos
DROP TABLE IF EXISTS pagos;
CREATE TABLE pagos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  socio_id    INT NOT NULL,
  deporte_id  INT NOT NULL,
  mes         TINYINT NOT NULL CHECK (mes BETWEEN 1 AND 12),
  anio        INT NOT NULL CHECK (anio BETWEEN 2000 AND 2100),
  monto       DECIMAL(10,2) NOT NULL CHECK (monto >= 0),
  fecha_pago  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_pago_unico (socio_id, deporte_id, mes, anio),
  CONSTRAINT fk_pago_socio   FOREIGN KEY (socio_id)  REFERENCES socios(id)    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_pago_deporte FOREIGN KEY (deporte_id) REFERENCES deportes(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3.6) Password resets (token para recuperación vía email con Nodemailer)
DROP TABLE IF EXISTS password_resets;
CREATE TABLE password_resets (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_type   ENUM('socio','usuario') NOT NULL,  -- a qué tabla apunta
  user_id     INT NOT NULL,
  email       VARCHAR(150) NOT NULL,
  token       VARCHAR(64) NOT NULL UNIQUE,       -- guardar token aleatorio hex/base64
  expires_at  DATETIME NOT NULL,                 -- p.ej. NOW() + INTERVAL 1 HOUR
  used_at     DATETIME NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_user (user_type, user_id)
) ENGINE=InnoDB;

-- 4) Datos de ejemplo mínimos
-- ------------------------------------------------------------
-- Usuario administrador (para auth.controller.js);
-- usa contraseña EN TEXTO PLANO por compatibilidad con el código actual.
-- Cuando migren a bcrypt, ignoren 'contrasena' y completen 'password_hash'.
INSERT INTO usuarios (nombre, apellido, correo, contrasena, rol)
VALUES ('Admin', 'Principal', 'admin@club.com', 'admin123', 'admin');

-- Semillas opcionales para comenzar a probar
INSERT INTO deportes (nombre, cuota_mensual) VALUES
('Fútbol', 15000.00),
('Básquet', 14000.00),
('Natación', 18000.00);

-- Socios sin password por seguridad: crear vía API POST /api/socios para que se hashee con bcrypt
-- (o, si necesitás un socio de prueba YA con hash, reemplazá el valor de 'password' por un hash bcrypt válido)
-- Ejemplo de placeholder (NO FUNCIONA para login hasta reemplazar por un hash real):
INSERT INTO socios (nombre, dni, telefono, email, password) VALUES
('Juan Pérez', '30111222', '381-5551234', 'juan@example.com', '$2b$10$REEMPLAZAR_CON_HASH_VALIDO'),
('María Gómez', '31222333', '381-5555678', 'maria@example.com', '$2b$10$REEMPLAZAR_CON_HASH_VALIDO');

-- Asignaciones de ejemplo (podés borrar si no querés datos dummy)
INSERT INTO socios_deportes (socio_id, deporte_id) VALUES
(1, 1), (1, 3), (2, 2);

-- Pagos de ejemplo (podés borrar si no querés datos dummy)
INSERT INTO pagos (socio_id, deporte_id, mes, anio, monto)
VALUES (1, 1, 9, 2025, 15000.00),
       (1, 3, 9, 2025, 18000.00);
