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
