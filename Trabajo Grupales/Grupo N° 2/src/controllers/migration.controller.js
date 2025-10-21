import poolMigration from '../config/connectionMigration.js';
import pool from '../config/db.js';

export const createDatabase = async (req, res) => {
  try{
    const dbName = process.env.MYSQL_DATABASE;
    await poolMigration.query(`DROP DATABASE IF EXISTS ${dbName}`)
    await poolMigration.query(`CREATE DATABASE ${dbName}`)
    res.json({status: 200, payload: 'Database creada'})
  }
  catch(error){
    console.log(error)
  }
}

export const createTables = async (req, res) => {
  try {
    const dbName = process.env.MYSQL_DATABASE;
    await poolMigration.query(`USE ${dbName};`);
    await poolMigration.query(`
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
      
      `);
    res.json({status: 200, payload: 'Tablas creadas'});
  } catch (error) {
    console.log(error);
    res.status(400).json({status: 400, payload: 'Error al crear las tablas'});
  }
}

export const createData = async (req, res) => {
  try {

    await pool.query(`
      INSERT INTO donadores (nombre, apellido, contacto) VALUES
        ('Juan', 'Pérez', '3815123456'),
        ('María', 'Gómez', '1123456789'),
        ('Carlos', 'López', '3815234678'),
        ('Ana', 'Martínez', '1167892345'),
        ('Pedro', 'González', '3815345678'),
        ('Laura', 'Sánchez', '1134567890'),
        ('Javier', 'Rodríguez', '3815456789'),
        ('Sofía', 'Fernández', '1145678901'),
        ('Miguel', 'Díaz', '3815567890'),
        ('Elena', 'Torres', '1156789012');


      INSERT INTO productos (nombre, descripcion, categoria, cantidad) VALUES
        ('Arroz', 'Arroz blanco de alta calidad', 'Alimento perecedero', 100),
        ('Leche', 'Leche entera', 'Alimento perecedero', 50),
        ('Pollo', 'Pollo fresco', 'Alimento perecedero', 30),
        ('Pescado', 'Pescado fresco', 'Alimento perecedero', 20),
        ('Huevos', 'Huevos de gallina', 'Alimento perecedero', 40),
        ('Cereal', 'Cereal de trigo', 'Alimento perecedero', 60),
        ('Aceite', 'Aceite de oliva', 'Alimento perecedero', 25),
        ('Yogur', 'Yogur natural', 'Alimento perecedero', 35),
        ('Frutas', 'Frutas frescas', 'Alimento perecedero', 70),
        ('Verduras', 'Verduras frescas', 'Alimento perecedero', 45),
        ('Azúcar', 'Azúcar refinada', 'Alimento no perecedero', 80),
        ('Arvejas en lata', 'Arvejas en conserva', 'Alimento no perecedero', 50),
        ('Pan', 'Pan fresco de trigo', 'Alimento perecedero', 30),
        ('Sal', 'Sal fina de mesa', 'Alimento no perecedero', 90),
        ('Galletitas', 'Galletitas dulces surtidas', 'Alimento no perecedero', 60),
        ('Manteca', 'Manteca natural', 'Alimento perecedero', 25),
        ('Harina', 'Harina de trigo 000', 'Alimento no perecedero', 100),
        ('Queso', 'Queso cremoso', 'Alimento perecedero', 40),
        ('Café', 'Café molido', 'Alimento no perecedero', 70),
        ('Arroz integral', 'Arroz integral de grano largo', 'Alimento no perecedero', 55);


      INSERT INTO comedores (nombre, direccion, contacto, telefono) VALUES
        ('Comedor Esperanza', 'Calle Falsa 123', 'María López', '1122334455'),
        ('Manos Unidas', 'Av. Central 456', 'Juan Pérez', '1199887766'),
        ('Corazón Solidario', 'Calle Real 789', 'Ana Gómez', '1133557799');

      
      INSERT INTO entregas (id_donador, id_producto, id_comedor, cantidad, fecha_donacion, observaciones) VALUES
        (1,  1,  1, 25, '2025-07-05 10:30:00', 'Arroz 25 kg'),
        (2, 11,  2, 20, '2025-07-08 09:00:00', 'Azúcar para desayuno'),
        (3, 17,  3, 30, '2025-07-15 16:45:00', 'Harina 000 para panificados'),
        (4,  2,  1, 15, '2025-07-20 11:20:00', 'Leche entera'),
        (5,  5,  2, 12, '2025-07-28 13:10:00', 'Huevos'),
        (6,  7,  3, 10, '2025-08-02 08:50:00', 'Aceite de oliva'),
        (7, 14,  1, 40, '2025-08-09 12:05:00', 'Sal fina'),
        (8, 19,  2,  8, '2025-08-14 17:30:00', 'Café molido'),
        (9,  3,  3, 10, '2025-08-22 10:15:00', 'Pollo fresco'),
        (10,  9,  1, 18, '2025-08-28 15:40:00', 'Frutas surtidas'),
        (1, 20,  2, 22, '2025-09-05 09:25:00', 'Arroz integral'),
        (2, 13,  3, 25, '2025-09-12 10:10:00', 'Pan fresco'),
        (3, 16,  1, 12, '2025-09-18 14:55:00', 'Manteca'),
        (4, 18,  2, 10, '2025-09-26 11:35:00', 'Queso cremoso'),
        (5,  4,  3,  7, '2025-10-03 16:20:00', 'Pescado fresco');   
        `);
    
    res.json({status: 200, payload: 'Datos insertados'});
  } catch (error) {
    console.log(error);
    res.status(400).json({status: 400, payload: error.sqlMessage || 'Error al insertar los datos'});
  }
}