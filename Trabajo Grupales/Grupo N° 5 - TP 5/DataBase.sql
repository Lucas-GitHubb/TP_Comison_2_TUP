create database gimnasio;
use gimnasio;

CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    socio_id INT NOT NULL,
    actividad_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME,
    FOREIGN KEY (socio_id) REFERENCES socios(idSocio) ON DELETE CASCADE,
    FOREIGN KEY (actividad_id) REFERENCES actividades(id) ON DELETE CASCADE
);
CREATE TABLE actividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cupo_maximo INT NOT NULL CHECK (cupo_maximo > 0)
);
CREATE TABLE socios (
    idSocio INT AUTO_INCREMENT PRIMARY KEY,
    nombreSocio VARCHAR(100) NOT NULL,
    apellidoSocio VARCHAR(100) NOT NULL,
    emailSocio VARCHAR(150) NOT NULL UNIQUE,
    contraSocio VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    INSERT INTO actividades (nombre, cupo_maximo) VALUES
('Yoga', 20),
('Spinning', 15),
('CrossFit', 25),
('Pilates', 18),
('Zumba', 30),
('Boxeo', 12),
('Natación', 10),
('Funcional', 22),
('Musculación', 35),
('Kickboxing', 16);

    