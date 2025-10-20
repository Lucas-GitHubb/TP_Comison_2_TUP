create database TP1CentroDeSalud;
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
idCatMedico int not null,
foreign key (idCatMedico) references catMedicos(idCatMedico)
);


create table turnos (
idTurno int primary key auto_increment,
FechaSolicitudTurno date not null, 
FechaRequeridaTurno date not null,
HorarioRequeridoTurno time not null,
HorarioInicioTurno time not null,
HorarioFinTurno time not null,
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