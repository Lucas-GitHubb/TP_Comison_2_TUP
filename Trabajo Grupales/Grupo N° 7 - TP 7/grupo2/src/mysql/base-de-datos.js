/**
 * 
 * create database TP1CentroDeSalud;
use TP1CentroDeSalud;

create table usuarios (
idUsuario int primary key auto_increment ,
MailUsuario varchar(50) not null unique,
PasswordUsuario varchar (250) not null,
RolUsuario enum('Admin','Medico', 'Paciente') not null,
IsActive tinyint default 1
 );
 
 create table pacientes (
idPaciente int primary key auto_increment,
NombrePaciente varchar(50) not null,
ApellidoPaciente varchar(50) not null,
FechaNacPaciente date not null,
TelefonoPaciente varchar(20) not null,
DireccionPaciente varchar(50) not null,
SexoPaciente enum('Femenino', 'Masculino', 'Otro') not null,
IsActive tinyint default 1,
idUsuario int,
foreign key (idUsuario) references usuarios (idUsuario)
);

create table catMedicos (
idCatMedico int primary key auto_increment,
NombreCat varchar (500) not null,
IsActive tinyint default 1
);

create table medicos (
idMedico int primary key auto_increment,
NombreMedico varchar (50) not null,
ApellidoMedico varchar (50) not null,
FechaNacMedico date not null,
TelefonoMedico varchar(20) not null,
DireccionMedico varchar(50) not null,
LocalidadMedico varchar(50) not null,
SalarioMedico decimal (10,2) not null,
IsActive tinyint default 1,
idUsuario int,
idCatMedico int not null,
foreign key (idUsuario) references usuarios(idUsuario),
foreign key (idCatMedico) references catMedicos(idCatMedico)
);


create table turnos (
idTurno int primary key auto_increment,
FechaRequeridaTurno date not null,
HorarioRequeridoTurno time not null,
EstadoTurno enum('Pendiente', 'Cancelado', 'Finalizado') not null,
idPaciente int not null, 
idMedico int not null,
foreign key (idPaciente) references pacientes (idPaciente),
foreign key (idMedico) references medicos (idMedico)
);

CREATE TABLE observaciones (
  idObservacion INT PRIMARY KEY AUTO_INCREMENT,
  idTurno INT NOT NULL,
  Comentario TEXT NOT NULL,
  FechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (idTurno) REFERENCES turnos(idTurno)
);


-- Insertar Usuarios
INSERT INTO usuarios (MailUsuario, PasswordUsuario, RolUsuario, IsActive) VALUES
('admin@centrosalud.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 1),
('dr.garcia@centrosalud.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Medico', 1),
('dra.martinez@centrosalud.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Medico', 1),
('dr.rodriguez@centrosalud.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Medico', 1),
('dra.lopez@centrosalud.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Medico', 1),
('dr.fernandez@centrosalud.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Medico', 1),
('juan.perez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Paciente', 1),
('maria.gonzalez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Paciente', 1),
('carlos.diaz@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Paciente', 1),
('ana.torres@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Paciente', 1),
('luis.ramirez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Paciente', 1),
('sofia.morales@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Paciente', 1),
('diego.silva@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Paciente', 1),
('laura.castro@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Paciente', 1),
('pedro.ruiz@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Paciente', 1);

-- Insertar Categorías de Médicos
INSERT INTO catMedicos (NombreCat, IsActive) VALUES
('Cardiología', 1),
('Pediatría', 1),
('Traumatología', 1),
('Dermatología', 1),
('Ginecología', 1),
('Oftalmología', 1),
('Neurología', 1),
('Medicina General', 1);

-- Insertar Médicos
INSERT INTO medicos (NombreMedico, ApellidoMedico, FechaNacMedico, TelefonoMedico, DireccionMedico, LocalidadMedico, SalarioMedico, IsActive, idUsuario, idCatMedico) VALUES
('Roberto', 'García', '1978-05-15', '381-4567890', 'Av. Alem 450', 'San Miguel de Tucumán', 450000.00, 1, 2, 1),
('Patricia', 'Martínez', '1982-09-22', '381-4567891', 'Calle Maipú 234', 'San Miguel de Tucumán', 420000.00, 1, 3, 2),
('Fernando', 'Rodríguez', '1975-03-10', '381-4567892', 'Av. Sarmiento 789', 'Yerba Buena', 480000.00, 1, 4, 3),
('Gabriela', 'López', '1985-11-30', '381-4567893', 'Calle 25 de Mayo 567', 'San Miguel de Tucumán', 440000.00, 1, 5, 4),
('Miguel', 'Fernández', '1980-07-18', '381-4567894', 'Av. Mate de Luna 890', 'Tafí Viejo', 460000.00, 1, 6, 8);

-- Insertar Pacientes
INSERT INTO pacientes (NombrePaciente, ApellidoPaciente, FechaNacPaciente, TelefonoPaciente, DireccionPaciente, SexoPaciente, IsActive, idUsuario) VALUES
('Juan', 'Pérez', '1990-04-12', '381-5678901', 'Calle Córdoba 123', 'Masculino', 1, 7),
('María', 'González', '1988-08-25', '381-5678902', 'Av. Independencia 456', 'Femenino', 1, 8),
('Carlos', 'Díaz', '1995-12-03', '381-5678903', 'Calle Laprida 789', 'Masculino', 1, 9),
('Ana', 'Torres', '1992-06-17', '381-5678904', 'Av. Roca 321', 'Femenino', 1, 10),
('Luis', 'Ramírez', '1987-02-28', '381-5678905', 'Calle Muñecas 654', 'Masculino', 1, 11),
('Sofía', 'Morales', '2010-09-14', '381-5678906', 'Av. Aconquija 987', 'Femenino', 1, 12),
('Diego', 'Silva', '1993-11-20', '381-5678907', 'Calle San Martín 147', 'Masculino', 1, 13),
('Laura', 'Castro', '1985-05-08', '381-5678908', 'Av. Belgrano 258', 'Femenino', 1, 14),
('Pedro', 'Ruiz', '1991-07-15', '381-5678909', 'Calle Junín 369', 'Masculino', 1, 15);

-- Insertar Turnos
INSERT INTO turnos (FechaRequeridaTurno, HorarioRequeridoTurno, EstadoTurno, idPaciente, idMedico) VALUES
('2025-10-15', '09:00:00', 'Pendiente', 1, 1),
('2025-10-15', '10:30:00', 'Pendiente', 2, 2),
('2025-10-16', '08:00:00', 'Pendiente', 3, 3),
('2025-10-16', '11:00:00', 'Pendiente', 4, 4),
('2025-10-17', '14:00:00', 'Pendiente', 5, 5),
('2025-10-10', '09:00:00', 'Finalizado', 6, 2),
('2025-10-11', '15:30:00', 'Finalizado', 7, 1),
('2025-10-12', '10:00:00', 'Finalizado', 8, 3),
('2025-10-14', '16:00:00', 'Cancelado', 9, 4),
('2025-10-18', '09:30:00', 'Pendiente', 1, 5),
('2025-10-19', '11:30:00', 'Pendiente', 3, 1),
('2025-10-20', '08:30:00', 'Pendiente', 5, 2);

-- Insertar Observaciones
INSERT INTO observaciones (idTurno, Comentario, FechaRegistro) VALUES
(6, 'Control de rutina pediátrico. Paciente en buen estado general. Peso y talla dentro de los parámetros normales para su edad.', '2025-10-10 09:45:00'),
(7, 'Consulta por dolor torácico. Se realizó electrocardiograma. Resultados normales. Se recomienda control en 6 meses.', '2025-10-11 16:15:00'),
(8, 'Evaluación de lesión en rodilla derecha. Se solicita resonancia magnética. Reposo relativo hasta resultados.', '2025-10-12 10:45:00'),
(9, 'Paciente no asistió a la consulta programada. Se intentó contacto telefónico sin éxito.', '2025-10-14 16:30:00');

 * 
 * 
 * 
 * 
 * 
 * 
 */