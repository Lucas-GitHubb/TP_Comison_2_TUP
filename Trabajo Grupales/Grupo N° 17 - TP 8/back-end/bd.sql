CREATE TABLE `artistas` (
   `id` int NOT NULL AUTO_INCREMENT,
   `nombre` varchar(100) DEFAULT NULL,
   `genero` varchar(50) DEFAULT NULL,
   PRIMARY KEY (`id`)
 )


 CREATE TABLE `eventos` (
   `id` int NOT NULL AUTO_INCREMENT,
   `nombre` varchar(100) DEFAULT NULL,
   `fecha` date DEFAULT NULL,
   `lugar` varchar(100) DEFAULT NULL,
   `cupo_maximo` int DEFAULT NULL,
   PRIMARY KEY (`id`)
 )

 CREATE TABLE `asistentes` (
   `id` int NOT NULL AUTO_INCREMENT,
   `nombre` varchar(100) DEFAULT NULL,
   `email` varchar(100) DEFAULT NULL,
   PRIMARY KEY (`id`)
 )

 CREATE TABLE `inscripciones` (
   `id` int NOT NULL AUTO_INCREMENT,
   `id_evento` int NOT NULL,
   `nombre` varchar(100) NOT NULL,
   `apellido` varchar(100) NOT NULL,
   `fecha_inscripcion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   KEY `inscripciones_ibfk_evento` (`id_evento`),
   CONSTRAINT `inscripciones_ibfk_evento` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE
 )

 CREATE TABLE `evento_artista` (
   `id` int NOT NULL AUTO_INCREMENT,
   `id_evento` int NOT NULL,
   `id_artista` int NOT NULL,
   PRIMARY KEY (`id`),
   KEY `fk_evento_artista_evento` (`id_evento`),
   KEY `fk_evento_artista_artista` (`id_artista`),
   CONSTRAINT `fk_evento_artista_artista` FOREIGN KEY (`id_artista`) REFERENCES `artistas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT `fk_evento_artista_evento` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
 ) 

 CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
 )

 CREATE TABLE  password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (user_id),
  INDEX (token_hash),
  INDEX (expires_at),
  CONSTRAINT fk_resets_user
    FOREIGN KEY (user_id) REFERENCES usuarios(id)
    ON DELETE CASCADE
);