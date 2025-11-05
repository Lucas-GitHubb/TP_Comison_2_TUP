     create database ONG;
     use ONG;
     
     CREATE TABLE usuarios(
     idUsuario int primary key auto_increment,
     correoUsuario varchar(100) not null unique,
     contraseñaUsuario varchar(15) not null
     );
     
     CREATE TABLE IF NOT EXISTS donadores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        contacto VARCHAR(100) NOT NULL,
        deleted_at TIMESTAMP NULL DEFAULT NULL
      );

      CREATE TABLE IF NOT EXISTS productos(
        id_producto INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion VARCHAR(255),
        categoria VARCHAR(100),
        cantidad INT
      );

      CREATE TABLE IF NOT EXISTS comedores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        direccion VARCHAR(150),
        contacto VARCHAR(100),
        telefono VARCHAR(50),
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS entregas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_donador INT NOT NULL,
        id_producto INT NOT NULL,
        id_comedor INT NOT NULL,
        cantidad INT NOT NULL,
        fecha_donacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        observaciones varchar(255),
        deleted_at TIMESTAMP NULL DEFAULT NULL,
        
        FOREIGN KEY (id_donador) REFERENCES donadores(id),
        FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
        FOREIGN KEY (id_comedor) REFERENCES comedores(id),

        CONSTRAINT fk_id_donador FOREIGN KEY (id_donador) REFERENCES donadores(id),
        CONSTRAINT fk_id_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
        CONSTRAINT fk_id_comedor FOREIGN KEY (id_comedor) REFERENCES comedores(id)
      );