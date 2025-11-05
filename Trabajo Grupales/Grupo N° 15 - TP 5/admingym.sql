create database admingym;

use admingym;

create table socios (
idSocio int primary key auto_increment,
nombre varchar(50),
apellido varchar (50),
mail varchar (50),
telefono varchar(50),
fechaNacimiento date
);

create table actividades (
idActividad int primary key auto_increment,
nombre varchar (50),
descripcion varchar(100),
cupoMaximo int 
);

create table reservas (
idReserva int primary key auto_increment,
fecha date,
hora time, 
idSocio int,
idActividad int,
foreign key (idSocio) references socios(idSocio),
foreign key (idActividad) references actividades(idActividad)
);

INSERT INTO socios (nombre, apellido, mail, telefono, fechaNacimiento) VALUES
('Lucía', 'Gómez', 'lucia.gomez@gmail.com', '3815123456', '1990-04-15'),
('Martín', 'Pérez', 'martin.perez@yahoo.com', '3814234567', '1985-09-22'),
('Sofía', 'López', 'sofia.lopez@hotmail.com', '3815345678', '1993-12-03'),
('Carlos', 'Ramírez', 'carlos.ramirez@gmail.com', '3815456789', '1988-06-30'),
('Valentina', 'Torres', 'valentina.torres@gmail.com', '3815567890', '1995-01-10'),
('Julián', 'Fernández', 'julian.fernandez@gmail.com', '3815678901', '1992-07-25'),
('Camila', 'Martínez', 'camila.martinez@gmail.com', '3815789012', '1996-03-18'),
('Diego', 'Sánchez', 'diego.sanchez@gmail.com', '3815890123', '1987-11-05'),
('Florencia', 'Castro', 'florencia.castro@gmail.com', '3815901234', '1991-08-14'),
('Federico', 'Ruiz', 'federico.ruiz@gmail.com', '3816012345', '1989-02-27');

INSERT INTO actividades (nombre, descripcion, cupoMaximo) VALUES
('Funcional', 'Entrenamiento funcional de alta intensidad', 0),
('Pilates', 'Ejercicios de fuerza y flexibilidad con colchonetas', 5),
('Spinning', 'Clase de ciclismo indoor con música', 15),
('Yoga', 'Clase de relajación y estiramiento', 3),
('Crossfit', 'Entrenamiento de fuerza y resistencia', 10),
('Zumba', 'Clase de baile aeróbico', 15),
('Boxeo', 'Entrenamiento de técnica y cardio', 10),
('Stretching', 'Clase de elongación muscular', 5),
('HIIT', 'Intervalos de alta intensidad', 4),
('Step', 'Ejercicio aeróbico con plataforma', 6);

INSERT INTO reservas (idSocio, idActividad, fecha, hora) VALUES
(1, 1, '2025-10-11', '08:00:00'),
(2, 2, '2025-10-11', '09:00:00'),
(3, 3, '2025-10-11', '10:00:00'),
(4, 4, '2025-10-11', '11:00:00'),
(5, 5, '2025-10-11', '12:00:00'),
(6, 6, '2025-10-11', '13:00:00'),
(7, 7, '2025-10-11', '14:00:00'),
(8, 8, '2025-10-11', '15:00:00'),
(9, 9, '2025-10-11', '16:00:00'),
(10, 10, '2025-10-11', '17:00:00');
